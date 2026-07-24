# Lista zakupów — dokumentacja deweloperska

## Aktualny stan

Aktualna wersja klienta PWA to `v44`. Aplikacja składa się z `index.html`,
`script.js`, `styles.css`, `sw.js` oraz endpointów PHP w `api/`.

Obsługa zdjęć produktów i zdjęć opakowań została trwale usunięta. Aplikacja
nie ma przycisków, podglądów, endpointów, pól danych ani kolejek offline
związanych ze zdjęciami.

## Główne pliki i endpointy

- `index.html` — struktura ekranów logowania, list, diety i ustawień.
- `script.js` — stan klienta, renderowanie, IndexedDB, kolejka offline i API.
- `styles.css` — responsywny układ i style interfejsu.
- `sw.js` — cache PWA; każda zmiana klienta wymaga zwiększenia wersji cache.
- `api/security.php` — sesje, autoryzacja, rate limit i tryb serwisowy.
- `api/products.php` — lokalny magazyn produktów i operacje synchronizacji.
- `api/nutrition.php` — kontrolowany proxy do Open Food Facts/Open Food Repo.
- `api/maintenance-status.php` — publiczny odczyt stanu trybu serwisowego.
- `api/families.php`, `api/user-accounts.php` — rodziny, konta i role.
- `api/admin-sync.php`, `api/airtable-settings.php`, `api/airtable-health.php` —
  funkcje Airtable dostępne dla superadministratora.

Usunięte endpointy `api/product-image.php` i moduł `api/airtable-client.php` nie
mogą być ponownie dodawane bez osobnego polecenia.

## Dane produktów i nutrition

Produkt przechowuje podstawowe pola listy oraz opcjonalne `nutrition`.
Obiekt nutrition może zawierać `source`, `productName`, `kcal`, `protein`,
`fat`, `carbs`, `sugars`, `salt`, `fiber`, `saturatedFat`, `nutriScore` i
`novaGroup`. Brakujące wartości pozostają `null`. Pole `imageUrl` nie jest
obsługiwane i nie może być zapisywane w danych rodziny ani Airtable.

`api/products.php` filtruje stare pola `image`, `imageId`, `imageStatus`,
`imageUpdatedAt` i `photoOperationId` podczas odczytu, zapisu i scalania
operacji offline. Nie przechowuj danych binarnych ani adresów obrazów w payloadzie.

## Tryb offline

IndexedDB przechowuje payloady produktów, dziennika i kolejkę zwykłych zmian.
Wersja bazy offline usuwa pozostałości dawnych kluczy kolejek zdjęciowych.
Po odzyskaniu sieci klient ponawia wyłącznie zwykłe operacje danych.

## Tryb serwisowy i wdrożenie

Flaga `/app-private/maintenance.flag` jest poza webrootem. Jej obecność
powoduje blokadę chronionych endpointów odpowiedzią HTTP 503, a klient pokazuje
ekran aktualizacji. `api/maintenance-status.php` zwraca `maintenance: true` lub
`false` bez ujawniania konfiguracji prywatnej.

Stała procedura wdrożenia: włączyć flagę, potwierdzić blokadę HTTPS, przesłać
wyłącznie wskazane pliki przez FTPS, porównać SHA-256, wykonać test HTTPS i
usunąć flagę po pozytywnej weryfikacji. Nie wykonywać nowych snapshotów FTP i
nie robić automatycznego rollbacku.

## Bezpieczeństwo

Sekrety, konfiguracja, `storage/`, `archives/` i `app-private/` pozostają poza
repozytorium i webrootem. Endpointy sprawdzają sesję, rodzinę i uprawnienia.
Nie ujawniaj tokenów Airtable ani szczegółów błędów dostawcy.

## Testy regresji

- `php -l` dla każdego zmienionego endpointu;
- `git diff --check`;
- sprawdzenie składni JavaScript i CSS;
- logowanie, izolacja rodzin, lista produktów, edycja i usuwanie;
- nutrition z pełnymi, częściowymi i brakującymi wartościami;
- potwierdzenie braku `imageUrl` w odpowiedzi i danych rodziny;
- test offline bez kolejek zdjęciowych;
- potwierdzenie, że `/api/product-image.php` zwraca 404;
- kontrola pustych katalogów `data/images`, HTTP 200 po wdrożeniu i
  `maintenance:false`.
