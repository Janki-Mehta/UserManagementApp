# Setup & Troubleshooting Guide

## Initial Setup Checklist

### Prerequisites
- [x] Node.js >= 22.11.0
- [x] npm or yarn package manager
- [x] Xcode (for iOS) with iOS 12+ support
- [x] Android Studio (for Android) or Android SDK

### Installation Steps

1. **Install Node Modules**
   ```bash
   npm install
   ```
   Expected: All dependencies installed successfully

2. **Install iOS Pods** (Mac only)
   ```bash
   cd ios && pod install && cd ..
   ```
   Expected: "Pod installation complete!" message

3. **Verify Installation**
   ```bash
   npm start -- --reset-cache
   ```
   Expected: Metro bundler starts without errors

4. **Test on iOS** (Mac only)
   ```bash
   npm run ios
   ```
   Expected: App launches in simulator

5. **Test on Android**
   ```bash
   npm run android
   ```
   Expected: App launches in emulator/device

## Running the App

### Option 1: Using npm scripts

**iOS**:
```bash
npm run ios
```

**Android**:
```bash
npm run android
```

**Start Metro Bundler** (if not auto-started):
```bash
npm start
```

### Option 2: Manual with React Native CLI

**iOS**:
```bash
react-native run-ios --simulator="iPhone 16"
```

**Android**:
```bash
react-native run-android
```

### Option 3: Xcode/Android Studio

**iOS**:
1. Open `ios/UserManagementApp.xcworkspace` (NOT .xcodeproj)
2. Select device/simulator
3. Press ▶ Play button

**Android**:
1. Open project in Android Studio
2. Select device/emulator
3. Run app (Shift + F10)

## Troubleshooting

### Metro Bundler Issues

**Problem**: "Metro bundler failed to start"
```bash
# Solution:
npm start -- --reset-cache
```

**Problem**: "Cannot find module error"
```bash
# Solution:
npm install
```

**Problem**: "Port 8081 already in use"
```bash
# Solution 1: Kill process on port 8081
lsof -i :8081
kill -9 <PID>

# Solution 2: Use different port
npm start -- --port 8082
```

### iOS Specific Issues

**Problem**: "Pods error / Pod dependencies not resolved"
```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

**Problem**: "Build failed / Unknown compiler"
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..
npm run ios
```

**Problem**: "iPhone Simulator won't start"
```bash
# Kill simulator
killall "Simulator"
# Or restart Xcode
# Or delete derived data:
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

**Problem**: "Swift compilation failed"
```bash
# Ensure Xcode is fully updated
xcode-select --install
npm run ios -- --clean
```

### Android Specific Issues

**Problem**: "Android build failed"
```bash
cd android
./gradlew clean
./gradlew build
cd ..
npm run android
```

**Problem**: "Android emulator won't start"
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd <emulator_name> &

# Then run app
npm run android
```

**Problem**: "Gradle sync failed"
1. In Android Studio: File → Invalidate Caches
2. Restart Android Studio
3. Try building again

**Problem**: "adb not found"
```bash
# Verify Android SDK is installed
export ANDROID_HOME=$HOME/Library/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### TypeScript Issues

**Problem**: "Type errors after changes"
```bash
# TypeScript cache issue
npm start -- --reset-cache
```

**Problem**: "Cannot find type definitions"
```bash
# Reinstall types
npm install --save-dev @types/react @types/react-native
```

### Navigation Issues

**Problem**: "Screen not rendering after navigation"
```typescript
// Check route params match type definition
navigation.navigate(ScreenNames.Screen, { expectedParam: value });
```

**Problem**: "Cannot read property 'navigate'"
```typescript
// Ensure component is wrapped with NavigationContainer
// Check navigation prop is passed correctly
```

### API & Network Issues

**Problem**: "API calls failing / 'Network Error'"
```bash
# Check internet connection
ping dummyjson.com

