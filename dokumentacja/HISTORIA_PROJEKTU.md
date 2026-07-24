# Lista zakupów — historia ustaleń i wdrożeń

Ten plik jest lokalnym rejestrem projektu. Nie zawiera haseł, tokenów, danych kont ani danych produkcyjnych.

## Zasady

- Dokumentacja i snapshoty robocze pozostają lokalne.
- FTP jest środowiskiem wdrożeniowym, a GitHub zawiera wyłącznie oczyszczony kod przeznaczony do publikacji.
- Przy kolejnych zmianach FTP nie wykonuje się nowych snapshotów; po wdrożeniu weryfikuje się stan i sumy SHA-256.
- Żaden sekret nie może trafić do Git, GitHub, logów ani dokumentacji.

## Chronologia

### Rozszerzenie danych nutrition i zdjec opakowan - 2026-07-24

Rozszerzono proxy nutrition o cukry, sol, blonnik, nasycone kwasy tluszczowe,
zdjecie opakowania HTTPS, Nutri-Score i NOVA dla Open Food Facts oraz fallbacku
Open Food Repo. Wlasne zdjecie pozostaje wazniejsze od publicznego obrazu, a
oznaczenia sa nakladane tylko na publicznym fallbacku.

### Naprawa synchronizacji zdjec produktow - 2026-07-24

Analiza wykazala, ze nieudany zapis Airtable cofal lokalny `shared.json`, przez
co upload pozostawal tylko na urzadzeniu nadawcy, a usuniete zdjecia wracaly po
odswiezeniu. Zmieniono backend tak, aby lokalny zapis byl rozstrzygajacy, a
Airtable pozostalo replika z informacja `airtable_pending`. Frontend czysci
bufory lokalne po potwierdzeniu API oraz usuwa `imageUpdatedAt`.

Walidacja lokalna PHP i JavaScript przeszla poprawnie. Odczyt zdalnego stanu
rodziny `testowa` dziala; zdalny test dwoch sesji wymaga osobnego wdrozenia FTP.

### Tryb serwisowy i wdrozenie v43 - 2026-07-24

Dodano `api/maintenance-status.php`, flage `/app-private/maintenance.flag`,
blokade chronionych endpointow odpowiedzia HTTP 503 oraz ekran aktualizacji w
kliencie. Snapshoty FTP wykonano przed transferem (`maintenance-support-3` i
`nutrition-extension`), a pliki zweryfikowano sumami SHA-256. Potwierdzono
dzialanie blokady 503, usunieto flage po wdrozeniu i uzyskano koncowy HTTPS 200
oraz `maintenance:false`. Dokumentacja i kod pozostaly bez commit/push.

### Audyt bezpieczeństwa

Zidentyfikowano ryzyka związane z konfiguracją Airtable, danymi pod webrootem, limitami logowania, sesjami, nagłówkami, uploadem zdjęć i publicznym endpointem żywieniowym. Ustalono przechowywanie sekretów i danych poza webrootem oraz stosowanie prywatnych snapshotów.

### Usuwanie produktów

Dodano jedno potwierdzenie przeglądarki przed trwałym usunięciem produktu z widoku „Wszystkie produkty”. Anulowanie nie zmienia danych.

### Panel superadministratora

Konfigurację Airtable, diagnostykę, globalną synchronizację i nadawanie haseł administratorom rodzin przeniesiono do panelu superadministratora. Panel uporządkowano w karty i zakładki oraz dodano stały przycisk wylogowania.

### Ustawienia i produkty

Dodano karty ustawień użytkownika, zmianę własnego hasła, edycję kont członków rodziny, ukrywanie karty diety, grupowanie kategorii oraz rozwijane akcje produktów. Strzałkę produktu umieszczono za ilością i jednostką, a akcje przeniesiono do drugiego wiersza.

### Repozytorium GitHub

