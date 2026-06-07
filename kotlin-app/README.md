# HandyHub Android / Kotlin App

HandyHub Android App on õppeprojekti HandyHub native Android mobiilirakenduse versioon, mis on loodud Kotlini ja Jetpack Compose abil.

Rakendus on kohalike teenuste platvorm, kus kasutaja saab leida meistri, vaadata tema profiili, teenuseid, hinnanguid ja arvustusi. Meister saab luua spetsialisti profiili ning hallata oma teenuseid.

React Native versioon on realiseeritud eraldi, kuid mõlemad versioonid kasutavad sama domeeni: kasutajad, rollid, kategooriad, meistrid, teenused ja arvustused.

## Üldinfo

Projekt: `HandyHub`

Android osa: `kotlin-app`

Meeskond:

* Jekaterina Shashkina — Android / Kotlin versioon;
* Nadežda Artamonova — React Native versioon.

Rakenduse põhiidee on lihtsustada kohalike spetsialistide leidmist. Kasutaja saab otsida teenusepakkujaid, vaadata nende profiile, teenuseid, hindu, hinnanguid ja arvustusi.

## Projekti eesmärk

Rakendus lahendab teenusepakkujate otsimise ja võrdlemise probleemi. Klient saab kiiresti leida sobiva spetsialisti kategooria või otsingu abil ning vaadata tema teenuseid ja profiili.

Rakendus on mõeldud kahele kasutajagrupile:

* klientidele, kes otsivad teenusepakkujat;
* meistritele, kes soovivad oma teenuseid pakkuda.

## Funktsionaalsus

### Kõigile kasutajatele

* meistrite nimekirja vaatamine;
* teenuste otsing;
* kategooriate sirvimine;
* meistrite filtreerimine kategooriate järgi;
* meistri detailvaate vaatamine;
* meistri teenuste vaatamine;
* arvustuste ja hinnangu vaatamine;
* pikkade arvustuste avamine ja sulgemine.

### Kliendile

* kliendi registreerimine;
* kontole sisselogimine;
* kontolt väljalogimine;
* profiili vaatamine;
* profiili muutmine;
* avatari kasutamine;
* meistrile arvustuse lisamine;
* arvustuse muutmine;
* võimalus registreerida ennast meistriks.

### Meistrile

* spetsialisti profiili loomine;
* teenuse lisamine;
* teenuse muutmine;
* oma teenuste vaatamine ja haldamine.

## Olulisemad kasutusjuhtumid

1. Külaline avab rakenduse ja vaatab meistreid.
2. Kasutaja kasutab otsingut ja kategooriate filtrit.
3. Kasutaja registreerib konto ja logib sisse.
4. Kasutaja avab meistri detailvaate.
5. Kasutaja vaatab meistri teenuseid ja arvustusi.
6. Klient lisab meistrile arvustuse.
7. Kasutaja muudab oma profiiliandmeid.
8. Kasutaja saab registreerida ennast meistriks.
9. Meister saab lisada ja muuta oma teenuseid.

## Kasutatud tehnoloogiad

* Kotlin;
* Jetpack Compose;
* Material Design 3;
* Navigation Compose;
* Room Database;
* SQLite;
* Kotlin Coroutines;
* Android Studio.

## Andmete haldamine

Android versioon kasutab lokaalset SQLite andmebaasi Room Database teegi kaudu.

Andmebaasis hoitakse:

* rolle;
* kasutajaid;
* kategooriaid;
* meistrite profiile;
* teenuseid;
* arvustusi.

Room Database töötab SQLite andmebaasi peal ning võimaldab kasutada entity klasse ja DAO liideseid.

Andmekihis kasutatakse:

* Entity klasse;
* DAO liideseid;
* `AppDatabase` klassi;
* Repository kihti.

Andmed salvestatakse seadme lokaalsesse andmebaasi ning rakendus töötab ilma internetiühenduseta. Andmed laaditakse andmebaasist rakenduse kasutamisel DAO ja Repository kaudu.

## Rakenduse arhitektuur

Android rakendus on jaotatud mitmeks kihiks:

```text
UI (Jetpack Compose)
        ↓
ViewModel
        ↓
Repository
        ↓
DAO
        ↓
Room Database
        ↓
SQLite
```

### UI kiht

Jetpack Compose ekraanid:

