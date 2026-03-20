import { create } from 'zustand';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  currentPage: number;
  isLoading: boolean;
  hasMoreUsers: boolean;
  totalUsers: number;
  setUsers: (users: User[]) => void;
  addUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setCurrentPage: (page: number) => void;
  setIsLoading: (loading: boolean) => void;
  setHasMoreUsers: (hasMore: boolean) => void;
  setTotalUsers: (total: number) => void;
  updateUser: (user: User) => void;
  addUser: (user: User) => void;
  resetUsers: () => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  selectedUser: null,
  currentPage: 0,
  isLoading: false,
  hasMoreUsers: true,
  totalUsers: 0,
  setUsers: (users) => set({ users }),
  addUsers: (users) => set((state) => ({ users: [...state.users, ...users] })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setHasMoreUsers: (hasMore) => set({ hasMoreUsers: hasMore }),
  setTotalUsers: (total) => set({ totalUsers: total }),

  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
      selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
    })),

  addUser: (user) =>
    set((state) => ({
      users: [user, ...state.users],
    })),
    
  resetUsers: () =>
    set({
      users: [],
      selectedUser: null,
      currentPage: 0,
      isLoading: false,
      hasMoreUsers: true,
      totalUsers: 0,
    }),
}));
