import React, { useEffect, useCallback, useState } from 'react';
import { useAuthenticationStore } from '../../../store/authenticationStore';
import { useUsersStore, User } from '../../../store/usersStore';
import apiService from '../../../services/apiService';
import CacheService from '../../../services/cacheService';
import { ScreenNames } from '../../../routers';
import UserListComponent from '../../../components/users/userList';
import { showMessage } from 'react-native-flash-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


const ITEMS_PER_PAGE = 10;

const UserListContainer: React.FC<any> = ({ navigation }) => {
  const users = useUsersStore((state) => state.users);
  const currentPage = useUsersStore((state) => state.currentPage);
  const isLoading = useUsersStore((state) => state.isLoading);
  const hasMoreUsers = useUsersStore((state) => state.hasMoreUsers);
  const insets = useSafeAreaInsets();

  const setUsers = useUsersStore((state) => state.setUsers);
  const addUsers = useUsersStore((state) => state.addUsers);
  const setCurrentPage = useUsersStore((state) => state.setCurrentPage);
  const setIsLoading = useUsersStore((state) => state.setIsLoading);
  const setHasMoreUsers = useUsersStore((state) => state.setHasMoreUsers);
  const setTotalUsers = useUsersStore((state) => state.setTotalUsers);
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const resetUsers = useUsersStore((state) => state.resetUsers);
  const logout = useAuthenticationStore((state) => state.logout);

  const [hasInitialized, setHasInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Fetch users with offline fallback
  const fetchUsers = useCallback(
    async (page: number) => {
      if (isLoading) return;
      if (page > 0 && !hasMoreUsers) return;

      setIsLoading(true);
      setError(null);

      try {
        const skip = page * ITEMS_PER_PAGE;
        const response = await apiService.getUsers(ITEMS_PER_PAGE, skip);

        const newUsers: User[] = response.data.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          image: user.image,
        }));

        if (page === 0) {
          setUsers(newUsers);
          // Cache the first page for offline use
          CacheService.saveUsers(newUsers);
        } else {
          addUsers(newUsers);
        }

        setTotalUsers(response.total);
        setCurrentPage(page);
        setHasMoreUsers(skip + ITEMS_PER_PAGE < response.total);
        setIsOffline(false);
      } catch (err: any) {
        if (page === 0) {
          // Try loading from MMKV cache
          const cached = CacheService.loadUsersSync();
          if (cached && cached.length > 0) {
            setUsers(cached);
            setHasMoreUsers(false);
            setIsOffline(true);
            showMessage({
              message: 'You\'re offline',
              description: 'Showing cached data',
              type: 'warning',
              icon: 'warning',
              duration: 3000,
            });
          } else {
            const msg = err?.message || 'Failed to load users. Please try again.';
            setError(msg);
            showMessage({
              message: 'Connection Error',
              description: msg,
              type: 'danger',
              icon: 'danger',
            });
          }
        }
        setHasMoreUsers(false);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, hasMoreUsers],
  );

  useEffect(() => {
    if (!hasInitialized) {
      fetchUsers(0);
      setHasInitialized(true);
    }
  }, [hasInitialized, fetchUsers]);

  const handleEndReached = () => {
    if (!isLoading && hasMoreUsers) {
      fetchUsers(currentPage + 1);
    }
  };

  const handleUserPress = (user: User) => {
    setSelectedUser(user);
    navigation.navigate(ScreenNames.userDetail, { userId: user.id });
  };

  const handleAddUserPress = () => {
    navigation.navigate(ScreenNames.addEditUser);
  };

  const handleLogout = () => {
    logout();
    resetUsers();
    CacheService.clearUsers();
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: ScreenNames.signin }],
    // });
  };

  const handleRetry = () => {
    setError(null);
    resetUsers();
    setHasInitialized(false);
  };

  return (
    <UserListComponent
      users={users}
      insets={insets}
      isLoading={isLoading}
      error={error}
      isOffline={isOffline}
      onEndReached={handleEndReached}
      onUserPress={handleUserPress}
      onAddUserPress={handleAddUserPress}
      onLogoutPress={handleLogout}
      onRetry={handleRetry}
    />
  );
};

export default UserListContainer;
