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
