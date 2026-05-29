# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


Only authenticated users with role client can leave reviews.
Masters cannot review other masters.
Anonymous users cannot leave reviews.

Build React Native home and master detail screens

- Added React Native sample data based on the HandyHub domain model
- Built the home screen with header, search, expandable categories, master cards and footer
- Added category icons and HandyHub logo assets
- Added master detail screen with profile info, contacts, reviews and review form layout
- Added navigation from master cards to the detail screen
- Added role-based review form visibility for authenticated client users
- Unified app icons using @expo/vector-icons
- Downgraded Expo setup to SDK 54 for Expo Go compatibility
- Removed Expo starter tabs and template UI

Add local review submission flow

- Added local review creation and update with useState
- Added one-review-per-client logic
- Added review form validation
- Updated displayed rating and reviews count after publishing
- Added keyboard avoiding behavior for the review form
- Added role-based review restrictions for clients/masters

Refactor master details review flow

- Added local review submission with useState
- Added review validation for empty comment, missing rating, name and phone
- Added one-review-per-client logic with update mode
- Updated displayed rating average and reviews count after review changes
- Added keyboard avoiding behavior for the review form
- Extracted master detail review UI into reusable components
- Added ReviewCard, ReviewNotice, InteractiveRating and ReviewForm components
- Cleaned up the master details screen structure

Add shared HandyHub state

- Added HandyHub context provider for shared app state
- Moved master cards and master details data to shared state
- Added shared review upsert logic
- Updated home and details screens to reflect review changes immediately
- Added shared add master flow so new specialists appear on home
- Connected Add Master screen and header action to shared state



Что должно быть общим:

одинаковая структура базы
одинаковые таблицы
одинаковые связи
одинаковые seed/sample данные
одинаковая бизнес-логика
То есть вы с Катей делаете две реализации одного приложения, а не один общий runtime.

Для отчёта это можно формулировать так:

Both applications use the same domain model and SQLite schema, but each platform stores data locally in its own SQLite database.

git commit -m "Add SQLite persistence and login flow"

- Added expo-sqlite database layer with HandyHub schema and seed data
- Connected shared HandyHub state to SQLite persistence
- Persisted reviews and added masters across app restarts
- Added login flow with role-based current user state
- Added logout action and conditional header icons
- Hid profile icon for guest users
- Hid add-master action for masters that already have a profile
- Added Back buttons to login and add-master screens
- Added expandable review text for long comments


git commit -m "Add user registration and avatars"

- Added client registration screen
- Added duplicate email and phone validation
- Added avatar selection for client and master registration
- Persisted avatar URLs in SQLite through user records
- Displayed logged-in user avatar in the header
- Fixed master registration role assignment
- Improved role-based header actions

Add profile screen and profile editing

Added Profile screen for logged-in users.
Added profile navigation from the header avatar/user icon.
Added logout from profile.
Added Become a master flow for client users.
Fixed master registration flow so existing users are not duplicated.
Added client profile editing screen.
Added profile update persistence in SQLite.
Added avatar update for profile editing.
Added duplicate email and phone validation when editing profile.
Replaced text Back buttons with arrow icons on login, registration, and master details screens.

git add react-native-app
git commit -m "Add user reviews to profile"
Что вошло в коммит:

Added user review list to Profile.
Added getReviewsByUserId helper.
Added review cards with master name, category, rating, and comment.
Added expand/collapse for long review comments.
Split Profile screen into smaller profile components.

git commit -m "Add master service management"

управление услугами мастера: add/edit/hide/restore;
отображение услуг на странице мастера;
показ 3 последних отзывов с раскрытием всех;
All categories на главной;
рефактор add-master и edit-master-profile;
более строгая проверка email.