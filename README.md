# Lista zakupów

Prywatna aplikacja PWA do wspólnych list zakupów dla wielu rodzin. Zapewnia konta użytkowników, synchronizację, zdjęcia produktów, dziennik diety oraz opcjonalną integrację Airtable.

## Funkcje

- wspólne listy zakupów i historia produktów;
- administrator globalny, administratorzy rodzin i zwykłe konta;
- tryb offline z kolejką synchronizacji;
- dziennik diety i makroskładniki;
- zdjęcia produktów oraz PWA do instalacji na telefonie;
- opcjonalna synchronizacja Airtable.

## Wymagania

- PHP 8.0+ z JSON, cURL i GD;
- Apache 2.4 z obsługą `.htaccess`, `mod_headers` i `mod_deflate`;
- HTTPS w środowisku publicznym;
- prywatne, zapisywalne katalogi danych i backupów poza webrootem.

## Konfiguracja środowiska

Sekrety i ścieżki ustaw wyłącznie jako zmienne środowiskowe procesu PHP:

- `APP_STORAGE_DIR` — prywatny katalog danych;
- `APP_BACKUP_DIR` — prywatny katalog backupów;
- `SUPER_ADMIN_PASSWORD_HASH` — hash Argon2id lub bcrypt hasła administratora globalnego;
- `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID` oraz opcjonalnie `AIRTABLE_TABLE_NAME`, `AIRTABLE_USER_FIELD`, `AIRTABLE_DATA_FIELD`, `AIRTABLE_UPDATED_FIELD`.

Nie twórz `.env`, `api/airtable-config.php`, `api/security-config.php` ani `api/private-paths.php`. Nie umieszczaj sekretów w `.htaccess`, Git ani w kodzie przeglądarki.

Hash hasła można wygenerować lokalnie:

```powershell
php -r "echo password_hash('SILNE_HASLO', PASSWORD_ARGON2ID), PHP_EOL;"
```

## Uruchomienie lokalne

1. Ustaw powyższe zmienne na katalogi dostępne do zapisu przez PHP.
2. W katalogu projektu uruchom:

   ```powershell
   php -S localhost:8000
   ```

3. Otwórz `http://localhost:8000`, wybierz **Admin**, zaloguj się hasłem administratora globalnego i utwórz pierwszą rodzinę.

## Airtable

Integracja jest opcjonalna. Token powinien mieć dostęp wyłącznie do jednej bazy i zakresy `data.records:read` oraz `data.records:write`. Struktura tabeli jest opisana w [api/airtable-table-setup.md](api/airtable-table-setup.md).

## Wdrożenie

1. Skonfiguruj zmienne środowiskowe w panelu hostingu lub PHP-FPM poza katalogiem publicznym.
2. Wdróż pliki aplikacji przez FTP, bez `.git`, `storage/`, `archives/`, `.vscode/` i sekretów.
3. Sprawdź logowanie, utworzenie rodziny, zapis produktu, backup i opcjonalną synchronizację Airtable.
4. Po poprawnym uruchomieniu certyfikatu SSL włącz HSTS na serwerze.

## Bezpieczeństwo

Nie publikuj katalogów danych i backupów, tokenów Airtable, haseł, kluczy prywatnych ani danych FTP/SFTP. Jeśli sekret trafi do repozytorium, unieważnij go, usuń historię zawierającą sekret i utwórz czyste repozytorium.
