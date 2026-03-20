import { Alert } from 'react-native';

export const appName = 'User Management';

// Alert helper
export const showAlert = (message: string) => {
  Alert.alert(appName, message);
};

// Button utilities
export const activityOpacity = 0.8;
export const hitSlop = 10;

// Loader reference
interface LoaderRef {
  toggleLoader: (show: boolean) => void;
}

export let loaderRef: LoaderRef | null = null;

export const setLoaderRef = (ref: LoaderRef | null) => {
  loaderRef = ref;
};

export const toggleLoader = (show: boolean) => {
  if (loaderRef) {
    loaderRef.toggleLoader(show);
  }
};

// Generate single initial
export const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  const first = parts[0]?.charAt(0).toUpperCase() || '';
  return first;
};

// Generate two initials
export const getInitialsTwoDigit = (name: string) => {
  const parts = name.trim().split(' ');
  const first = parts[0]?.charAt(0).toUpperCase() || '';
  const last = parts[parts.length - 1]?.charAt(0).toUpperCase() || '';
  return first + last;
};