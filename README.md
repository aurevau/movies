# Movies - Posterbutik (React Native / Expo)

En app där man bläddrar bland posters (filmer) hämtade från TMDB, filtrerar på genre, sparar favoriter och köper filmer via kundvagn och checkout. 

## Funktioner
- Katalog med populära och högst betygsatta filmer
- Filterring på genre
- Detaljvy per film med betyg och pris
- Kundvagn (lägg till, minska, ta bort) och checkout med validering
- Favorites per användare
- Laddningsindikatorer och felmeddelanden

  ## Teknik
  Expo, React Native, Expo Router, TypeScript, Zustand (+ persist), AsyncStorage, TMDB API.

  ## Struktur
  - `domain/` typer och helper-funktioner 
  - `services/` API-anrop
  - `hooks/` datahämtning
  - `store/` globalt tillstånd med persist
  - `components/` återanvändbara ui-komponenter
  - `app/` skärmar och routing
 
  ### Vidareutveckling
  - Ett authflöde där man kan skapa en användare utan att köpa något, så att favoriter kan knytas till användaren.
  - Fritextsökning mot TMDB:s sökendpoint
  - Paginering
  - Ljust/mörkt tema som följer systemet

