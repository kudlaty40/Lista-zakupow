# Lista zakupów

Prywatna aplikacja PWA do wspólnych list zakupów dla kilku rodzin, działająca
także z chwilowym brakiem internetu.

## Funkcje

- wspólne listy zakupów, historia produktów i kategorie;
- konta użytkowników oraz role administratora;
- tryb offline PWA z kolejką zwykłych zmian;
- dziennik diety i wartości odżywcze, w tym cukry, sól, błonnik i tłuszcze nasycone;
- opcjonalna synchronizacja Airtable i panel superadministratora.

Aplikacja nie obsługuje zdjęć produktów ani zdjęć opakowań.

## Uruchomienie lokalne

Wymagany jest PHP 8.0+ z JSON i cURL oraz Apache lub serwer developerski PHP.
Sekrety i dane aplikacji przechowuj poza repozytorium i webrootem.

```powershell
php -S localhost:8000
```

## Wdrożenie

Publikuj wyłącznie kod aplikacji. Podczas aktualizacji włącz tryb serwisowy,
prześlij wskazane pliki przez FTPS, porównaj SHA-256, wykonaj test HTTPS i
wyłącz tryb serwisowy. Zgodnie ze stałą projektu nie twórz nowych snapshotów
FTP. Nie wysyłaj `storage/`, `archives/`, `app-private/`, konfiguracji ani
sekretów.

## Bezpieczeństwo

Token Airtable pozostaje wyłącznie po stronie serwera. Dane rodzin i backupy
muszą być poza webrootem i dostępne tylko przez autoryzowane endpointy.