Utworzono publiczne repozytorium `Lista-zakupow` bez starej historii i bez danych runtime. Wykonano audyty bieżącego drzewa i historii, rozszerzono `.gitignore` oraz pozostawiono publiczny zbiór `off.json` z informacją o Open Food Facts.

### Dokumentacja

Od tej pory każdą istotną zmianę funkcjonalną, bezpieczeństwa, FTP lub GitHub należy dopisać do właściwej sekcji tego rejestru. Wpis powinien opisywać cel, środowisko, wynik i ewentualny rollback, bez sekretów.

### Ostatnie poprawki interfejsu mobilnego i produktów

Wdrożono poprawione wyrównanie przycisku wylogowania na telefonach, trwałe stosowanie ustawienia ukrywania karty „Moja dieta” po logowaniu i odświeżeniu oraz cache PWA `v14`. W widoku „Wszystkie produkty” zastąpiono cienkie znaki rozwijania symbolami `▾`/`▴` i ujednolicono rozmiar, kształt oraz wyrównanie przycisków akcji.

### Stałe wyrównanie strzałek produktów

Kolumnę ilości uzupełniono o osobny wrapper ilości i jednostki oraz stałe miejsce na strzałkę. Strzałka jest teraz rysowana grubym obramowaniem CSS, a akcje produktów są rozmieszczane w stałej siatce. Wersję cache PWA zwiększono do `v15`.

### Ujednolicenie przycisku strzałki

Przycisk rozwijania otrzymał rozmiar 44×44 px, taki sam jak pozostałe akcje produktu, pastelowe tło, zaokrąglenie 14 px i grubszą ikonę chevron bez ręcznego przesuwania. Wersję cache PWA zwiększono do `v16`.

### Ujednolicenie pola nazwy produktu

Pole nazwy w formularzu edycji otrzymało jawny typ `text`, dzięki czemu korzysta z tych samych stylów aplikacji co ilość i kategoria. Wersję cache PWA zwiększono do `v17`.

### Ujednolicenie haseł i niezawodny reset — 2026-07-23

Wspólną politykę haseł ustawiono na minimum 8 znaków, cyfrę i znak specjalny. Wszystkie nowe hashe są zapisywane jako bcrypt cost 12. Reset administratora rodziny weryfikuje zapisany hash po ponownym odczycie pliku, a cache PWA zwiększono do `v19`.

### Naprawa logowania rodzin i panelu superadmina — 2026-07-23

Audyt FTP wykazał starszy frontend i endpointy niż w lokalnym kodzie, filtr Airtable zapisany na stałe dla `polak:shared`, brak obsługi wskazanego administratora przy resecie hasła oraz jawne stare hasło konta `stelmach/artur`. Przed zmianą wykonano snapshot `20260723T150802Z-rodziny-superadmin`.

Wdrożono poprawki bez przenoszenia całego lokalnego repozytorium. Dodano migrację jawnego hasła do hasha przy poprawnym logowaniu, usunięto stałą rodzinę z Airtable, dodano wybór administratora w panelu superadmina, wdrożono parytet funkcjonalny rodzin i zwiększono cache PWA do `v18`. Podczas testu konto Stelmach zalogowało się poprawnie, hasło zostało zahashowane, a próba dostępu do danych Polak z sesji Stelmach została odrzucona.

### Archiwum zakończonej wersji

Utworzono lokalne archiwum `FINAL-IMMUTABLE-20260722T203340Z` z pełnym stanem FTP: `public_html`, `app-private` i `.grilujmy-backups`. Archiwum zawiera manifest SHA-256, kopię roboczą tylko do odczytu oraz szyfrowany plik stanu chroniony hasłem przekazanym poza repozytorium. Przywracanie jest ręczne, zakres ograniczony do katalogów aplikacji i nie podlega standardowej retencji snapshotów.
### Audyt Testowa i stabilizacja resetu - 2026-07-23

Wykonano snapshot FTP `archives/prechange/20260723T152751Z-diagnostyka-testowa`. Potwierdzono, ze konto `test` rodziny `testowa` ma bcrypt cost 12; rzeczywisty reset wymaga aktywnej sesji superadmina i nie zostal wykonany bez autoryzacji.

