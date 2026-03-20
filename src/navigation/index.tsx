import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { ScreenNames, RootStackParamList } from '../constants/screenNames';
import { useAuthenticationStore } from '../store/authenticationStore';

// Import containers
import SignInContainer from '../containers/authentication/signIn';
import UserListContainer from '../containers/users/userList';
import UserDetailContainer from '../containers/users/userDetail';
import AddEditUserContainer from '../containers/users/addEditUser';

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <Stack.Screen
            name={ScreenNames.SignIn}
            component={SignInContainer}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          // App Stack
          <>
            <Stack.Screen
              name={ScreenNames.UserList}
              component={UserListContainer}
              options={{
                title: 'Users',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name={ScreenNames.UserDetail}
              component={UserDetailContainer}
              options={{
                title: 'User Detail',
              }}
            />
            <Stack.Screen
              name={ScreenNames.AddEditUser}
              component={AddEditUserContainer}
              options={({ route }) => ({
                title: route.params?.userId ? 'Edit User' : 'Add User',
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
