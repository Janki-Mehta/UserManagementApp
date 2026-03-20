# Developer Quick Reference

## Common Tasks

### Adding a New Screen

1. **Create the Component** (`src/components/[feature]/[screen]/index.tsx`):
   ```typescript
   interface ScreenProps {
     // your props
   }
   
   const Screen: React.FC<ScreenProps> = (props) => {
     return <View>{/* UI */}</View>;
   };
   
   export default Screen;
   ```

2. **Create the Container** (`src/containers/[feature]/[screen]/index.tsx`):
   ```typescript
   const Container: React.FC<ContainerProps> = ({ navigation, route }) => {
     // Business logic
     return <Screen {...props} />;
   };
   
   export default Container;
   ```

3. **Add to Navigation** (`src/navigation/index.tsx`):
   ```typescript
   <Stack.Screen
     name={ScreenNames.NewScreen}
     component={NewScreenContainer}
   />
   ```

4. **Add Screen Name** (`src/constants/screenNames.ts`):
   ```typescript
   export const ScreenNames = {
     NewScreen: 'NewScreen',
   };
   ```

### Using Zustand Store

**Example - Authentication Store**:
```typescript
import { useAuthenticationStore } from '../store/authenticationStore';

const Component = () => {
  const isAuthenticated = useAuthenticationStore(state => state.isAuthenticated);
  const login = useAuthenticationStore(state => state.login);
  
  return <Text>{isAuthenticated ? 'Logged In' : 'Not Logged In'}</Text>;
};
```

**Example - Users Store**:
```typescript
import { useUsersStore } from '../store/usersStore';

const Component = () => {
  const users = useUsersStore(state => state.users);
  const addUser = useUsersStore(state => state.addUser);
  const setIsLoading = useUsersStore(state => state.setIsLoading);
  
  return <FlatList data={users} />;
};
```

### Making API Calls

```typescript
import apiService from '../services/apiService';

const fetchData = async () => {
  try {
    const response = await apiService.getUsers(10, 0);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

### Form Validation

```typescript
import {
  validateEmail,
  validatePassword,
  getEmailErrorMessage,
} from '../utils/validation';

const handleSubmit = () => {
  if (!validateEmail(email)) {
    setEmailError(getEmailErrorMessage(email));
    return;
  }
};
```

### Navigation

```typescript
// Navigate to screen
navigation.navigate(ScreenNames.UserDetail, { userId: 123 });

// Reset stack (go back to root)
navigation.reset({
  index: 0,
  routes: [{ name: ScreenNames.UserList }],
});

// Go back
navigation.goBack();
```

## File Templates

### Component Template
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../constants/styles';

interface ScreenProps {
  // Define props
}

const Screen: React.FC<ScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      {/* UI Code */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Screen;
```

### Container Template
```typescript
import React, { useEffect } from 'react';
import { RootStackScreenProps } from '../../../navigation';
import { ScreenNames } from '../../../constants/screenNames';
import Screen from '../../../components/path/to/Screen';

type ContainerProps = RootStackScreenProps<typeof ScreenNames.ScreenName>;

const Container: React.FC<ContainerProps> = ({ navigation, route }) => {
  // State and logic here
  
  return <Screen {...props} />;
};

export default Container;
```

### Store Template (Zustand)
```typescript
import { create } from 'zustand';

interface State {
  // State properties
}

interface Actions {
  // Action methods
}

export const useStore = create<State & Actions>((set) => ({
  // Initial state
  property: null,
  
  // Actions
  setProperty: (value) => set({ property: value }),
}));
```

## Constants Reference

### Colors
```typescript
import { Colors } from '../constants/colors';

Colors.primary      // #007AFF
Colors.secondary    // #5AC8FA
Colors.white   // #FFFFFF
Colors.text         // #333333
Colors.textLight    // #777777
Colors.border       // #EEEEEE
Colors.error        // #FF3B30
Colors.success      // #34C759
Colors.warning      // #FF9500
Colors.disabled     // #D3D3D3
Colors.divider      // #F0F0F0
```

### Spacing
```typescript
import { Spacing } from '../constants/styles';

Spacing.xs   // 4
Spacing.sm   // 8
Spacing.md   // 12
Spacing.lg   // 16
Spacing.xl   // 20
Spacing.xxl  // 24
```

### Font Sizes
```typescript
import { FontSize } from '../constants/styles';

FontSize.xs    // 10
FontSize.sm    // 12
FontSize.md    // 14
FontSize.lg    // 16
FontSize.xl    // 18
FontSize.xxl   // 20
FontSize.xxxl  // 24
```

## Custom Components

### CustomTextInput
```typescript
<CustomTextInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
  editable={!loading}
/>
```

### CustomButton
```typescript
<CustomButton
  title="Submit"
  onPress={handlePress}
  loading={isLoading}
  variant="primary" // 'primary' | 'secondary' | 'danger'
  disabled={false}
/>
```

## Import Paths Quick Reference

### Components
```typescript
import SignInScreen from '../../components/authentication/signIn';
import UserListScreen from '../../components/users/userList';
```

### Containers
```typescript
import SignInContainer from '../../containers/authentication/signIn';
import UserListContainer from '../../containers/users/userList';
```

### Store
```typescript
import { useAuthenticationStore } from '../../store/authenticationStore';
import { useUsersStore } from '../../store/usersStore';
```

### Services
```typescript
import apiService from '../../services/apiService';
```

### Constants
```typescript
import { Colors } from '../../constants/colors';
import { Spacing, FontSize, BorderRadius } from '../../constants/styles';
import { ScreenNames } from '../../constants/screenNames';
```

### Utils
```typescript
import { validateEmail, validatePassword } from '../../utils/validation';
```

## Debugging Tips

### Print Store State
```typescript
const state = useAuthenticationStore.getState();
console.log(state);
```

### Check Navigation Stack
```typescript
const state = navigation.getState();
console.log('Navigation State:', state);
```

### API Response Check
```typescript
const response = await apiService.getUsers();
console.log('API Response:', response);
```

### TypeScript Error Fix
If TypeScript complains about types, check:
1. Import paths are correct
2. Interface/Type is exported properly
3. Component props match interface definition
4. Navigation params are defined in RootStackParamList

## Best Practices

1. **Always validate before API calls**
2. **Show loading state during async operations**
3. **Handle errors gracefully with user-friendly messages**
4. **Use constants instead of magic strings**
5. **Keep components small and focused**
6. **Use TypeScript interfaces for all props**
7. **Separate concerns: components vs containers**
8. **Use Zustand for global state, useState for local state**
9. **Memoize expensive computations with useCallback/useMemo**
10. **Use FlatList for long lists, not ScrollView**

## Common Errors & Solutions

### "Cannot find module"
- Check import path is correct
- Verify file exists
- Check file extension (.tsx for components)

### "Type not assignable"
- Check interface/type definition
- Verify prop types match component definition
- Use `as` casting only as last resort

### "Navigation not defined"
- Ensure component is inside NavigationContainer
- Check screen is registered in navigator
- Verify navigation prop is passed to component

### "Store not updating"
- Check action is called correctly
- Verify state field exists in store
- Ensure component is subscribing to correct field

---

For more information, see `PROJECT_GUIDE.md` and `IMPLEMENTATION_SUMMARY.md`