Wdrozono `credentials: same-origin`, `cache: no-store`, diagnostyke kodow HTTP, naglowek `Cache-Control: no-store, private` oraz cache PWA `v20`. Sumy SHA-256 plikow lokalnych i FTP sa zgodne, nieautoryzowany reset zwraca `403`, a dane kont nie zostaly zmienione.
### Jednorazowe odblokowanie testowa/test - 2026-07-23

Usunięto wyłącznie wygaszaną runtime blokadę `account-login` dla konta `test` rodziny `testowa`. Nie zmieniano kodu, limitów, haseł ani blokad innych rodzin. Próba kontrolna po wyczyszczeniu zwróciła `401` dla celowo błędnego hasła zamiast `429`, co potwierdza odblokowanie przy zachowaniu ochrony.
### Jednorazowe ustawienie hasła testowa/test - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T155520Z-reset-testowa-test`. Konto `test` otrzymało jednorazowo hash bcrypt cost 12 dla hasła `test`. Podczas wdrożenia wykryto i poprawiono błąd techniczny: plik kont musi być tablicą JSON bez BOM UTF-8.

Po poprawce logowanie i sesja rodziny `testowa` zakończyły się sukcesem. Dostęp do danych rodziny `polak` z sesji `testowa` został odrzucony, a test limitu zwrócił `429` po piątej błędnej próbie. Kod polityki haseł nie został zmieniony; GitHub pozostaje bez zmian.
### Naprawa resetu hasła w panelu superadmina - 2026-07-23

Przed wdrożeniem utworzono snapshot `archives/prechange/20260723T161131Z-reset-ui`. Dodano osobny status formularza resetu, jednoznaczne komunikaty sukcesu i błędu oraz przyciski pokazywania/ukrywania nowego hasła i jego powtórzenia.

Backend normalizuje login, wymaga tablicy JSON kont, zapisuje bez BOM i po zapisie ponownie weryfikuje bcrypt cost 12 oraz `password_verify()`. Wdrożono `index.html`, `script.js`, `styles.css`, `sw.js` v21 i `api/families.php`. Sumy FTP są zgodne, a nieautoryzowany reset zwraca `403`. Danych rodzin nie zmieniano.
### Reset administratora rodziny - czyszczenie blokady konta - 2026-07-23

Audyt rozdzielił reset administratora rodziny (`set_family_admin_password`) od zmiany hasła superadmina (`change_super_admin_password`). Po potwierdzonym zapisie reset wyczyści blokadę `account-login` tylko dla klucza rodziny i loginu oraz zwróci status weryfikacji bez hasha.

Wdrożono `api/families.php`, `script.js` i `sw.js` v22. Komunikat sukcesu jest widoczny w modalu i stałym statusie panelu, a błędy sesji, blokady IP i zapisu mają osobne treści. Sumy FTP są zgodne, nieautoryzowany reset zwraca `403`, a endpoint zmiany hasła superadmina nie był modyfikowany.
### Ustawienia w kartach i ciemny motyw per konto - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T163534Z-dark-theme-tabs`. Ustawienia konta podzielono na karty „Ustawienia użytkownika” i „Narzędzia administratora”; druga karta jest dostępna wyłącznie administratorom rodziny.

Dodano przełącznik ciemnego wyglądu zapisywany w ustawieniach konkretnego konta. Motyw jasny pozostaje domyślny, a ciemny dostosowuje tła, teksty, pola, karty, modale, przyciski, statusy i focus. Wdrożono FTP, cache PWA zwiększono do `v23`; sumy plików są zgodne, a lista rodzin Polak/Stelmach/Testowa działa. GitHub bez zmian.
### Kontrast zakładek w ciemnym motywie - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T164231Z-dark-tabs-contrast`. Dodano ciemne tła i jasne teksty dla zakładek głównych, kart ustawień i zakładek narzędzi administratora oraz stany hover/focus. Ujednolicono także kontrast przycisków kolejności, kategorii, strzałek produktów i akcji produktów. Cache PWA zwiększono do `v24`; dane i API bez zmian.
### Niezawodny reset hasła administratora rodziny - 2026-07-23

