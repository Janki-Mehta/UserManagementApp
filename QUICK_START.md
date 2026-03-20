# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js >= 22.11.0
- npm or yarn
- Xcode (iOS) or Android Studio (Android)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Install iOS pods (Mac only)
cd ios && pod install && cd ..

# 3. Start the app
npm start
```

In another terminal:

```bash
# Run on iOS (Mac)
npm run ios

# OR Run on Android
npm run android
```

## 📋 How to Use the App

### Sign In
1. Start the app
2. You'll see the Sign In screen
3. Enter any email and password
4. Example: `test@example.com` / `password123`
5. Tap "Sign In"

### View Users
1. After login, you'll see the User List
2. Scroll down to see more users (pagination loads automatically)
3. Tap any user to see their details

### User Details
1. Tap a user from the list
2. See full details: name, email, phone, avatar
3. Tap "Edit User" to modify information

### Add/Edit Users
1. From User List, tap "Add User"
2. Fill in the form with required fields
3. Tap "Add User" to save
4. New user appears at top of list

### Logout
1. From User List, tap "Logout"
2. You'll return to Sign In screen

## 📁 Project Structure

```
src/
├── components/          ← UI only (presentational)
├── containers/          ← Logic and state (smart)
├── navigation/          ← Screen routing
├── store/               ← Global state (Zustand)
├── services/            ← API calls (Axios)
├── constants/           ← Colors, sizes, etc
├── global/              ← Reusable components
└── utils/               ← Helper functions
```

## 🔧 Key Technologies

- **React Native**: iOS/Android framework
- **TypeScript**: Static typing for safety
- **React Navigation**: Screen routing
- **Zustand**: State management
- **Axios**: API calls
- **DummyJSON**: Test API

## 📚 Documentation

- **PROJECT_GUIDE.md**: Full architecture and features
- **DEVELOPER_GUIDE.md**: Code examples and patterns
- **SETUP_TROUBLESHOOTING.md**: Common issues and fixes
- **IMPLEMENTATION_SUMMARY.md**: What was built
- **ARCHITECTURE_DIAGRAMS.md**: Visual representations
- **VERIFICATION_CHECKLIST.md**: Testing checklist

## 💡 Common Tasks

### Add a New Screen

1. Create component: `src/components/feature/screen/index.tsx`
2. Create container: `src/containers/feature/screen/index.tsx`
3. Add to navigation: `src/navigation/index.tsx`
4. Add screen name: `src/constants/screenNames.ts`

### Update the API

Edit `src/services/apiService.ts`:
```typescript
async newMethod() {
  try {
    const response = await this.axiosInstance.get('/endpoint');
    return response.data;
  } catch (error) {
    throw this.handleError(error);
  }
}
```

### Update State

Use the store:
```typescript
const { users, addUser } = useUsersStore();
addUser(newUser);
```

### Add Validation

Update `src/utils/validation.ts`:
```typescript
export const validateNewField = (value: string): boolean => {
  // Validation logic
};
```

## 🎨 Customize Colors

Edit `src/constants/colors.ts`:
```typescript
export const Colors = {
  primary: '#007AFF',      // Main color
  error: '#FF3B30',        // Error color
  background: '#FFFFFF',   // Background
  // ... more colors
};
```

## 📱 Run on Devices

### iOS Real Device
```bash
npm run ios -- --device "iPhone Name"
```

### Android Real Device
```bash
# Connect phone via USB
adb devices
npm run android
```

## 🐛 Debug Issues

```bash
# Clear all caches
npm start -- --reset-cache

# Clean rebuild iOS
cd ios && rm -rf Pods && pod install && cd ..

# Clean rebuild Android
cd android && ./gradlew clean && cd ..
```

## 📊 App Features

✅ **Authentication**
- Email/password Sign In
- Form validation
- Mock login system

✅ **User List**
- Display from API
- Infinite scroll pagination
- User avatars
- 10 items per page

✅ **User Details**
- Full information view
- Edit functionality
- Direct editing

✅ **Add/Edit Users**
- Form validation
- Add new users
- Edit existing users
- Update list in real-time

✅ **State Management**
- Global auth state
- User list pagination
- Loading indicators
- Error handling

✅ **Navigation**
- Type-safe routing
- Smooth transitions
- Conditional screens
- Back navigation

## 🎯 Next Steps

1. **Review the code**: Open `src/` to understand structure
2. **Read DEVELOPER_GUIDE.md**: Learn code patterns
3. **Extend features**: Add new functionality
4. **Connect real API**: Replace mock data
5. **Add tests**: Write unit/integration tests
6. **Optimize**: Profile and improve performance
7. **Deploy**: Build for App Store/Google Play

## ❓ FAQ

**Q: How do I log in?**
A: Use any email and password (e.g., test@example.com / password)

**Q: Where's the user data from?**
A: From https://dummyjson.com/users API

**Q: Can I edit users?**
A: Yes, tap a user → Edit User → Modify → Save

**Q: How do I add users?**
A: From User List → Add User → Fill form → Save

**Q: How do I log out?**
A: From User List → Logout button

**Q: Where's the API implemented?**
A: In `src/services/apiService.ts`

**Q: Where's the state management?**
A: In `src/store/` with Zustand

**Q: How do I add validation?**
A: Update `src/utils/validation.ts`

**Q: Can I change colors?**
A: Yes, edit `src/constants/colors.ts`

## 📞 Support

Check these files for help:
1. SETUP_TROUBLESHOOTING.md - For errors
2. DEVELOPER_GUIDE.md - For coding patterns
3. PROJECT_GUIDE.md - For architecture
4. VERIFICATION_CHECKLIST.md - For testing

## 🎉 You're Ready!

```
npm install        ← Install deps
cd ios && pod install && cd .. ← iOS setup
npm start          ← Start server
npm run ios/android ← Run app
```

Happy coding! 🚀
