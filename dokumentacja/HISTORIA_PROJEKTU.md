# Lista zakupów — historia ustaleń i wdrożeń

Ten plik jest lokalnym rejestrem projektu. Nie zawiera haseł, tokenów, danych kont ani danych produkcyjnych.

## Zasady

- Dokumentacja i snapshoty robocze pozostają lokalne.
- FTP jest środowiskiem wdrożeniowym, a GitHub zawiera wyłącznie oczyszczony kod przeznaczony do publikacji.
- Przed zmianą na FTP należy wykonać prywatny snapshot i po wdrożeniu zweryfikować stan.
- Żaden sekret nie może trafić do Git, GitHub, logów ani dokumentacji.

## Chronologia

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
