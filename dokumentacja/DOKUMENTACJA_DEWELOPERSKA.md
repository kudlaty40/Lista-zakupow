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

## Archiwum bazowe

Jednorazowy stan zakończonego projektu jest przechowywany lokalnie w katalogu `archives/FINAL-IMMUTABLE-20260722T203340Z`. Zawiera pełny stan pobrany z FTP, manifest SHA-256 oraz szyfrowany plik `FTP-STATE.tar.gz.aes`. Odtworzenie jest ręczne i wymaga skryptu `archives/Restore-FinalImmutable.ps1`, hasła archiwum, parametru `-ConfirmRestore` oraz dodatkowego wpisania `RESTORE`. Skrypt usuwa i odtwarza wyłącznie zarządzane katalogi aplikacji: `public_html`, `app-private` i `.grilujmy-backups`.
