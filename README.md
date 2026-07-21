# Lista zakupów

Prywatna aplikacja webowa/PWA do prowadzenia wspólnych list zakupów. Obsługuje wiele rodzin, konta użytkowników, synchronizację danych, historię produktów oraz prosty dziennik diety. Interfejs działa po polsku i może zostać zainstalowany na telefonie jak aplikacja.

## Funkcje

- wspólna lista zakupów dla wielu rodzin;
- konta użytkowników, administratorzy rodzin i administrator globalny;
- lista wszystkich produktów z kategoriami, historią i zdjęciami;
- tryb offline: lokalny cache, kolejka zmian i synchronizacja po odzyskaniu połączenia;
- dziennik diety oraz makroskładniki pobierane z Open Food Facts/Open Food Repo albo wpisywane ręcznie;
- opcjonalna synchronizacja danych przez Airtable;
- kopie zapasowe wykonywane przed zapisem danych;
- PWA z manifestem i service workerem.

## Wymagania

- PHP 8.0 lub nowszy z JSON; dla synchronizacji z Airtable zalecane jest rozszerzenie cURL;
- Apache 2.4 z obsługą PHP i plików `.htaccess` (`AllowOverride`), `mod_headers` oraz `mod_deflate`; `mod_rewrite` jest przydatny, jeśli hosting wymusza przekierowanie na HTTPS;
- zapisywalny katalog danych oraz osobny, prywatny katalog kopii zapasowych;
- HTTPS w środowisku publicznym.

Nie są wymagane Node.js, Composer ani baza SQL.

## Uruchomienie lokalne

1. Zainstaluj PHP i przejdź do katalogu projektu.
2. Utwórz prywatny katalog kopii, na przykład `archives/backups`.
3. Skopiuj `api/private-paths.php.example` jako `api/private-paths.php` i ustaw w nim pełną ścieżkę do katalogu kopii. Ten plik jest ignorowany przez Git.
4. Skopiuj `api/security-config.php.example` jako `api/security-config.php`. Wygeneruj hash hasła administratora globalnego i wstaw go do konfiguracji:

   ```powershell
   php -r "echo password_hash('Zmien-to-na-silne-haslo', PASSWORD_DEFAULT), PHP_EOL;"
   ```

   Nie zapisuj hasła jawnego w pliku ani w repozytorium.
5. Upewnij się, że PHP może zapisywać w `storage/` oraz w wybranym katalogu kopii. Zalecane jest ustawienie `APP_STORAGE_DIR` na katalog poza webrootem.
6. Uruchom serwer w katalogu projektu:

   ```powershell
   php -S localhost:8000
   ```

7. Otwórz `http://localhost:8000`, wybierz **Admin**, zaloguj się hasłem administratora globalnego, utwórz pierwszą rodzinę i jej konto administratora.

## Konfiguracja Airtable (opcjonalna)

Aplikacja działa bez Airtable; w tym wariancie dane są przechowywane lokalnie na serwerze. Aby włączyć synchronizację:

1. Skopiuj `api/airtable-config.php.example` jako `api/airtable-config.php`.
2. Wprowadź token PAT, Base ID i nazwy pól. Plik jest ignorowany przez Git i zablokowany przez `api/.htaccess`.
3. Nadaj tokenowi wyłącznie uprawnienia `data.records:read` i `data.records:write` do jednej używanej bazy.
4. Skonfiguruj tabelę według [api/airtable-table-setup.md](api/airtable-table-setup.md).

Nigdy nie umieszczaj tokenu Airtable w `script.js`, `index.html`, README ani w zmiennych repozytorium publicznego.

## Wdrożenie na hostingu

1. Włącz HTTPS i ustaw katalog strony jako katalog projektu.
2. Prześlij pliki aplikacji, ale nie przesyłaj `.git`, `storage/`, `archives/`, `.vscode/` ani prywatnych konfiguracji z innego środowiska.
3. Utwórz na serwerze prywatne katalogi danych i backupów. Ustaw `APP_STORAGE_DIR` na katalog poza webrootem, jeśli hosting umożliwia ustawienie zmiennych środowiskowych PHP.
4. Utwórz na serwerze pliki `api/private-paths.php` i `api/security-config.php`; opcjonalnie także `api/airtable-config.php`. Nie dodawaj ich do Git.
5. Sprawdź: utworzenie rodziny, logowanie, dodanie produktu, utworzenie backupu oraz — jeśli włączono — synchronizację Airtable.

## Bezpieczeństwo i publikowanie kodu

Do publicznego repozytorium mogą trafić wyłącznie pliki źródłowe i przykłady konfiguracji. Nie publikuj:

- `storage/` i `api/storage/` — mogą zawierać konta, hashe haseł, listy i zdjęcia;
- `archives/` — kopie danych;
- `.vscode/sftp.json` — dane wdrożeniowe;
- `api/security-config.php`, `api/private-paths.php`, `api/airtable-config.php` ani plików `.env`;
- tokenów Airtable, haseł, kluczy prywatnych i danych FTP/SFTP.

Jeśli sekret trafił do repozytorium lub historii Git, natychmiast go unieważnij/zmień, usuń z historii i utwórz świeże repozytorium bez starej historii. Samo usunięcie pliku w kolejnym commicie nie wystarcza.

## Struktura projektu

- `index.html`, `styles.css`, `script.js` — interfejs aplikacji;
- `api/` — API PHP, konta, dane, obrazy, backup i integracje;
- `storage/` — dane runtime (ignorowane przez Git);
- `icons/`, `manifest.webmanifest`, `sw.js` — zasoby PWA;
- `api/airtable-table-setup.md` — konfiguracja tabeli Airtable.