Utworzono snapshot FTP `archives/prechange/20260723T170341Z-family-admin-password-reliability`. Ujednolicono backup z prywatną konfiguracją `app-private/config.php`, dodano kody diagnostyczne błędów resetu, widoczny status w modalu i panelu superadmina oraz blokadę przycisku podczas wczytywania administratorów. Cache PWA zwiększono do `v25`. Limity logowania i blokada IP pozostały bez zmian.
Weryfikacja techniczna FTP/HTTPS przeszła poprawnie; test zapisu i logowania po resecie wymaga aktywnej sesji superadmina i nie jest wykonywany automatycznie.
### Logowanie Testowa i PWA - 2026-07-23

Audyt potwierdził poprawny bcrypt konta `test`, normalizację rodziny `testowa` oraz brak blokady konta. Ujednolicono odczyt listy kont i normalizację zapisanych loginów, dodano `Retry-After` dla aktywnej blokady oraz przygotowano ponowne wdrożenie ikony PWA. Cache PWA zwiększono do `v26`; docelowy reset hasła ma używać silnego hasła zgodnego z polityką.
### Testowa/test - wdrożenie diagnostyki i poprawka ikony PWA - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T171542Z-login-testowa-pwa`. Wdrożono normalizację loginów zapisanych w plikach kont, rygorystyczną walidację listy JSON, nagłówek `Retry-After` dla blokady oraz cache PWA `v26`. Z powodu konfliktu ścieżki Apache `/icons/` ikonę przeniesiono do `app-icons/app-icon.svg`; HTTPS zwraca `200`. Zapis nowego silnego hasła wymaga aktywnej sesji superadmina i ręcznego testu w panelu.

### Diagnostyka resetu administratora rodziny - 2026-07-23

Utworzono snapshot FTP przed zmianą. Dodano kontrolę sesji superadmina, etapowanie resetu hasła, techniczny identyfikator żądania oraz kody błędów widoczne w statusie modala i panelu. Nie ujawniają one haseł, hashy ani ścieżek prywatnych. Cache PWA zwiększono do `v27`; limit IP nie został wyłączony.

### Jednorazowy wyjątek hasła testowa/test - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T180345Z-set-test-password`. Zmieniono wyłącznie hash konta administratora `test` w rodzinie `testowa`, zapisując bcrypt cost 12. Weryfikacja FTP potwierdziła poprawną listę JSON, rolę administratora i zgodność hasha z hasłem testowym. Wyjątek nie zmienia polityki haseł, limitów logowania ani innych kont.

### Wymuszenie aktualnego JavaScriptu resetu - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T174013Z-reset-cache-v28`. Wersję `script.js` w HTML zmieniono na `v28`, service worker zwiększono do `v28`, a przycisk resetu otrzymał natychmiastowy komunikat rozpoczęcia oraz obsługę klawisza Enter. Dane kont, limity IP i hasło superadmina nie zostały zmienione.

### Widoczność narzędzi i trwałe zdjęcia produktów - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T181354Z-admin-images`. Usunięto lokalny fallback uprawnień administratora: narzędzia są teraz zależne wyłącznie od roli potwierdzonej w bieżącej sesji. Zapis zdjęcia w edycji produktu jest wykonywany przed finalnym zapisem produktu; nieudany upload pozostawia obraz w IndexedDB do ponowienia po odzyskaniu połączenia. Dodano chronioną akcję usuwania zdjęcia, a cache PWA zwiększono do `v29`. GitHub pozostaje bez zmian.

### Ukrycie karty narzędzi administratora - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T182514Z-hide-admin-tab`. Karta „Narzędzia administratora” jest teraz całkowicie ukrywana dla zwykłych kont, a nie tylko wyłączana. Zachowano kontrolę uprawnień opartą wyłącznie na sesji serwera; cache PWA zwiększono do `v30`. GitHub pozostaje bez zmian.

