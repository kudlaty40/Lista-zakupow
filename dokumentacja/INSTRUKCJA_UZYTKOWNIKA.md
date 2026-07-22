# Lista zakupów — instrukcja użytkownika

## Logowanie

Otwórz adres aplikacji, wybierz rodzinę i wpisz login oraz hasło. Po poprawnym logowaniu aplikacja wczyta listę zakupów oraz dane dostępne dla Twojej rodziny. Przycisk **Wyloguj** kończy sesję także na serwerze.

## Lista zakupów

W zakładce **Lista zakupów** można dodawać produkty, zmieniać ilość i jednostkę oraz zaznaczać produkty kupione. Produkty są grupowane według kategorii. Nagłówkiem kategorii można ją zwinąć lub rozwinąć; domyślnie kategorie są rozwinięte.

Zmiany są zapisywane lokalnie, a po odzyskaniu połączenia synchronizowane z serwerem. Przy braku internetu można nadal pracować na ostatnio wczytanych danych.

## Wszystkie produkty

Zakładka **Wszystkie produkty** zawiera katalog produktów rodziny. Strzałka przy ilości i jednostce rozwija dodatkowe akcje produktu, między innymi zdjęcie, wartości odżywcze, edycję i trwałe usunięcie. Akcje pojawiają się w wierszu poniżej. Trwałe usunięcie wymaga jednego potwierdzenia i nie można go cofnąć.

## Zdjęcia i dieta

Zdjęcia są dodawane z poziomu akcji produktu. Zakładka **Moja dieta** pozwala prowadzić dziennik oraz zapisywać makroskładniki. Użytkownik może ukryć kartę diety w **Ustawieniach**; ukrycie nie usuwa zapisanych danych.

## Ustawienia i hasło

Ustawienia są podzielone na karty. Można tam zmienić preferencje listy, widoku produktów i widoczności diety. W karcie **Zmiana hasła** podaj obecne hasło oraz nowe hasło dwa razy. Nowe hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.

## Administrator rodziny

Administrator rodziny może zarządzać kontami własnej rodziny, rolami administratorów i produktami. Nie ma dostępu do globalnej konfiguracji Airtable ani synchronizacji superadministratora.

## PWA i synchronizacja

Aplikację można dodać do ekranu głównego telefonu. Service worker przechowuje podstawowe pliki interfejsu, a dane robocze są buforowane lokalnie. Po powrocie internetu aplikacja próbuje wysłać oczekujące zmiany. Nie usuwaj danych przeglądarki, jeśli urządzenie nie wykonało jeszcze synchronizacji.

## Gdy coś nie działa

1. Odśwież stronę z pominięciem pamięci podręcznej.
2. Sprawdź, czy jesteś zalogowany i masz połączenie z internetem.
3. Nie czyść danych aplikacji przed zakończeniem synchronizacji.
4. Jeśli problem dotyczy wszystkich urządzeń, zgłoś go administratorowi globalnemu.
