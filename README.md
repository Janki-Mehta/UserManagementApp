# UserManagementApp

A fully-featured **User Management** mobile application built with React Native, TypeScript, Zustand, and React Navigation.

## ✨ Features

| Feature | Status |
|---|---|
| Login screen with email + password validation | ✅ |
| User list from public API (`dummyjson.com`) with pagination | ✅ |
| User detail screen | ✅ |
| Add / Edit user form with image upload | ✅ |
| State management (Zustand) | ✅ |
| React Navigation (stack, auth-gated) | ✅ |
| Error handling & loading indicators | ✅ |
| Flash message notifications | ✅ |
| Offline caching (MMKV) | ✅ |
| Unit tests (stores, utils, components) | ✅ |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 22.11.0
- React Native CLI environment set up ([Guide](https://reactnative.dev/docs/environment-setup))
- Xcode (iOS) or Android Studio (Android)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd UserManagementApp

# 2. Install JS dependencies
npm install

# 3. iOS – install CocoaPods
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro
npm start -- --reset-cache

# iOS (in a separate terminal)
npm run ios

# Android (in a separate terminal)
npm run android
```

---

## 🔑 Demo Credentials

```
Email:    demo@example.com
Password: demo123
```

> Any non-empty password works — authentication is mocked locally.

---

## 📁 Project Structure

```
src/
├── components/        # Pure UI components (presentation)
│   ├── authentication/signIn/
│   └── users/{userList, userDetail, addEditUser}/
├── containers/        # Business-logic containers
│   ├── authentication/signIn/
│   └── users/{userList, userDetail, addEditUser}/
├── store/             # Zustand stores
│   ├── authenticationStore.tsx
│   └── usersStore.tsx
├── services/
│   ├── apiService.ts       # Axios – dummyjson.com
│   └── cacheService.ts     # MMKV offline cache
├── constants/
│   ├── colors.tsx          # Design-system colors
│   ├── theme.tsx           # Spacing, typography, shadows
│   └── utils/validation.tsx
├── global/
│   ├── customButton/
│   ├── customTextInput/
│   └── customHeader/
└── routers/
    └── mainNavigation.tsx  # Auth-gated React Navigation
```

---

## 🧪 Running Tests

```bash
npm test
```

Tests are located in `__tests__/`:

| File | What it tests |
|---|---|
| `stores/authenticationStore.test.ts` | Login / logout state |
| `stores/usersStore.test.ts` | CRUD operations on user list |
| `utils/validation.test.ts` | Email, name, phone validators |
| `components/UserListComponent.test.tsx` | Rendering, empty/error states, interactions |

---

## 🌐 API

Uses the free [DummyJSON](https://dummyjson.com) public API.

```
GET https://dummyjson.com/users?limit=10&skip=0
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `zustand` | State management |
| `@react-navigation/native-stack` | Navigation |
| `axios` | HTTP requests |
| `react-native-mmkv` | Offline cache |
| `react-native-image-picker` | Avatar image upload |
| `react-native-flash-message` | Toast notifications |
| `react-native-gesture-handler` | Gesture support |

---

## 🏗️ Building

### Android APK

```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### iOS Archive

Use Xcode → Product → Archive, or `react-native run-ios --configuration Release`.
