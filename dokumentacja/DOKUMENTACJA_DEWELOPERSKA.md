# Lista zakupów — dokumentacja deweloperska

## Architektura

Aplikacja jest lekką aplikacją PHP/JavaScript działającą z Apache. `index.html`, `styles.css`, `script.js`, `sw.js` i manifest PWA tworzą klienta. Katalog `api/` zawiera endpointy PHP. Dane aplikacji i konfiguracja prywatna powinny znajdować się poza webrootem; blokada `.htaccess` jest tylko dodatkową warstwą ochronną.

## Główne pliki

- `index.html` — struktura widoków logowania, list, ustawień i paneli administracyjnych.
- `script.js` — stan klienta, renderowanie, IndexedDB/localStorage, kolejka offline, wywołania API i synchronizacja.
- `styles.css` — układ responsywny, karty, kategorie i akcje produktów.
- `sw.js` — cache zasobów PWA; po zmianach interfejsu zwiększ wersję cache (aktualnie `v17`).
- `api/security.php` — sesje, autoryzacja, hashowanie i wspólne odpowiedzi JSON.
- `api/families.php` — rodziny, superadministrator i operacje administracyjne.
- `api/user-accounts.php` — konta rodziny, role, edycja kont i `change_own_password`.
- `api/products.php` — produkty i zapis danych rodziny.
- `api/airtable-settings.php`, `airtable-health.php`, `admin-sync.php`, `sync-settings.php` — funkcje Airtable dostępne dla superadministratora.
- `api/nutrition.php` — kontrolowany proxy do danych żywieniowych.
- `api/product-image.php` — autoryzowane udostępnianie zdjęć.

## Dane i autoryzacja

Każde żądanie chronionego endpointu musi sprawdzić sesję, rodzinę i uprawnienia. Administrator rodziny działa tylko w obrębie swojej rodziny. Superadministrator ma dostęp do rodzin, globalnych ustawień Airtable i synchronizacji. API nie zwraca haseł ani hashy.

Ustawienia widoku są przechowywane per konto w `viewSettings`. Grupowanie listy i grupowanie wszystkich produktów są niezależne; brak nowego pola oznacza wartość domyślną zgodną z kodem klienta.

Widoczność karty diety jest częścią ustawień rodziny/użytkownika (`hideDiary`). Klient blokuje wejście do widoku `diary`, dopóki ustawienia nie zostaną wczytane, a następnie ponownie stosuje widoczność po odczycie cache i serwera. Zapobiega to chwilowemu pojawianiu się karty po logowaniu.

## Tryb offline i synchronizacja

Klient zapisuje stan lokalny w IndexedDB oraz utrzymuje kolejkę operacji. Po odzyskaniu sieci wykonuje zapis do endpointu magazynu, a następnie synchronizację Airtable, jeśli jest skonfigurowana. Globalny harmonogram odczytuje klient PWA; jego zmiana jest dostępna wyłącznie superadministratorowi.

W mobilnym nagłówku `.topbar` używa siatki z elastyczną kolumną tytułu i stałą kolumną przycisku wylogowania. Akcje produktu są renderowane w osobnym wierszu. Ilość i jednostka są opakowane w `.item-qty-label`, a `.all-product-row .item-qty` ma stałą szerokość. Strzałka rozwijania jest rysowana przez pseudo-element CSS, ma taki sam rozmiar i zaokrąglenie jak akcje produktu oraz zmienia kierunek na podstawie `aria-expanded`. Selektor `.all-product-actions` używa stałej siatki kolumn, aby wyrównać wszystkie przyciski.

## Airtable

Token i identyfikatory konfiguracji przechowuj poza publicznym repozytorium i webrootem. Token powinien mieć minimalne uprawnienia do wybranej bazy i tabeli. `airtable-settings.php` zwraca wyłącznie status, a diagnostyka nie może ujawniać tokena ani pełnych komunikatów dostawcy.

## Bezpieczeństwo

- używaj HTTPS i nagłówków z głównego `.htaccess`;
- utrzymuj sesję z limitem bezczynności i odnawianiem identyfikatora;
- stosuj Argon2id lub bcrypt dla nowych haseł;
- nie publikuj `storage/`, konfiguracji, backupów, snapshotów ani danych kont;
- przed wdrożeniem wykonuj prywatny snapshot i zapisuj sumy SHA-256;
- po wdrożeniu sprawdzaj HTTP, autoryzację, brak dostępu do sekretów i funkcję zmienianą w danym wydaniu.

## Uruchomienie i wdrożenie

Lokalnie potrzebny jest PHP z JSON i cURL oraz zapisywalne prywatne katalogi danych i backupów. Uruchom serwer developerski PHP z katalogu projektu. Produkcyjnie publikuj tylko kod aplikacji, ustaw prywatną konfigurację poza webrootem, wymuś HTTPS i używaj seryjnego procesu snapshot → wdrożenie → test → weryfikacja.

