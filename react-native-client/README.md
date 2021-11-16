## Oppdatering av backend

Det ble gjort noen endringer i backend, som blant annet å legge inn pagination for `artist` og `album`. I prosjekt 3 ble kun de første elementene fra `artist` og `album` hentet ut og vist i dropdown-listen, men ettersom vi fikk tilbakemelding på at dette var litt merkelig ettersom det var en drop-down-liste, så har vi også lagt inn infinite scroll når man velger Artist og Album og da var det nødvendig å oppdatere backend.

## Tydeliggjøring av "Opprett nytt album"

I prosjekt 3 hadde bruker mulighet til å opprette et nytt album med bilde. Denne funksjonen var likevel noe skjult, da man kun fikk opp muligheten dersom man ikke fant albumet man søkte etter. For å tydeliggjøre funksjonaliteten og gjøre det enklere og mer logisk for brukeren å kunne opprette et nytt album, så har vi lagt knappen for oppretting av album synlig hele tiden ved velging av album.

## Implementering av to komponenter for DatePicker

Ettersom DatePicker(legg inn til hvilken pakke) kun fungerer på en "native" enhet, har vi opprettet en annen komponent for DatePicker som skal fungere på web. Begge komponentene har samme navn, men filnavnet inneholder `.native` for native-komponenten. Expo/React-Native (usikker på hvilken av de) velger da automatisk den komponenten som kan tilhører enheten som benyttes.

## Apollo client

I prosjekt 3 ble queries fra backend cachet i InMemoryCache'en til [Apollo client](https://www.apollographql.com/docs/react/). Vi hadde likevel brukt useEffect og useState hos React for å legge sammen resultatet fra queriene, noe som kunne vært løst mye enklere med `merge`-funksjonen man kan definere i InMemoryCache. I prosjekt 4 har vi derfor ryddet opp, slik at koden både blir mer leselig, benytter de innebygde funksjonene til Apollo og lagrer data i cachen på en ryddigere måte.

## Design

### Dark mode

Chose not to implement with react-native-element's built in `useDark`-prop since it stopped flipping colors when toggling between dark and light mode. As well, this gives us more flexibility in terms of being able to choose colors specificly for each mode.