# Verify API endpoint is accessible
curl https://dummyjson.com/users?limit=10&skip=0
```

**Problem**: "CORS error in development"
- React Native doesn't have CORS restrictions
- Check API endpoint is correct
- Verify network connectivity

**Problem**: "Timeout errors"
```typescript
// Increase timeout in apiService.ts
this.axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // Increased from 10000
});
```

### State Management Issues

**Problem**: "State not updating after action"
```typescript
// Wrong: Mutating state
users.push(newUser);

// Correct: Creating new array
setUsers([...users, newUser]);
```

**Problem**: "Component not re-rendering after store update"
```typescript
// Check selector is correct
const users = useUsersStore(state => state.users);

// Verify action is called
console.log('Before:', useUsersStore.getState());
updateUser(user);
console.log('After:', useUsersStore.getState());
```

### Form Validation Issues

**Problem**: "Form validation not working"
```typescript
// Verify validation function returns boolean
console.log(validateEmail(email)); // Should be true/false

// Check error message is set correctly
console.log(getEmailErrorMessage(email));
```

## Performance Optimization

### Optimize FlatList

```typescript
<FlatList
  data={users}
  renderItem={renderUserItem}
  keyExtractor={(item) => item.id.toString()}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  removeClippedSubviews={true}
/>
```

### Optimize Components

```typescript
const MemoizedComponent = React.memo(YourComponent);
```

### Optimize Selectors

```typescript
const users = useUsersStore(state => state.users);
// Better for large states
const [users, updateUser] = useUsersStore(
  state => [state.users, state.updateUser],
  shallow // Use shallow equality check
);
```

## Debugging Tools

### React DevTools
```bash
# Install globally
npm install -g react-devtools

# Run in separate terminal
react-devtools
```

### Console Logging

```typescript
// Check store state
console.log('Store:', useAuthenticationStore.getState());

// Check navigation state
console.log('Navigation:', navigation.getState());

// Check component props
console.log('Props:', props);
```

### Network Monitoring

**iOS**: Use Xcode Debugger
**Android**: Use Android Studio Debugger or chrome://inspect

## Clean Build

If everything seems broken, perform a clean build:

```bash
# Clean all
npm install
rm -rf node_modules/ package-lock.json
npm install

# iOS
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
npm run ios -- --clean

# Android
cd android && ./gradlew clean && cd ..
npm run android
```

## Reinstall Everything

Nuclear option (start fresh):

```bash
# Remove all build artifacts
rm -rf node_modules/
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf android/app/build/
rm -rf ios/Pods/
rm -rf ios/Podfile.lock
rm -rf package-lock.json
rm -rf yarn.lock

# Reinstall
npm install
cd ios && pod install && cd ..

# Run
npm start -- --reset-cache
npm run ios
```

## Verify Everything Works

After setup, verify by:

1. ✅ App starts without errors
2. ✅ Can navigate between screens
3. ✅ Sign In form validates input
4. ✅ Can see users list loaded from API
5. ✅ Can scroll to load more users
6. ✅ Can tap user to see details
7. ✅ Can go back from detail screen
8. ✅ Can add new user
9. ✅ Can edit existing user
10. ✅ Logout returns to sign in

## Getting Help

1. **Check logs**: `npm start` shows Metro output
2. **Check TypeScript**: Look for type errors in IDE
3. **Device logs**: 
   - iOS: `xcrun simctl spawn booted log stream --predicate 'process == "UserManagementApp"'`
   - Android: `adb logcat`
4. **React Native docs**: https://reactnative.dev
5. **Navigation docs**: https://reactnavigation.org
6. **Zustand docs**: https://github.com/pmndrs/zustand

## Performance Baseline

Expected performance:
- **App startup**: < 3 seconds
- **User list load**: < 1 second
- **Navigation**: Smooth, no lag
- **Scrolling**: 60 FPS (no jank)
- **API calls**: < 2 seconds

If slower, check:
- Network connectivity
- Device resources (RAM, CPU)
- Large bundle size
- Unoptimized components

---

For additional help, refer to:
- `PROJECT_GUIDE.md` - Architecture and features
- `DEVELOPER_GUIDE.md` - Code examples and templates
- `IMPLEMENTATION_SUMMARY.md` - What was built
