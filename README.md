# HandyHub

HandyHub on mobiilirakendus kohalike teenusepakkujate leidmiseks. Rakenduse kaudu saab otsida näiteks maniküürijaid, juuksureid, elektrikuid, torulukkseppi, kosmeetikuid ja teisi praktilisi spetsialiste.

Projekt on realiseeritud kahes versioonis:

- Androidi native-rakendus, mis kasutab Kotlin'i ja Jetpack Compose'i;
- cross-platform mobiilirakendus, mis kasutab React Native'i ja Expo't.

Mõlemad rakendused järgivad sama ideed, domeenistruktuuri ja põhifunktsionaalsust, kuid on loodud erinevate mobiiliarenduse tehnoloogiatega.

## MVP

Projekti MVP sisaldab järgmisi põhifunktsioone:

- teenusekategooriate nimekiri;
- meistrite nimekiri;
- meistri kaart;
- meistri detailvaade;
- otsing ja kategooriafilter;
- meistri hinnang;
- kommentaarid ja arvustused;
- meistri registreerimine;
- kliendi registreerimine ja sisselogimine;
- teenuste lisamine ja muutmine;
- andmete lokaalne salvestamine SQLite abil.

## Meeskond

Projekti arendavad kaks tudengit:

- Jekaterina Shashkina — Kotlin / Jetpack Compose versioon;
- Nadežda Artamonova — React Native / Expo versioon.

Ühised nõuded, dokumentatsioon ja disainiotsused on arenduse käigus kooskõlastatud.

## Repositooriumi struktuur

```text
HandyHub/
  kotlin-app/
  react-native-app/
  assets/
```

## Dokumentatsioon

React Native versiooni detailne dokumentatsioon asub siin:

[React Native README](react-native-app/README.md)

React Native README sisaldab projekti kirjeldust, funktsionaalsust, arhitektuuri, andmete haldamist, valideerimist, käivitamise juhendit, ekraanipilte, video demonstratsiooni ja AI kasutamise kirjeldust.

## GitHubi kasutamine

Arenduse käigus kasutati GitHubi versioonihaldust:

- eraldi harusid uute funktsioonide jaoks;
- sisukaid commit message'eid;
- pull request'e muudatuste lisamiseks `main` harusse;
- regulaarset sünkroniseerimist `main` haruga;
- ühist repositooriumi mõlema rakenduse versiooni jaoks.

Selline töövoog võimaldas hoida Kotlin'i ja React Native'i osad ühes projektis, kuid arendada neid eraldi.
