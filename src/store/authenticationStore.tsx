import { create } from 'zustand';

interface AuthenticationState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
  isAuthenticated: false,
  email: null,
  login: (email: string, password: string) => {
    // Mock authentication - validation happens in the component
    set({
      isAuthenticated: true,
      email: email,
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      email: null,
    });
  },
}));