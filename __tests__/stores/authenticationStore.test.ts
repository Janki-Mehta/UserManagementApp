/**
 * Authentication Store Tests
 */
import { act } from 'react-test-renderer';

// We need to create fresh store instances per test to avoid state leaking
const getStore = () => {
  jest.resetModules();
  const { useAuthenticationStore } = require('../../src/store/authenticationStore');
  return useAuthenticationStore.getState();
};

describe('authenticationStore', () => {
  it('initial state is unauthenticated', () => {
    const store = getStore();
    expect(store.isAuthenticated).toBe(false);
    expect(store.email).toBeNull();
  });

  it('login() sets isAuthenticated to true and stores email', () => {
    const { useAuthenticationStore } = require('../../src/store/authenticationStore');
    act(() => {
      useAuthenticationStore.getState().login('test@example.com', 'password123');
    });
    const state = useAuthenticationStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.email).toBe('test@example.com');
  });

  it('logout() resets authentication state', () => {
    const { useAuthenticationStore } = require('../../src/store/authenticationStore');
    act(() => {
      useAuthenticationStore.getState().login('test@example.com', 'password123');
      useAuthenticationStore.getState().logout();
    });
    const state = useAuthenticationStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.email).toBeNull();
  });
});
