# Lista zakupów — instrukcja użytkownika

## Logowanie

Otwórz adres aplikacji, wybierz rodzinę i wpisz login oraz hasło. Po poprawnym logowaniu aplikacja wczyta listę zakupów oraz dane dostępne dla Twojej rodziny. Przycisk **Wyloguj** kończy sesję także na serwerze.

## Lista zakupów

W zakładce **Lista zakupów** można dodawać produkty, zmieniać ilość i jednostkę oraz zaznaczać produkty kupione. Produkty są grupowane według kategorii. Zmiany są zapisywane lokalnie, a po odzyskaniu połączenia synchronizowane z serwerem.

## Wszystkie produkty

Zakładka **Wszystkie produkty** zawiera katalog produktów rodziny. Strzałka przy ilości i jednostce rozwija akcje wartości odżywczych, edycji i trwałego usunięcia. Trwałe usunięcie wymaga potwierdzenia i nie można go cofnąć.

## Dieta i wartości odżywcze

Zakładka **Moja dieta** pozwala prowadzić dziennik oraz zapisywać makroskładniki. Karta produktu może pokazać kalorie, białko, tłuszcz, węglowodany, cukry, sól, błonnik i nasycone kwasy tłuszczowe. Brakujące wartości pozostają puste.

Aplikacja nie obsługuje zdjęć produktów ani zdjęć opakowań.

## Ustawienia i hasło

W **Ustawieniach** można zmienić preferencje listy, widoku produktów i widoczności diety. Nowe hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.

## Administrator rodziny

Administrator rodziny może zarządzać kontami własnej rodziny, rolami administratorów i produktami. Narzędzia administratora są widoczne tylko dla uprawnionych kont.

## PWA i synchronizacja

Aplikację można dodać do ekranu głównego telefonu. Service worker przechowuje podstawowe pliki interfejsu, a dane robocze są buforowane lokalnie. Po powrocie internetu aplikacja próbuje wysłać oczekujące zmiany.

Podczas aktualizacji aplikacja może być chwilowo niedostępna. Po zakończeniu wdrożenia odśwież stronę.

## Gdy coś nie działa

1. Odśwież stronę z pominięciem pamięci podręcznej.
2. Sprawdź, czy jesteś zalogowany i masz połączenie z internetem.
3. Jeśli problem dotyczy wszystkich urządzeń, zgłoś go administratorowi globalnemu.
