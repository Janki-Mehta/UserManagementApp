export const ScreenNames = {
  // Authentication
  SignIn: 'SignIn',
  // Users
  UserList: 'UserList',
  UserDetail: 'UserDetail',
  AddEditUser: 'AddEditUser',
};

export type RootStackParamList = {
  [ScreenNames.SignIn]: undefined;
  [ScreenNames.UserList]: undefined;
  [ScreenNames.UserDetail]: { userId: number };
  [ScreenNames.AddEditUser]: { userId?: number } | undefined;
};
