# Protokół wdrożeń FTP

Przed każdą zmianą w `public_html` utwórz prywatny snapshot w
`/.deployment-backups/releases/<UTC>-<opis>/`.

1. Zapisz wynik testu bazowego: strona, API, blokada konfiguracji i danych.
2. Skopiuj poprzednią wersję każdego zmienianego pliku do `files/` snapshotu.
3. Zapisz manifest z SHA-256, listą nowych/usuniętych plików i statusem `prepared`.
4. Wdróż pełną serię zmian, a następnie porównaj sumy kontrolne i wykonaj test funkcjonalny.
5. Ustaw status `verified` albo `failed`. Nie cofaj automatycznie wdrożenia oznaczonego jako `failed` bez decyzji użytkownika.
6. Zachowaj 10 ostatnich wydań `verified`. Przy migracji danych dodaj pełny snapshot danych i eksport Airtable.

Rollback odtwarza wyłącznie pliki wymienione w manifeście: przywraca poprzednie wersje, usuwa pliki nowe i odtwarza reguły `.htaccess`.

Snapshoty, manifesty z konfiguracją i lokalne kopie nie mogą trafić do Git ani GitHub.
