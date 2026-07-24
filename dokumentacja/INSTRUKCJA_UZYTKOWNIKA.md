# Lista zakupów — instrukcja użytkownika

## Logowanie

Otwórz adres aplikacji, wybierz rodzinę i wpisz login oraz hasło. Po poprawnym logowaniu aplikacja wczyta listę zakupów oraz dane dostępne dla Twojej rodziny. Przycisk **Wyloguj** kończy sesję także na serwerze.

## Lista zakupów

W zakładce **Lista zakupów** można dodawać produkty, zmieniać ilość i jednostkę oraz zaznaczać produkty kupione. Produkty są grupowane według kategorii. Nagłówkiem kategorii można ją zwinąć lub rozwinąć; domyślnie kategorie są rozwinięte.

Zmiany są zapisywane lokalnie, a po odzyskaniu połączenia synchronizowane z serwerem. Przy braku internetu można nadal pracować na ostatnio wczytanych danych.

## Wszystkie produkty

Zakładka **Wszystkie produkty** zawiera katalog produktów rodziny. Strzałka przy ilości i jednostce rozwija dodatkowe akcje produktu, między innymi zdjęcie, wartości odżywcze, edycję i trwałe usunięcie. Akcje pojawiają się w wierszu poniżej. Trwałe usunięcie wymaga jednego potwierdzenia i nie można go cofnąć.

Strzałka przy ilości jest grubym symbolem graficznym: skierowana w dół oznacza zwinięte akcje, a w górę — rozwinięte. Jej pozycja jest stała niezależnie od jednostki produktu. Przyciski akcji mają jednolity rozmiar i kształt, dzięki czemu łatwiej obsługiwać je na telefonie.

## Zdjęcia i dieta

Zdjęcia są dodawane z poziomu akcji produktu. Zakładka **Moja dieta** pozwala prowadzić dziennik oraz zapisywać makroskładniki. Użytkownik może ukryć kartę diety w **Ustawieniach**; ukrycie nie usuwa zapisanych danych.

## Ustawienia i hasło

Ustawienia są podzielone na karty. Można tam zmienić preferencje listy, widoku produktów i widoczności diety. W karcie **Zmiana hasła** podaj obecne hasło oraz nowe hasło dwa razy. Nowe hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.

Jeśli karta **Moja dieta** jest wyłączona, nie pojawi się po zalogowaniu ani po odświeżeniu. Ustawienie jest pobierane razem z danymi konta.

## Administrator rodziny

## Dodatkowe dane produktu

Karta produktu moze pokazac cukry, sol, blonnik i nasycone kwasy tluszczowe.
Jezeli produkt ma dane z publicznej bazy, aplikacja moze uzyc zdjecia
opakowania jako obrazu zastepczego. Na dole takiego zdjecia pojawiaja sie
dostepne oznaczenia Nutri-Score i NOVA. Wlasne zdjecie dodane przez uzytkownika
zawsze ma pierwszenstwo i nie otrzymuje tej publicznej nakladki.

Administrator rodziny może zarządzać kontami własnej rodziny, rolami administratorów i produktami. Nie ma dostępu do globalnej konfiguracji Airtable ani synchronizacji superadministratora.

## PWA i synchronizacja

Aplikację można dodać do ekranu głównego telefonu. Service worker przechowuje podstawowe pliki interfejsu, a dane robocze są buforowane lokalnie. Po powrocie internetu aplikacja próbuje wysłać oczekujące zmiany. Nie usuwaj danych przeglądarki, jeśli urządzenie nie wykonało jeszcze synchronizacji.

Na telefonie przycisk **Wyloguj** znajduje się w prawej części nagłówka.

## Gdy coś nie działa

1. Odśwież stronę z pominięciem pamięci podręcznej.
2. Sprawdź, czy jesteś zalogowany i masz połączenie z internetem.
3. Nie czyść danych aplikacji przed zakończeniem synchronizacji.
4. Jeśli problem dotyczy wszystkich urządzeń, zgłoś go administratorowi globalnemu.

## Reset hasła administratora rodziny

Reset administratora rodziny wykonuje wyłącznie superadministrator w panelu **Admin**. W edycji rodziny należy wybrać administratora, wpisać nowe hasło dwa razy i kliknąć **Nadaj nowe hasło**. Przycisk **Zapisz zmiany** zapisuje dane rodziny, ale nie zmienia hasła.

Narzędzia administratora rodziny są widoczne tylko dla kont z rolą administratora. Zdjęcia produktów są zapisywane w prywatnym magazynie; przy problemie z połączeniem pozostają lokalnie i są ponownie wysyłane po odzyskaniu internetu.
### Zdjęcia produktów

Zdjęcie jest najpierw optymalizowane lokalnie (maksymalnie 1280 px), a następnie buforowane na urządzeniu i wysyłane do prywatnego magazynu. Po potwierdzeniu zapisu w danych rodziny i synchronizacji zdjęcie staje się dostępne dla pozostałych członków tej samej rodziny. Jeśli połączenie zostanie przerwane, nie zamykaj danych aplikacji — operacja zostanie ponowiona automatycznie.
