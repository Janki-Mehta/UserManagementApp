import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyScreens, ScreenNames } from '.';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAuthenticationStore } from '../store/authenticationStore';
import 'react-native-gesture-handler';
import { Colors } from '../constants/colors';
import { FontSize, FontWeight } from '../constants/theme';

// ─── Param List ───────────────────────────────────────────────────────────────
export type RootStackParamList = {
  [ScreenNames.signin]: undefined;
  [ScreenNames.userList]: undefined;
  [ScreenNames.userDetail]: { userId: number };
  [ScreenNames.addEditUser]: { userId?: number } | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

// ─── Navigator ────────────────────────────────────────────────────────────────
const Stack = createNativeStackNavigator<RootStackParamList>();

interface PropsType {
  initialRoute?: string;
}

const MainNavigation = (props: PropsType) => {
  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={(props.initialRoute as keyof RootStackParamList) || ScreenNames.signin}
        screenOptions={{
          // Shared defaults: solid opaque header so content sits below it
          headerTransparent: false,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: Colors.surface,
          },
          headerTitleStyle: {
            fontSize: FontSize.lg,
            fontWeight: FontWeight.bold,
            color: Colors.text,
          },
          headerTintColor: Colors.primary,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        {!isAuthenticated ? (
          // ── Auth Stack ──────────────────────────────────────────────────────
          <Stack.Screen
            name={ScreenNames.signin}
            component={MyScreens.SignInContainer}
            options={{ headerShown: false }}
          />
        ) : (
          // ── App Stack ───────────────────────────────────────────────────────
          <>
            <Stack.Screen
              name={ScreenNames.userList}
              component={MyScreens.UserListContainer}
                          options={{ headerShown: false }}

            />

            <Stack.Screen
              name={ScreenNames.userDetail}
              component={MyScreens.UserDetailContainer}
              options={{
                title: '',
              }}
            />

            <Stack.Screen
              name={ScreenNames.addEditUser}
              component={MyScreens.AddEditUserContainer}
              // options={({ route }) => ({
              //   title: (route.params as any)?.userId ? 'Edit User' : 'Add User',
              // })}
            options={{ headerShown: true }}

            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;