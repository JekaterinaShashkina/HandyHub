# HandyHub React Native App

HandyHub React Native App on õppeprojekti HandyHub cross-platform mobiilirakenduse versioon, mis on loodud React Native'i ja Expo abil. Rakendus on kohalike teenuste platvorm, kus kasutaja saab leida meistri, vaadata tema profiili, teenuseid, hinnangut ja arvustusi. Meister saab luua spetsialisti profiili ning hallata oma teenuseid.

Android/Kotlin versioon on realiseeritud eraldi, kuid mõlemad versioonid kasutavad sama domeeni: kasutajad, rollid, kategooriad, meistrid, teenused ja arvustused.

## Üldinfo

Projekt: `HandyHub`

React Native osa: `react-native-app`

Meeskond:

- Jekaterina Shashkina — Android/Kotlin versioon;
- Nadežda Artamonova — React Native versioon.

Rakenduse põhiidee on lihtsustada kohalike spetsialistide leidmist. Näiteks saab kasutaja otsida maniküürijaid, juuksureid, elektrikuid, torulukkseppi, kosmeetikuid ja teisi teenusepakkujaid.

## Projekti eesmärk

Rakendus lahendab teenusepakkujate otsimise ja võrdlemise probleemi. Klient saab kiiresti leida spetsialisti kategooria või otsingu abil, vaadata hinda, teenuse kirjeldust, hinnangut ja arvustusi. Meister saab esitada oma teenuseid, luua spetsialisti profiili ja uuendada enda andmeid.

Rakendus on mõeldud kahele kasutajagrupile:

- klientidele, kes otsivad teenusepakkujat;
- meistritele, kes soovivad oma teenuseid pakkuda.

## Funktsionaalsus

### Kõigile kasutajatele

- meistrite nimekirja vaatamine;
- otsing nime, kategooria, teenuse pealkirja ja teenuse kirjelduse järgi;
- meistrite filtreerimine kategooriate järgi;
- meistri detailvaate vaatamine;
- meistri teenuste vaatamine;
- arvustuste ja hinnangu vaatamine;
- pikkade arvustuste avamine ja sulgemine nuppudega `Expand` ja `Collapse`.

### Kliendile

- kliendi registreerimine;
- kontole sisselogimine;
- profiili muutmine;
- avatari valimine ja uuendamine;
- meistrile arvustuse lisamine;
- enda olemasoleva arvustuse muutmine;
- enda arvustuste vaatamine profiilis;
- võimalus saada meistriks.

### Meistrile

- spetsialisti profiili registreerimine;
- esimese teenuse loomine meistri registreerimisel;
- meistri profiili muutmine;
- uue teenuse lisamine;
- teenuse muutmine;
- teenuse peitmine ja taastamine;
- kontroll, et viimast aktiivset teenust ei saa peita.

## Olulisemad kasutusjuhtumid

1. Külaline avab rakenduse, vaatab meistreid, kasutab otsingut ja kategooriafiltrit.
2. Kasutaja registreerib end kliendina ja logib sisse.
3. Klient avab meistri detailvaate, valib hinnangu ja lisab arvustuse.
4. Klient saab oma arvustust muuta ning uuendatud arvustus kuvatakse kohe nimekirjas.
5. Klient saab profiili kaudu hakata meistriks.
6. Meister saab lisada, muuta, peita ja taastada teenuseid.

## Kasutatud tehnoloogiad

- React Native;
- Expo;
- Expo Router;
- TypeScript;
- SQLite läbi `expo-sqlite`;
- React Context;
- `@expo/vector-icons`;
- `expo-image-picker`.

## Andmete haldamine

React Native versioon kasutab lokaalset SQLite andmebaasi läbi `expo-sqlite`.

Andmebaasis hoitakse:

- rolle;
- kasutajaid;
- kategooriaid;
- meistrite profiile;
- teenuseid;
- arvustusi.

Esimesel käivitamisel luuakse tabelid ja lisatakse algandmed:

