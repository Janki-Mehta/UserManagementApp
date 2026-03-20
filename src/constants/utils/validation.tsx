// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email) && email.length > 0;
};

export const validatePassword = (password: string): boolean => {
  return password.length > 0;
};

export const validateFirstName = (firstName: string): boolean => {
  return firstName.trim().length > 0;
};

export const validateLastName = (lastName: string): boolean => {
  return lastName.trim().length > 0;
};

export const validatePhone = (phone: string): boolean => {
  return phone.trim().length > 0;
};

export const getEmailErrorMessage = (email: string): string | null => {
  if (email.length === 0) {
    return 'Email is required';
  }
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const getPasswordErrorMessage = (password: string): string | null => {
  if (password.length === 0) {
    return 'Password is required';
  }
  return null;
};

export const getFirstNameErrorMessage = (firstName: string): string | null => {
  if (firstName.trim().length === 0) {
    return 'First name is required';
  }
  return null;
};

export const getLastNameErrorMessage = (lastName: string): string | null => {
  if (lastName.trim().length === 0) {
    return 'Last name is required';
  }
  return null;
};

export const getPhoneErrorMessage = (phone: string): string | null => {
  if (phone.trim().length === 0) {
    return 'Phone is required';
  }
  return null;
};
