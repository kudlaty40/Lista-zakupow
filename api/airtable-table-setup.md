# Konfiguracja Airtable

Utwórz tabelę `shopping_list` oraz pola: `user` (Single line text), `data` (Long text) i `updated_at` (Date z czasem albo Single line text).

Ustaw token oraz identyfikatory wyłącznie w zmiennych środowiskowych PHP: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`, `AIRTABLE_USER_FIELD`, `AIRTABLE_DATA_FIELD` i `AIRTABLE_UPDATED_FIELD`.

Token powinien mieć dostęp tylko do używanej bazy oraz zakresy `data.records:read` i `data.records:write`. Nie zapisuj go w plikach aplikacji ani w repozytorium.