### Menu zdjęć i synchronizacja zdjęć między urządzeniami - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T184817Z-photo-sync`. Menu wyboru zdjęcia otrzymało warstwę nad podglądem produktu. Po udanym uploadzie klient wymusza próbę synchronizacji `imageId` we wspólnej liście rodziny; przy niedostępnej sieci zachowuje kolejkę offline. Cache PWA zwiększono do `v31`. GitHub pozostaje bez zmian.

### Weryfikacja i ponawianie synchronizacji zdjęć - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T185641Z-photo-sync-retry`. Po uploadzie klient potwierdza `imageId` przez świeży odczyt wspólnej listy i pokazuje status dostępności zdjęcia dla rodziny. Dodano bezpieczny fallback zapisu JPEG/PNG dla hostingu bez GD/WebP oraz zwiększono cache PWA do `v32`. GitHub pozostaje bez zmian.

### Trwałe imageId w danych wspólnej listy - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T190937Z-imageid-family-persistence`. Po uploadzie klient dopisuje gwarantowaną operację `upsert-item` z `imageId`, odświeża rewizję i ponawia synchronizację maksymalnie trzy razy. Sukces wymaga świeżego potwierdzenia `imageId` w danych rodziny. Cache PWA zwiększono do `v33`; GitHub pozostaje bez zmian.

### Pasek postępu i kropka statusu zdjęcia - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T191915Z-photo-progress-status`. Dodano pasek `100%` podczas synchronizacji uploadu/pobierania oraz zieloną lub czerwoną kropkę przy numerze produktu. Status działa w liście zakupów i wszystkich produktach. Cache PWA zwiększono do `v34`; GitHub pozostaje bez zmian.

### Atomowy zapis zdjęcia i imageId - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T192833Z-atomic-image-link`. Dodano akcję `upload-link`, która zapisuje plik zdjęcia i właściwość `imageId` w rodzinnej wspólnej liście. Klient korzysta z tego przepływu dla wszystkich produktów, bez base64 w danych. Cache PWA zwiększono do `v35`; GitHub pozostaje bez zmian.

### Ostatnie zdjęcie wygrywa - 2026-07-23

Utworzono snapshot `archives/prechange/20260723T193553Z-latest-image-wins`. Uploady używają unikalnych identyfikatorów, zapisują `imageUpdatedAt` i są porządkowane blokadą rodziny. Nowe `shared.json` jest zapisywane atomowo, a poprzedni plik zdjęcia jest usuwany dopiero po udanym zapisie. Cache PWA zwiększono do `v36`; GitHub pozostaje bez zmian.

### Stabilna synchronizacja i usuwanie zdjęć - 2026-07-23

Utworzono snapshot `archives/prechange/20260723-220609-reliable-image-sync`. Dodano dedykowane usuwanie powiązania zdjęcia, ochronę przed starszymi operacjami `upsert-item`, kolejkę usuwania offline oraz widoczny status w podglądzie zdjęcia. Cache PWA zwiększono do `v37`; GitHub pozostaje bez zmian.

### Jedna blokada i potwierdzenie Airtable dla zdjęć - 2026-07-23

Wdrożenie wykorzystuje wspólną blokadę `.shared-sync.lock`, dedykowany moduł Airtable oraz statusy `completed`/`pending_retry`. Obraz jest usuwany dopiero po potwierdzeniu obu zapisów, a nieudane operacje pozostają do ponowienia. Cache PWA zwiększono do `v40`; GitHub pozostaje bez zmian.

### Bufor urządzenia i tombstone zdjęcia - 2026-07-23

Dodano stabilny `photoOperationId`, zapis oczekującego obrazu w IndexedDB oraz `imageStatus` (`pending`, `ready`, `pending_delete`, `deleted`). Zdjęcie jest wyświetlane tylko po pełnym potwierdzeniu w danych rodziny i Airtable.
### Audyt uploadu zdjęć i poprawka `Failed to fetch` - 2026-07-23

