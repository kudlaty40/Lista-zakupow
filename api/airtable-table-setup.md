# Konfiguracja Airtable

Integracja jest opcjonalna i odpowiada kodowi w `api/products.php`.

## Tabela i pola

Utwórz w wybranej bazie tabelę `shopping_list` oraz pola:

| Pole | Typ | Zastosowanie |
| --- | --- | --- |
| `user` | Single line text | Klucz użytkownika lub danych wspólnych |
| `data` | Long text | Pełny dokument JSON aplikacji |
| `updated_at` | Date z czasem albo Single line text | Czas ostatniej synchronizacji |

Pole `user` może być polem głównym tabeli. Opcjonalne pola, takie jak `app_version` lub `note`, nie są używane przez aplikację.

## Konfiguracja aplikacji

Skopiuj `api/airtable-config.php.example` jako `api/airtable-config.php` i ustaw:

- `api_key` — token Personal Access Token;
- `base_id` — identyfikator bazy (`app...`);
- `table_name` — domyślnie `shopping_list`;
- `user_field`, `data_field`, `updated_field` — nazwy utworzonych pól.

Plik konfiguracyjny jest prywatny: nie dodawaj go do Git, nie udostępniaj w zrzutach ekranu i nie wprowadzaj tokenu do kodu przeglądarki.

## Uprawnienia tokenu

Token powinien mieć dostęp tylko do jednej używanej bazy oraz wyłącznie zakresy:

- `data.records:read`;
- `data.records:write`.

Nie nadaj tokenowi uprawnień do innych baz ani administracji workspace'em.

## Sprawdzenie

Po wdrożeniu zaloguj się, dodaj produkt i odśwież stronę. W Airtable powinien pojawić się lub zostać zaktualizowany rekord z wartością `user`, dokumentem JSON w `data` oraz aktualnym czasem w `updated_at`.
