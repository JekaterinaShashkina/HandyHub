# HandyHub React Native App

HandyHub is a cross-platform React Native application built with Expo. 
The app is a mobile service marketplace where clients can find specialists, view master profiles, register accounts, 
leave reviews, and where masters can manage their services.

This repository contains the React Native implementation of the project. 
The Android/Kotlin version is implemented separately, but both apps follow the same HandyHub domain idea and a similar data structure.

## Main Features

- Home screen with search, category filter, master cards, app header and footer.
- Master detail screen with contact information, description, services and reviews.
- Client registration and login.
- Profile screen for authenticated users.
- Profile editing with avatar update.
- Role-based behavior for clients and masters.
- Become a master flow for existing client users.
- Master registration with first service creation.
- Master service management: add, edit, hide and restore services.
- Review system with rating stars.
- One review per client per master. A client can update their own review.
- User profile shows reviews written by the current user.
- Local SQLite persistence through `expo-sqlite`.

## User Roles

The app uses three roles:

- `client`
- `master`

Current role logic:

- Anonymous users can browse masters but cannot leave reviews.
- Only authenticated clients can leave reviews.
- Masters cannot review other masters.
- A logged-in client can become a master.
- A master can manage their own services.

## Validation

The React Native app includes validation for user input and service forms.

User and profile validation:

- Required name, surname, email, phone and password fields.
- Email format validation.
- Phone length validation.
- Duplicate email validation.
- Duplicate phone validation.
- Profile editing ignores the current user's own email and phone when checking duplicates.

Review validation:

- User must be logged in.
- User must have the client role.
- Comment cannot be empty.
- Rating must be selected.
- One client can leave only one review per master. Submitting again updates the existing review.

Master and service validation:

- Required service title.
- Required category.
- Required service description.
- Price must be greater than zero.
- Duration must be greater than zero.
- A master cannot hide their last active service.

Validation files are placed in:

```text
src/domain/validation/
  serviceValidation.ts
  userValidation.ts
```

## Data Persistence

The app uses local SQLite storage through `expo-sqlite`.

The database stores:

- roles
- users
- categories
- master profiles
- services
- reviews

The app starts with clean user data for demonstration. Only reference data is seeded:

- roles
- categories

Users, masters, services and reviews are created through the app flow.

## Architecture

The React Native app is organized into layers inspired by the Kotlin project structure.

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

### App Routes

Expo Router screens are stored in:

```text
src/app/
```

Important screens:

```text
src/app/index.tsx
src/app/login.tsx
src/app/register.tsx
src/app/profile.tsx
src/app/edit-profile.tsx
src/app/add-master.tsx
src/app/edit-master-profile.tsx
src/app/master/[id].tsx
```

### Components

Reusable UI components are stored in:

```text
src/components/
```

Main component groups:

```text
components/common/
components/home/
components/master/
components/profile/
components/register/
components/login/
components/add-master/
components/master-profile/
```

Shared UI components include:

- `BackButton`
- `PrimaryButton`
- `FormTextInput`
- `PasswordField`
- `FormMessage`
- `ScreenHeader`
- `RatingStars`

### Models

Domain models are stored as separate files:

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

These models represent the main HandyHub data entities.

### UI Models and Mappers

UI-specific models are stored in:

```text
src/ui/models/
```

Examples:

- `MasterCardUiModel`
- `MasterDetailsUiModel`
- `UserReviewUiModel`

Mapping from domain data to UI models is handled in:

```text
src/ui/mappers/masterMappers.ts
```

### Database Layer

SQLite setup is stored in:

```text
src/database/
  database.ts
  mappers.ts
  provider.ts
  schema.ts
```

Responsibilities:

- `provider.ts` opens the SQLite database.
- `schema.ts` contains SQL table creation and migrations.
- `mappers.ts` maps database rows to TypeScript models.
- `database.ts` initializes the database and seeds reference data.

### DAO Layer

DAO files are stored in:

```text
src/data/local/
  categoryDao.ts
  masterProfileDao.ts
  reviewDao.ts
  roleDao.ts
  serviceDao.ts
  userDao.ts
```

DAO files contain SQL queries such as select, insert and update.

### Repository Layer

Repository methods are stored in:

```text
src/data/repository/repository.ts
```

The repository coordinates DAO calls and gives the state layer a cleaner API for loading and saving data.

### Domain Use Cases

Business logic is stored in:

```text
src/domain/usecases/
  masterUseCases.ts
  reviewUseCases.ts
  serviceUseCases.ts
  userUseCases.ts
```

Examples of use case logic:

- create a master profile with the first service
- update or insert a user in a list
- find a user during login
- add, edit, hide or restore services
- recalculate master `priceFrom`
- prevent hiding the last active service
- create or update a review

### State Layer

Global app state is stored in:

```text
src/state/
  AppContext.tsx
  types.ts
```

`AppContext` coordinates:

- current user state
- loaded categories, users, masters, services and reviews
- calls to repository methods
- calls to domain use cases
- data passed to screens and components

## Running the App

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npx.cmd expo start --go --clear
```

For LAN mode:

```bash
npx.cmd expo start --go --lan --clear
```

NB! Web mode is not used in this project because the app uses expo-sqlite for native local persistence. The app should be tested in Expo Go on iOS or Android.


## Notes

- The React Native app stores data locally in its own SQLite database.
- The Kotlin app has its own local database implementation.
- Both apps represent the same HandyHub domain, but they do not share one runtime database.