- rollid;
- kategooriad.

Kasutajad, meistrid, teenused ja arvustused luuakse rakenduse kasutajaliidese kaudu. Testkasutajad ja testmeistrid on seed-andmetest eemaldatud, et demonstratsioon algaks puhta rakendusega.

Andmed laaditakse SQLite andmebaasist rakenduse käivitamisel. Kui kasutaja lisab või muudab andmeid, uuendatakse rakenduse state kohe ning muudatused salvestatakse lokaalsesse andmebaasi repository ja DAO kihtide kaudu.

## Valideerimine

### Kasutaja ja profiil

- kohustuslikud väljad: eesnimi, perekonnanimi, email, telefon ja parool;
- emaili formaadi kontroll;
- telefoni pikkuse kontroll;
- emaili unikaalsuse kontroll;
- telefoni unikaalsuse kontroll;
- profiili muutmisel ei loeta kasutaja enda emaili ja telefoni duplikaadiks.

### Arvustused

- arvustuse saab lisada ainult sisselogitud kasutaja;
- arvustuse saab lisada ainult kliendi rolliga kasutaja;
- meister ei saa teistele meistritele arvustusi jätta;
- kommentaar ei tohi olla tühi;
- hinnang peab olema valitud;
- üks klient saab ühele meistrile jätta ainult ühe arvustuse;
- korduv saatmine uuendab olemasolevat arvustust.

### Meistri teenused

- teenuse pealkiri on kohustuslik;
- kategooria on kohustuslik;
- teenuse kirjeldus on kohustuslik;
- hind peab olema suurem kui null;
- kestus peab olema suurem kui null;
- meister ei saa peita viimast aktiivset teenust.

Valideerimise failid:

```text
src/domain/validation/
  serviceValidation.ts
  userValidation.ts
```

## Rakenduse arhitektuur

React Native rakendus on jaotatud mitmeks kihiks:

```text
src/
  app/
  components/
  constants/
  data/
  database/
  domain/
  models/
  state/
  ui/
  utils/
```

### UI kiht

Expo Router ekraanid:

```text
src/app/
  index.tsx
  login.tsx
  register.tsx
  profile.tsx
  edit-profile.tsx
  add-master.tsx
  edit-master-profile.tsx
  master/[id].tsx
```

Taaskasutatavad komponendid:

```text
src/components/
  common/
  home/
  master/
  profile/
  register/
  login/
  add-master/
  master-profile/
```

Ühised komponendid:

- `BackButton`;
- `PrimaryButton`;
- `FormTextInput`;
- `PasswordField`;
- `FormMessage`;
- `ScreenHeader`;
- `RatingStars`;
- `AvatarPicker`.

### Models

Domeenimudelid on eraldi kaustas:

```text
src/models/
  Category.ts
  MasterProfile.ts
  Review.ts
  Role.ts
  Service.ts
  User.ts
  index.ts
```

### UI models ja mappers

UI-mudelid:

```text
src/ui/models/
  MasterCardUiModel.ts
  MasterDetailsUiModel.ts
  UserReviewUiModel.ts
```

Domeeniandmete teisendamine UI-mudeliteks:

```text
src/ui/mappers/masterMappers.ts
```

### Domain kiht

Äriloogika:

```text
src/domain/usecases/
  masterUseCases.ts
  reviewUseCases.ts
  serviceUseCases.ts
  userUseCases.ts
```

Valideerimine:

```text
src/domain/validation/
  serviceValidation.ts
  userValidation.ts
```

Domain kiht sisaldab meistri loomise, arvustuste uuendamise, teenuste haldamise ja kasutaja uuendamise reegleid. See kiht ei sõltu rakenduse ekraanidest.

### Data kiht

DAO-failid:

```text
src/data/local/
  categoryDao.ts
  masterProfileDao.ts
  reviewDao.ts
  roleDao.ts
  serviceDao.ts
  userDao.ts
```

Repository:

```text
src/data/repository/repository.ts
```