## Testy regresji

Przed publikacją sprawdź logowanie i wylogowanie, izolację rodzin, zmianę haseł, zapis i odczyt produktów, zdjęcia, kategorie, potwierdzenie usuwania, ustawienia, tryb offline, synchronizację Airtable, nagłówki oraz blokadę plików prywatnych. Wykonaj `php -l` dla zmienionych endpointów i skan sekretów przed commitem.

## Ujednolicenie haseł i reset administratora — wdrożenie 2026-07-23

Przed zmianą wykonano snapshot `archives/prechange/20260723T151943Z-hasla-reset`, obejmujący kod oraz aktywne pliki kont wszystkich rodzin i indeks rodzin.

Wszystkie nowe i zmieniane hasła korzystają ze wspólnej walidacji: minimum 8 znaków, cyfra i znak specjalny. Zapis jest ujednolicony do bcrypt cost 12. Endpoint resetu administratora zapisuje hash atomowo, odczytuje plik ponownie i potwierdza `password_verify()` przed zwróceniem sukcesu. Cache PWA zwiększono do `v19`.

## Logowanie rodzin i reset haseł — wdrożenie 2026-07-23

Przed wdrożeniem utworzono snapshot FTP w `archives/prechange/20260723T150802Z-rodziny-superadmin`. Wysłano wyłącznie przejrzane pliki aplikacji; nie kopiowano lokalnego archiwum, dokumentacji ani danych użytkowników.

Logowanie obsługuje migrację starszych jawnych haseł: po pierwszym poprawnym logowaniu hasło jest natychmiast zastępowane hashem. Konfiguracja magazynu pozostaje oparta na prywatnym `app-private/config.php`, zgodnie z konfiguracją hostingu.

Panel superadmina pobiera administratorów wybranej rodziny i wysyła do resetu `familySlug`, `username` oraz nowe hasło. Airtable i synchronizacja nie zawierają stałej rodziny ani użytkownika Polak/Bartek. Cache PWA zwiększono do `v18`.

## Archiwum bazowe

Jednorazowy stan zakończonego projektu jest przechowywany lokalnie w katalogu `archives/FINAL-IMMUTABLE-20260722T203340Z`. Zawiera pełny stan pobrany z FTP, manifest SHA-256 oraz szyfrowany plik `FTP-STATE.tar.gz.aes`. Odtworzenie jest ręczne i wymaga skryptu `archives/Restore-FinalImmutable.ps1`, hasła archiwum, parametru `-ConfirmRestore` oraz dodatkowego wpisania `RESTORE`. Skrypt usuwa i odtwarza wyłącznie zarządzane katalogi aplikacji: `public_html`, `app-private` i `.grilujmy-backups`.
## Diagnostyka resetu administratora - 2026-07-23

Reset rodziny wymaga aktywnej sesji superadmina. Frontend wysyla zadania z `credentials: same-origin` i `cache: no-store`, blokuje przycisk do czasu pobrania administratorow oraz rozroznia bledy HTTP. Backend sprawdza rodzine, login i role administratora, zapisuje atomowo, ponownie odczytuje plik i weryfikuje `password_verify()` dla bcrypt cost 12.

Snapshot: `archives/prechange/20260723T152751Z-diagnostyka-testowa`. Weryfikacja FTP: zgodne sumy SHA-256, PWA `v20`, proba resetu bez sesji `403`. Rzeczywisty reset wykonac dopiero po zalogowaniu superadmina.
### Runtime rate-limit reset - 2026-07-23

Jednorazowo usunięto plik blokady `account-login` odpowiadający kluczowi `testowa:test` w prywatnym `app-private/storage/rate-limits`. Limit IP nie był zablokowany i nie został usunięty. Kod `security.php`, progi 5/10 prób i czas 15 minut pozostają bez zmian. Kontrolna błędna próba logowania zwróciła `401`, a nie `429`.
### Reset danych konta testowa/test - 2026-07-23

Jednorazowy reset wykonano wyłącznie w `app-private/storage/families/testowa/user-accounts.json`. Hasło `test` zapisano jako bcrypt cost 12. Plik musi być tablicą JSON zapisany bez BOM; zapis pojedynczego obiektu powoduje, że PHP nie znajdzie konta podczas iteracji.

Weryfikacja HTTPS: logowanie i sesja `testowa` działają, próba odczytu `polak` z tej sesji zwraca odmowę dostępu, a limit logowania nadal zwraca `429` po przekroczeniu progu. Walidacja nowych haseł i kod endpointu resetu pozostały niezmienione.
### Reset hasła administratora rodziny - diagnostyka i UI

Formularz superadmina ma dwa pola hasła z lokalnym przełącznikiem Pokaż/Ukryj oraz osobny komunikat statusu. Przycisk resetu jest blokowany na czas żądania. Sukces jest wyświetlany dopiero po odpowiedzi API potwierdzającej zapis i ponowną weryfikację hasha.

