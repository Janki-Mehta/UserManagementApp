/**
 * Users Store Tests
 */
import { act } from 'react-test-renderer';

const mockUser = (id: number) => ({
  id,
  firstName: `First${id}`,
  lastName: `Last${id}`,
  email: `user${id}@example.com`,
  phone: `+1-555-000-000${id}`,
  image: undefined,
});

describe('usersStore', () => {
  let useUsersStore: any;

  beforeEach(() => {
    jest.resetModules();
    useUsersStore = require('../../src/store/usersStore').useUsersStore;
    // Reset to clean state before each test
    act(() => {
      useUsersStore.getState().resetUsers();
    });
  });

  it('initial state has empty users and default values', () => {
    const state = useUsersStore.getState();
    expect(state.users).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.hasMoreUsers).toBe(true);
    expect(state.currentPage).toBe(0);
    expect(state.totalUsers).toBe(0);
  });

  it('addUser() prepends a new user to the list', () => {
    act(() => {
      useUsersStore.getState().addUser(mockUser(1));
    });
    const { users } = useUsersStore.getState();
    expect(users).toHaveLength(1);
    expect(users[0].id).toBe(1);
    expect(users[0].firstName).toBe('First1');

    // Second user should be prepended
    act(() => {
      useUsersStore.getState().addUser(mockUser(2));
    });
    const { users: users2 } = useUsersStore.getState();
    expect(users2[0].id).toBe(2);
    expect(users2[1].id).toBe(1);
  });

  it('updateUser() updates the correct user without affecting others', () => {
    act(() => {
      useUsersStore.getState().setUsers([mockUser(1), mockUser(2), mockUser(3)]);
    });
    act(() => {
      useUsersStore.getState().updateUser({
        id: 2,
        firstName: 'Updated',
        lastName: 'Name',
        email: 'updated@example.com',
        phone: '+1-999',
      });
    });
    const { users } = useUsersStore.getState();
    expect(users).toHaveLength(3);
    expect(users.find((u: any) => u.id === 2)?.firstName).toBe('Updated');
    expect(users.find((u: any) => u.id === 1)?.firstName).toBe('First1');
    expect(users.find((u: any) => u.id === 3)?.firstName).toBe('First3');
  });

  it('updateUser() also updates selectedUser when it matches', () => {
    act(() => {
      useUsersStore.getState().setUsers([mockUser(1)]);
      useUsersStore.getState().setSelectedUser(mockUser(1));
    });
    act(() => {
      useUsersStore.getState().updateUser({
        id: 1,
        firstName: 'ChangedFirst',
        lastName: 'ChangedLast',
        email: 'changed@example.com',
        phone: '+1-000',
      });
    });
    const { selectedUser } = useUsersStore.getState();
    expect(selectedUser?.firstName).toBe('ChangedFirst');
  });

  it('resetUsers() resets all state to initial values', () => {
    act(() => {
      useUsersStore.getState().setUsers([mockUser(1), mockUser(2)]);
      useUsersStore.getState().setCurrentPage(3);
      useUsersStore.getState().setIsLoading(true);
    });
    act(() => {
      useUsersStore.getState().resetUsers();
    });
    const state = useUsersStore.getState();
    expect(state.users).toEqual([]);
    expect(state.currentPage).toBe(0);
    expect(state.isLoading).toBe(false);
    expect(state.hasMoreUsers).toBe(true);
  });

  it('addUsers() appends users to existing list', () => {
    act(() => {
      useUsersStore.getState().setUsers([mockUser(1)]);
      useUsersStore.getState().addUsers([mockUser(2), mockUser(3)]);
    });
    const { users } = useUsersStore.getState();
    expect(users).toHaveLength(3);
    expect(users[2].id).toBe(3);
  });
});
