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

### Archiwum zakończonej wersji

Utworzono lokalne archiwum `FINAL-IMMUTABLE-20260722T203340Z` z pełnym stanem FTP: `public_html`, `app-private` i `.grilujmy-backups`. Archiwum zawiera manifest SHA-256, kopię roboczą tylko do odczytu oraz szyfrowany plik stanu chroniony hasłem przekazanym poza repozytorium. Przywracanie jest ręczne, zakres ograniczony do katalogów aplikacji i nie podlega standardowej retencji snapshotów.