Utworzono snapshot `archives/prechange/20260723-224215-photo-upload-fetch-fix`. Potwierdzono optymalizację obrazu (maks. 1280 px, WebP jakość 0,78, fallback JPEG/PNG) oraz bufor IndexedDB. Usunięto wadliwy `fetch(data:image/...)`, który na urządzeniach mobilnych kończył się przed wysłaniem żądania multipart. Bufor jest konwertowany bezpośrednio do `Blob`, a upload używa `credentials: same-origin` i `cache: no-store`. Wersję PWA zwiększono do `v41`; pliki interfejsu wdrożono na FTP i porównano sumy SHA-256.
### Tombstone lokalny usuwania zdjęcia - 2026-07-23

Przed żądaniem sieciowym klient ukrywa zdjęcie i ustawia `imageStatus: pending_delete`. Przy błędzie zachowuje operację w IndexedDB, a zwykły `upsert-item` nie jest dodawany. Po potwierdzeniu serwera stan przechodzi na `deleted`. Wersję PWA zwiększono do `v42`; wykonano snapshot FTP przed wdrożeniem.
### Test FTP → shared.json → Airtable - 2026-07-23

Kontrolny upload małego obrazu przez konto testowe przeszedł zapis pliku do prywatnego katalogu FTP, ale endpoint zwrócił `status: pending_retry`, ponieważ zapis Airtable nie został potwierdzony. `shared.json` został prawidłowo przywrócony do stanu poprzedniego; plik pozostał w prywatnym magazynie do ponowienia, zgodnie z zasadą bufora. Po sprzątnięciu testowego identyfikatora nie pozostał testowy produkt ani wpis `imageId` w danych rodziny. Do pełnego testu między urządzeniami potrzebna jest działająca konfiguracja Airtable i sesja superadministratora do diagnostyki.

### Całkowite usunięcie obsługi zdjęć produktów - 2026-07-24

Usunięto z aplikacji dodawanie, pobieranie, wyświetlanie i usuwanie zdjęć produktów, zdjęcia opakowań z nutrition, nakładki Nutri-Score/NOVA na obrazach, kolejki zdjęciowe IndexedDB oraz endpoint `api/product-image.php` i nieużywany moduł `api/airtable-client.php`. `api/nutrition.php` nie zwraca już pola `imageUrl`, a `api/products.php` usuwa stare metadane zdjęciowe z payloadów.

W ramach czyszczenia usunięto pliki z katalogów `data/images` oraz pola `image`, `imageId`, `imageStatus`, `imageUpdatedAt` i `photoOperationId` z danych rodzin. Cache PWA zwiększono do `v44`. Walidacja obejmuje lint PHP, sprawdzenie JavaScript/CSS, test listy produktów bez zdjęć i kontrolę braku endpointu zdjęciowego. Wdrożenie nie obejmuje commita ani pushu.

`api/admin-sync.php` filtruje te pola oraz `nutrition.imageUrl` przed kolejną synchronizacją Airtable. Bez aktywnej sesji superadministratora nie wykonano ręcznego zapisu do Airtable; lokalne dane FTP są oczyszczone i stan ten zostanie zastosowany przy najbliższym uruchomieniu synchronizacji administracyjnej.

### Commit i push - 2026-07-24

Planowany commit: `Usuń obsługę zdjęć produktów i wyczyść dane`. Zakres obejmuje
usunięcie funkcji zdjęciowych, czyszczenie danych FTP, cache PWA `v44`,
aktualizację dokumentacji i sanitizację synchronizacji Airtable. Walidacja:
lint PHP, zgodność SHA-256 FTP, HTTPS 200, `maintenance:false`, stary endpoint
404 oraz `git diff --check`. Commit i push do `origin/main` są wykonywane na
wyraźne polecenie użytkownika w tej rozmowie.