DAO sisaldab SQL-päringuid. Repository annab state-kihile mugavad meetodid andmete laadimiseks ja salvestamiseks.

### Database kiht

SQLite seadistus:

```text
src/database/
  database.ts
  mappers.ts
  provider.ts
  schema.ts
```

- `provider.ts` avab SQLite andmebaasi;
- `schema.ts` sisaldab SQL-skeemi ja migratsioone;
- `mappers.ts` teisendab andmebaasi read TypeScripti mudeliteks;
- `database.ts` initsialiseerib andmebaasi ja seed-andmed.

### State kiht

Globaalne state:

```text
src/state/
  AppContext.tsx
  types.ts
```

`AppContext` koordineerib aktiivset kasutajat, laaditud andmeid, repository väljakutseid ja domain use case'e.

## Rakenduse käivitamine

Mine rakenduse kausta:

```bash
cd react-native-app
```

Paigalda sõltuvused:

```bash
npm install
```

Käivita Expo:

```bash
npx.cmd expo start --go --clear
```

LAN-režiimi jaoks:

```bash
npx.cmd expo start --go --lan --clear
```

React Native versiooni testitakse Expo Go abil iOS või Android seadmes. Web-režiimi ei kasutata, sest rakendus kasutab lokaalset native-andmehoidlat `expo-sqlite` kaudu.

TypeScripti kontroll:

```bash
npx.cmd tsc --noEmit
```

## Ekraanipildid

Ekraanipildid asuvad kaustas:

```text
assets/screens/
```

### Avaleht

<img src="../assets/img/screens_react/IMG_6081.PNG" width="250">

### Kliendi profiil

<img src="assets/screens/IMG_6009.PNG" width="250">

### Meistri registreerimine

<img src="assets/screens/IMG_6010.PNG" width="250">

### Sisselogimine

<img src="assets/screens/IMG_6011.PNG" width="250">

### Meistri profiil

<img src="assets/screens/IMG_6008.PNG" width="250">

Täiendavad ekraanipildid asuvad samuti kaustas `assets/screens/`.

## Video demonstratsioon

React Native versiooni video demonstratsioon:

[https://www.youtube.com/shorts/uWRkQjBfEvg](https://www.youtube.com/shorts/uWRkQjBfEvg)

Videos näidatakse:

- rakenduse põhifunktsionaalsust;
- kasutajaliidest ja navigeerimist;
- registreerimist ja sisselogimist;
- andmete lisamist ja muutmist;
- arvustustega töötamist;
- meistri teenuste haldamist;

## AI kasutamine

React Native versiooni arendamisel kasutati ChatGPT / Codex tööriista.

AI-d kasutati:

- TypeScripti ja React Native vigade lahendamisel;
- Git-käskude selgitamisel;
- Expo, SQLite ja Metro bundler vigade analüüsimisel.

Iseseisvalt tehti:

- projekti teema valik;
- ühise idee kooskõlastamine Kotlin-versiooniga;
- React Native versiooni arhitektuuri lõplikud otsused;
- rakenduse testimine telefonis;
- video demonstratsiooni salvestamine;
- UI ja funktsionaalsuse lõplikud otsused;
- GitHubi, branch'ide ja pull request'idega töötamine;
- kasutajastsenaariumide testimine.

## GitHubi kasutamine

Arenduse käigus kasutati:

- branch'e;
- pull request'e;
- merge'i `main` harusse;
- sisukaid commit message'eid;
- regulaarset `git status` kontrolli;
- meeskonnatööd ühes GitHubi repositooriumis.

## Märkused

- React Native ja Kotlin versioonid on sama rakenduse kaks eraldi realisatsiooni.
- Mõlemal versioonil on oma lokaalne andmebaas.
- Ühist runtime'i või ühist andmebaasi rakenduste vahel ei kasutata.
- Pärast SQLite skeemi või seed-andmete muutmist võib iOS seadmes olla vaja Expo Go uuesti paigaldada, et lokaalne andmebaas lähtestada.