```text
app/src/main/java/com/example/handyhub/ui/screens/
  AddReviewScreen.kt
  BecomeMasterScreen.kt
  EditProfileScreen.kt
  HomeScreen.kt
  LoginScreen.kt
  MasterDetailScreen.kt
  MyServiceScreen.kt
  ProfileScreen.kt
  RegisterScreen.kt
  ServiceFormScreen.kt
```

Taaskasutatavad komponendid:

```text
app/src/main/java/com/example/handyhub/ui/components/
  AppButton.kt
  AppExpandableCategories.kt
  AppHeader.kt
  AppSearchBar.kt
  AppTextField.kt
  CategoryDropdown.kt
  ConfirmDialog.kt
  MasterCard.kt
  MasterInfoCard.kt
  MasterProfileCard.kt
  MasterReviewSection.kt
  ProfileInfoCard.kt
  RatingBar.kt
  RatingInput.kt
  ReviewAccordeonCard.kt
  ServiceManageCard.kt
```

UI kiht vastutab ekraanide, vormide, nuppude, kaartide ja navigeerimise kuvamise eest.

### ViewModel kiht

ViewModel kiht hoiab ekraanide olekut ja vahendab andmeid UI ning Repository vahel.

```text
app/src/main/java/com/example/handyhub/viewmodel/
  AuthViewModel.kt
  HomeViewModel.kt
  MasterDetailViewModel.kt
  MasterViewModel.kt
```

ViewModel kasutab Repository meetodeid andmete laadimiseks, lisamiseks ja uuendamiseks.

### Models

Domeenimudelid ja Room entity-klassid:

```text
app/src/main/java/com/example/handyhub/model/
  User.kt
  Role.kt
  Category.kt
  MasterProfile.kt
  Service.kt
  Review.kt
```

Need klassid kirjeldavad rakenduse põhiandmeid ja Room Database tabeleid.

### Database kiht

Room Database seadistus:

```text
app/src/main/java/com/example/handyhub/data/local/
  AppDatabase.kt
```

`AppDatabase.kt` määrab andmebaasi entity-klassid ja DAO liidesed.

Rakenduse andmebaasis kasutatakse järgmisi entity-klasse:

* `User`;
* `Role`;
* `Category`;
* `MasterProfile`;
* `Service`;
* `Review`.

### DAO kiht

DAO-failid sisaldavad andmebaasipäringuid.

```text
app/src/main/java/com/example/handyhub/data/local/
  UserDao.kt
  RoleDao.kt
  CategoryDao.kt
  MasterProfileDao.kt
  ServiceDao.kt
  ReviewDao.kt
```

DAO kiht vastutab andmete lugemise, lisamise, muutmise ja kustutamise eest Room Database kaudu.

### Repository kiht

Repository koondab DAO päringud ühte kohta ja annab ViewModelile mugavad meetodid andmetega töötamiseks.

```text
app/src/main/java/com/example/handyhub/data/repository/
  HandyHubRepository.kt
```

Repository kaudu toimub näiteks kasutajate, kategooriate, meistrite, teenuste ja arvustuste andmete laadimine ning salvestamine.

### Navigation kiht

Rakenduse navigeerimine on realiseeritud Navigation Compose abil.

```text
app/src/main/java/com/example/handyhub/navigation/
  AppNavigation.kt
  Routes.kt
```

Navigation kiht määrab, kuidas kasutaja liigub sisselogimise, registreerimise, avalehe, profiili, meistri detailvaate, arvustuse lisamise ja teenuste haldamise ekraanide vahel.

## Andmemudel / ERD

Android versioon kasutab sama relatsioonilist andmemudelit nagu kogu HandyHub projekt.

Peamised tabelid:

* Users;
* Roles;
* Categories;
* MasterProfile;
* Services;
* Reviews.

ERD diagramm asub projekti üldises dokumentatsioonis:

```text
assets/img/HandyHubApp.png
```

Peamised seosed:

* kasutaja kuulub ühte rolli;
* kasutaja võib omada meistri profiili;
* meistri profiil võib sisaldada mitut teenust;
* teenus kuulub kategooriasse;
* kasutajad saavad jätta hinnanguid ja arvustusi.

## Rakenduse käivitamine

### Nõuded

Enne käivitamist peavad olema paigaldatud:

* Android Studio;
* Android SDK;
* Android Emulator või Android-seade;
* JDK 17 või Android Studio poolt pakutav JDK.

### Projekti avamine

Klooni repositoorium:

```bash
git clone https://github.com/JekaterinaShashkina/HandyHub.git
```

Ava Android Studio.

Vali **Open Project**.

Ava Android / Kotlin projekti kaust.

### Sõltuvuste laadimine

Android Studio laadib Gradle sõltuvused automaatselt.

Vajadusel käivita:

```bash
./gradlew build
```

Windowsis:

```bash
gradlew.bat build
```

### Rakenduse käivitamine

1. Käivita Android Emulator või ühenda Android telefon USB kaudu.
2. Luba telefonis USB Debugging, kui kasutad füüsilist seadet.
3. Vajuta Android Studios nuppu **Run**.
4. Vali sihtseade.
5. Oota projekti kompileerimist ja rakenduse käivitumist.

### Andmebaas

Rakendus kasutab lokaalset SQLite andmebaasi Room Database kaudu.

Andmebaas luuakse automaatselt rakenduse esmakordsel käivitamisel ning eraldi seadistamist ei vaja.

## Ekraanipildid

Ekraanipildid asuvad kaustas:

```text
assets/img/screens_kotlin/
```

### Avaleht

<p>
  <img src="../assets/img/screens_kotlin/Screenshot_1.png" width="250">
  <img src="../assets/img/screens_kotlin/Screenshot_11.png" width="250">
</p>

### Kasutajaprofiil ja andmete muutmine

<p>
  <img src="../assets/img/screens_kotlin/Screenshot_4.png" width="250">
  <img src="../assets/img/screens_kotlin/Screenshot_7.png" width="250">
</p>

### Meistri detailivaade ja teenuste ekraan

<p>
  <img src="../assets/img/screens_kotlin/Screenshot_2.png" width="250">
  <img src="../assets/img/screens_kotlin/Screenshot_6.png" width="250">
</p>

### Kasutaja login ja arvustuse lisamine

<p>
  <img src="../assets/img/screens_kotlin/Screenshot_5.png" width="250">
  <img src="../assets/img/screens_kotlin/Screenshot_3.png" width="250">
</p>

## Video demonstratsioon

Android / Kotlin versiooni video demonstratsioon:

https://youtu.be/tPYvXmmgI2k

Videos näidatakse:

* rakenduse põhifunktsionaalsust;
* kasutajaliidest ja navigeerimist;
* registreerimist ja sisselogimist;
* profiili muutmist;
* meistrite ja teenuste vaatamist;
* arvustustega töötamist;
* meistri teenuste haldamist.

## AI kasutamine

Android / Kotlin versiooni arendamisel kasutati järgmisi AI tööriistu:

* ChatGPT;
* Google Gemini;
* Codex.

AI-d kasutati:

* Kotlin ja Jetpack Compose koodi kirjutamise abistamiseks;
* Room Database ja SQLite kasutamise selgitamiseks;
* DAO ja Repository arhitektuuri analüüsimiseks;
* vigade leidmiseks ja parandamiseks;
* kasutajaliidese komponentide täiustamiseks;
* dokumentatsiooni koostamiseks.

Iseseisvalt tehti:

* projekti idee väljatöötamine;
* ühise idee kooskõlastamine React Native versiooniga;
* Android versiooni arhitektuuri lõplikud otsused;
* Room Database struktuuri koostamine;
* kasutajaliidese ülesehitus;
* rakenduse testimine Android seadmes;
* video demonstratsiooni salvestamine;
* GitHubi, branch'ide ja pull request'idega töötamine;
* kasutajastsenaariumide testimine.

## GitHubi kasutamine

Arenduse käigus kasutati:

* branch'e;
* pull request'e;
* merge'i `main` harusse;
* sisukaid commit message'eid;
* regulaarset `git status` kontrolli;
* meeskonnatööd ühes GitHubi repositooriumis.

## Märkused

* Android / Kotlin ja React Native versioonid on sama rakenduse kaks eraldi realisatsiooni.
* Mõlemal versioonil on oma lokaalne SQLite andmebaas.
* Ühist runtime'i või ühist andmebaasi rakenduste vahel ei kasutata.
* Android versioon töötab native Android rakendusena.
* Room Database põhineb SQLite andmebaasil.
