# User Management App

A React Native User Management application built with TypeScript, Zustand, and React Navigation.

## Project Architecture

This project follows the **MVVM (Model-View-ViewModel)** pattern with clear separation between UI components and business logic.

```
src/
├── components/          # Pure UI components (presentational)
│   ├── authentication/
│   │   └── signIn/
│   │       └── index.tsx
│   └── users/
│       ├── userList/
│       ├── userDetail/
│       └── addEditUser/
├── containers/          # Smart components (logic & state management)
│   ├── authentication/
│   │   └── signIn/
│   │       └── index.tsx
│   └── users/
│       ├── userList/
│       ├── userDetail/
│       └── addEditUser/
├── navigation/          # React Navigation setup
├── store/               # Zustand state management
│   ├── authenticationStore.ts
│   └── usersStore.ts
├── services/            # API calls & external services
│   └── apiService.ts
├── constants/           # App constants, colors, screen names
├── global/              # Reusable UI components (TextInput, Button)
└── utils/               # Utility functions (validation, helpers)
```

## Features

### Authentication
- **Sign In Screen**: Email and password validation
- Mock authentication (no backend required)
- Form validation with error messages

### User Management
- **User List Screen**:
  - Fetches users from public API (https://dummyjson.com/users)
  - Displays users with avatars, names, and emails
  - Pagination with infinite scroll
  - Loads 10 users per page
  - Activity indicator while loading

- **User Detail Screen**:
  - Shows full user details (name, email, phone, avatar)
  - Edit and Delete options

- **Add/Edit User Screen**:
  - Form validation
  - Add new users
  - Edit existing users
  - Auto-updates user list

### State Management
- **Zustand Store** for:
  - Authentication state
  - User list management
  - Pagination state
  - Loading states

## Installation

```bash
# Install dependencies
npm install
# or
yarn install

# For iOS (after installing dependencies)
cd ios && pod install && cd ..

# Run on iOS
npm run ios
# or
react-native run-ios

# Run on Android
npm run android
# or
react-native run-android

# Start Metro bundler
npm start
```

## Dependencies

### Core
- **React Native**: 0.84.1
- **React**: 19.2.3
- **TypeScript**: 5.8.3

### Navigation
- **@react-navigation/native**: 6.1.17
- **@react-navigation/native-stack**: 7.14.5
- **react-native-screens**: 4.24.0
- **react-native-gesture-handler**: 2.30.0
- **react-native-safe-area-context**: 5.7.0

### State Management & API
- **Zustand**: 5.0.11
- **Axios**: 1.13.6

### UI
- **react-native-flash-message**: 0.4.2

## Usage

### Running the App

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Run on iOS**:
   ```bash
   npm run ios
   ```

3. **Run on Android**:
   ```bash
   npm run android
   ```

### File Structure Explanation

#### Components (UI Only)
Components are purely presentational. They receive data via props and call callback functions without handling any logic.

**Example**: `src/components/users/userList/index.tsx`
- Receives `users`, `loading`, pagination callbacks
- Renders FlatList
- Calls `onUserPress`, `onEndReached` callbacks

#### Containers (Logic)
Containers handle all business logic, API calls, and state management. They pass processed data to components.

**Example**: `src/containers/users/userList/index.tsx`
- Manages API calls
- Handles pagination logic
- Updates Zustand store
- Calls component with processed data

#### Stores (Zustand)
Global state management using Zustand for:
- Authentication
- User list
- Pagination
- Loading states

#### Navigation
React Navigation setup with native stack navigator for handling screen transitions.

## API Integration

### Users API
- **Endpoint**: `https://dummyjson.com/users`
- **Query Parameters**:
  - `limit`: Items per page (default: 10)
  - `skip`: Offset for pagination

**Example**:
```
https://dummyjson.com/users?limit=10&skip=0  // Page 1
https://dummyjson.com/users?limit=10&skip=10 // Page 2
```

## Validation

### Authentication
- Email is required and must be valid format
- Password is required

### User Form
- First Name is required
- Last Name is required
- Email is required and must be valid format
- Phone is required

## Navigation Flow

```
SignIn → UserList → UserDetail → AddEditUser
    ↓                    ↓
  Logout             Edit User
    ↓                    ↓
  SignIn           UserList
```

## Component Guidelines

### Component Props
```typescript
interface ComponentProps {
  // Data
  items: Item[];
  isLoading: boolean;
  
  // Callbacks
  onItemPress: (item: Item) => void;
  onLoadMore: () => void;
}
```

### Container Pattern
```typescript
const Container: React.FC<ContainerProps> = ({ navigation, route }) => {
  // Business logic here
  return <Component {...props} />;
};
```

## Best Practices

1. **Separation of Concerns**: Components handle UI, containers handle logic
2. **Type Safety**: Full TypeScript coverage
3. **Error Handling**: Proper error messages in forms
4. **Performance**: FlatList optimization, memoization where needed
5. **Code Organization**: Logical folder structure for easy maintenance
6. **Reusable Components**: Custom TextInput and Button in global folder

## Testing

Run tests with:
```bash
npm test
```

## Debugging

### Metro Bundler Issues
If you encounter issues with the Metro bundler:
```bash
npm start -- --reset-cache
```

### Pod Issues (iOS)
```bash
cd ios && pod install && cd ..
```

### Clean Build
```bash
# iOS
cd ios && rm -rf Pods && rm Podfile.lock && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..
```

## Future Enhancements

- Add real backend authentication
- Implement user delete functionality
- Add search/filter functionality
- Add offline support with local storage
- Add unit and integration tests
- Add error boundary for better error handling
- Add dark mode support
- Add animations and transitions

## License

This project is open source and available under the MIT License.