`families.php` normalizuje `username`, wymaga listy kont JSON i zapisuje `array_values()` przez atomowy zapis bez BOM. Po zapisie sprawdza listę, właściwy login, bcrypt cost 12 i `password_verify()`. Nie zwraca hasła ani hasha.
### Diagnostyka resetu administratora rodziny

`set_family_admin_password` po zapisie i weryfikacji bcrypt cost 12 wykonuje `appClearRateLimit('account-login', familySlug:username)` i zwraca `passwordVerified` oraz `accountRateLimitCleared`. Limit IP pozostaje aktywny. Frontend pokazuje wynik w modalu i globalnym statusie panelu, rozróżnia `401/403`, `429` i błędy zapisu oraz wymusza `credentials: same-origin` i `cache: no-store`.
### Ustawienia kart i motyw konta

Panel ustawień zawiera `settings-user-tab` oraz `settings-admin-tab`. Widoczność narzędzi administratora nadal zależy od `isAdmin`. Motyw jest zapisywany jako `settings.theme` (`light`/`dark`) w istniejącym payloadzie ustawień konta i nakładany przez `html[data-theme]`. Brak pola oznacza motyw jasny.

CSS dla `data-theme="dark"` nadpisuje kolory powierzchni, tekstów, obramowań, formularzy, przycisków, kategorii i modali z zachowaniem kontrastu. Service worker został zwiększony do `v23`.
### Zakładki i kontrolki dark mode

Reguły `html[data-theme="dark"]` obejmują `.tab-button`, `.admin-tab-button`, `.settings-section-tab`, `.category-toggle`, `.all-product-expand-button` oraz przyciski akcji produktów. Nieaktywne zakładki używają kontrastowego granatowego tła, aktywne pozostają fioletowe, a focus jest wyróżniony obramowaniem. Service worker ma wersję `v24`.
### Reset hasła administratora rodziny - diagnostyka

`set_family_admin_password` zwraca techniczny `errorCode` bez sekretów, sprawdza listę kont JSON, normalizuje login i po zapisie weryfikuje bcrypt cost 12 oraz `password_verify()`. Frontend pokazuje etap wczytywania, błąd lub sukces jednocześnie w modalu i stałym statusie panelu. Backup korzysta z `backup_dir` w prywatnym `app-private/config.php`, z zachowaniem awaryjnego fallbacku dla starszej konfiguracji. Service worker ma wersję `v25`, a rejestracja używa parametru cache-busting.
Weryfikacja techniczna FTP/HTTPS przeszła poprawnie; test zapisu i logowania po resecie wymaga aktywnej sesji superadmina i nie jest wykonywany automatycznie.
### Logowanie rodzin i diagnostyka rate-limit

`user-accounts.php` waliduje teraz, że plik kont jest listą JSON i normalizuje login zarówno z żądania, jak i z rekordu. Odpowiedź `429` zawiera bezpieczny `Retry-After`; szczegóły konta nie są ujawniane. Service worker został zwiększony do `v26`, a ikona manifestu jest sprawdzana przez HTTPS.
### Diagnostyka logowania Testowa

Konto `test` jest wyszukiwane po znormalizowanym loginie także po stronie rekordu JSON. Niepoprawny format pliku kont zatrzymuje operację komunikatem ogólnym, a aktywna blokada logowania zwraca `Retry-After`. Ikona PWA używa ścieżki `app-icons/app-icon.svg`, ponieważ `/icons/` jest aliasem Apache.

### Diagnostyka resetu administratora rodziny - 2026-07-23

Endpoint `families.php` udostępnia chronioną akcję `super_admin_status`. Reset hasła zwraca techniczny `requestId`, etap operacji (`target`, `validation`, `family`, `storage`, `accounts`, `write`, `verify`) oraz kod błędu bez ujawniania sekretów. Frontend wykonuje kontrolę sesji, pobiera administratorów i pokazuje status resetu w modalu oraz panelu. Service worker ma wersję `v27`.
### Wersjonowanie klienta resetu - 2026-07-23

`index.html` ładuje `script.js?v=28`, a service worker używa cache `v28` i przechowuje ten sam URL z wersją. Obsługa resetu pokazuje status przed walidacją i ma awaryjne uruchomienie klawiszem Enter.

### Jednorazowy wyjątek danych konta testowa/test - 2026-07-23

Snapshot `archives/prechange/20260723T180345Z-set-test-password` zawiera stan poprzedni. Na FTP zmieniono wyłącznie `app-private/storage/families/testowa/user-accounts.json`; plik pozostaje listą JSON bez BOM, a hash konta `test` jest bcrypt cost 12 i przechodzi `password_verify()`. Hasło wyjątku nie jest zapisywane w dokumentacji ani repozytorium.
