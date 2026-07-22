# Lista zakupów

Prywatna aplikacja PWA do wspólnych list zakupów dla kilku rodzin. Działa na komputerze i telefonie, również podczas chwilowego braku internetu.

## Najważniejsze funkcje

- wspólna lista zakupów, historia produktów i oznaczanie zakupów;
- konta użytkowników oraz role administratora rodziny i superadministratora;
- produkty pogrupowane według kategorii z możliwością zwijania kategorii;
- ustawienia widoku zapisywane osobno dla każdego konta;
- tryb offline PWA z kolejką zmian i późniejszą synchronizacją;
- zdjęcia produktów przechowywane przez chroniony endpoint;
- dziennik diety, makroskładniki i opcjonalne dane żywieniowe;
- opcjonalna synchronizacja z Airtable;
- panel superadministratora z zarządzaniem rodzinami, Airtable, synchronizacją i bezpieczeństwem.

## Wymagania

- PHP 8.0+ z rozszerzeniami JSON, cURL i GD;
- Apache 2.4 z `mod_rewrite`, `mod_headers` i obsługą `.htaccess`;
- zapisywalne katalogi danych i kopii zapasowych poza webrootem;
- HTTPS w środowisku produkcyjnym.

## Uruchomienie lokalne

1. Skopiuj pliki aplikacji do prywatnego katalogu roboczego.
2. Przygotuj zapisywalne katalogi danych i backupów poza katalogiem publicznym.
3. Skonfiguruj administratora globalnego przez bezpieczny hash hasła:

   ```powershell
   php -r "echo password_hash('SILNE_HASLO', PASSWORD_ARGON2ID), PHP_EOL;"
   ```

4. Ustaw konfigurację w środowisku procesu PHP lub w prywatnej konfiguracji hostingu. Nie przechowuj sekretów w repozytorium.
5. Uruchom lokalny serwer:

   ```powershell
   php -S localhost:8000
   ```

6. Otwórz `http://localhost:8000`, wybierz **Admin**, zaloguj się i utwórz pierwszą rodzinę.

## Panel administratora

Superadministrator może zarządzać rodzinami, nadawać hasła administratorom rodzin, konfigurować Airtable, sprawdzać połączenie, ustawiać globalną synchronizację oraz zmieniać własne hasło. Panel jest podzielony na karty i wymaga osobnej sesji superadministratora.

Administrator rodziny zarządza kontami swojej rodziny i produktami. Jego ustawienia nie dają dostępu do globalnej konfiguracji Airtable ani do ustawień innych rodzin.

## Airtable

Integracja jest opcjonalna. Token powinien mieć minimalne uprawnienia tylko do wybranej bazy i tabeli: `data.records:read` oraz `data.records:write`. Token jest przechowywany wyłącznie po stronie serwera i nigdy nie jest zwracany do przeglądarki. Szczegóły struktury tabeli znajdują się w [api/airtable-table-setup.md](api/airtable-table-setup.md).

## Wdrożenie produkcyjne

1. Umieść pliki aplikacji w `public_html`, bez katalogów runtime, backupów i konfiguracji lokalnej.
2. Skonfiguruj prywatne ścieżki danych, backupów oraz hash administratora poza webrootem.
3. Token Airtable i identyfikatory bazy przechowuj wyłącznie w prywatnej konfiguracji serwera.
4. Włącz HTTPS i sprawdź przekierowanie HTTP → HTTPS.
5. Przed każdą zmianą wykonaj prywatny snapshot FTP, wdrażaj pliki seryjnie i zweryfikuj sumy kontrolne.
6. Sprawdź logowanie, zapis produktu, zdjęcia, backup, tryb offline i synchronizację Airtable.

## Bezpieczeństwo

Nie publikuj `storage/`, `archives/`, `.vscode/sftp.json`, plików konfiguracji, haseł, tokenów Airtable, kluczy prywatnych ani danych FTP/SFTP. Dane aplikacji i backupy powinny znajdować się poza webrootem i być dostępne wyłącznie przez autoryzowane endpointy.

Po każdym podejrzeniu wycieku natychmiast unieważnij token, zmień hasła, usuń sekret z kopii wdrożeniowych i przejrzyj logi dostępu. Nie wykonuj commitów zawierających dane produkcyjne.

Plik `off.json` zawiera publiczny zbiór danych Open Food Facts używany opcjonalnie do wyszukiwania informacji żywieniowych. Nie zawiera danych kont aplikacji ani sekretów. Przy dalszym rozpowszechnianiu zbioru należy zachować wymagane oznaczenia i warunki licencyjne Open Food Facts (ODbL).

## Licencja i przeznaczenie

Projekt jest przeznaczony do prywatnego użytku własnego. Przed publicznym wdrożeniem należy samodzielnie sprawdzić konfigurację hostingu, uprawnienia plików i certyfikat TLS.
