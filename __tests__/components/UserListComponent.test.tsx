/**
 * UserListComponent Tests
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock dependencies
jest.mock('react-native-flash-message', () => ({
  showMessage: jest.fn(),
}));

jest.mock('../../../src/global/customButton', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress }: any) => (
    <TouchableOpacity testID={`btn-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

import UserListComponent from '../../../src/components/users/userList';

const mockUsers = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    phone: '+1-555-001',
    image: undefined,
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Jones',
    email: 'bob@example.com',
    phone: '+1-555-002',
    image: undefined,
  },
];

const defaultProps = {
  users: mockUsers,
  isLoading: false,
  error: null,
  isOffline: false,
  onEndReached: jest.fn(),
  onUserPress: jest.fn(),
  onAddUserPress: jest.fn(),
  onLogoutPress: jest.fn(),
  onRetry: jest.fn(),
};

describe('UserListComponent', () => {
  it('renders user names', () => {
    const { getByText } = render(<UserListComponent {...defaultProps} />);
    expect(getByText('Alice Smith')).toBeTruthy();
    expect(getByText('Bob Jones')).toBeTruthy();
  });

  it('renders user emails', () => {
    const { getByText } = render(<UserListComponent {...defaultProps} />);
    expect(getByText('alice@example.com')).toBeTruthy();
    expect(getByText('bob@example.com')).toBeTruthy();
  });

  it('renders empty state when no users', () => {
    const { getByText } = render(
      <UserListComponent {...defaultProps} users={[]} />
    );
    expect(getByText('No users yet')).toBeTruthy();
  });

  it('renders error state with retry button', () => {
    const { getByText } = render(
      <UserListComponent {...defaultProps} users={[]} error="Network error" />
    );
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Network error')).toBeTruthy();
  });

  it('shows offline banner when isOffline is true', () => {
    const { getByText } = render(
      <UserListComponent {...defaultProps} isOffline={true} />
    );
    expect(getByText(/Offline mode/i)).toBeTruthy();
  });

  it('calls onUserPress when a user card is tapped', () => {
    const onUserPress = jest.fn();
    const { getByText } = render(
      <UserListComponent {...defaultProps} onUserPress={onUserPress} />
    );
    fireEvent.press(getByText('Alice Smith'));
    expect(onUserPress).toHaveBeenCalledWith(mockUsers[0]);
  });
});
