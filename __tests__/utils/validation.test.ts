/**
 * Validation Utility Tests
 */
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
  getEmailErrorMessage,
  getFirstNameErrorMessage,
  getLastNameErrorMessage,
  getPhoneErrorMessage,
} from '../../src/constants/utils/validation';

describe('validateEmail', () => {
  it('returns true for valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.co')).toBe(true);
    expect(validateEmail('firstname@subdomain.example.com')).toBe(true);
  });

  it('returns false for invalid email addresses', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('not-an-email')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
    expect(validateEmail('missingatsign.com')).toBe(false);
  });
});

describe('validateFirstName', () => {
  it('returns true for non-empty first names', () => {
    expect(validateFirstName('John')).toBe(true);
    expect(validateFirstName('  Jane  ')).toBe(true);
  });

  it('returns false for empty or whitespace-only first names', () => {
    expect(validateFirstName('')).toBe(false);
    expect(validateFirstName('   ')).toBe(false);
  });
});

describe('validateLastName', () => {
  it('returns true for non-empty last names', () => {
    expect(validateLastName('Doe')).toBe(true);
  });

  it('returns false for empty last names', () => {
    expect(validateLastName('')).toBe(false);
    expect(validateLastName('  ')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('returns true for non-empty phone values', () => {
    expect(validatePhone('+1-555-000-0001')).toBe(true);
    expect(validatePhone('9999999999')).toBe(true);
  });

  it('returns false for empty phone values', () => {
    expect(validatePhone('')).toBe(false);
    expect(validatePhone('   ')).toBe(false);
  });
});

describe('Error message functions', () => {
  it('getEmailErrorMessage returns null for valid email', () => {
    expect(getEmailErrorMessage('valid@example.com')).toBeNull();
  });

  it('getEmailErrorMessage returns "required" message for empty value', () => {
    expect(getEmailErrorMessage('')).toBe('Email is required');
  });

  it('getEmailErrorMessage returns "invalid" message for bad format', () => {
    expect(getEmailErrorMessage('notanemail')).toBe('Please enter a valid email address');
  });

  it('getFirstNameErrorMessage returns null for valid name', () => {
    expect(getFirstNameErrorMessage('Alice')).toBeNull();
  });

  it('getFirstNameErrorMessage returns message for empty name', () => {
    expect(getFirstNameErrorMessage('')).toBe('First name is required');
  });

  it('getLastNameErrorMessage returns null for valid name', () => {
    expect(getLastNameErrorMessage('Smith')).toBeNull();
  });

  it('getLastNameErrorMessage returns message for empty name', () => {
    expect(getLastNameErrorMessage('  ')).toBe('Last name is required');
  });

  it('getPhoneErrorMessage returns null for valid phone', () => {
    expect(getPhoneErrorMessage('+447700900000')).toBeNull();
  });

  it('getPhoneErrorMessage returns message for empty phone', () => {
    expect(getPhoneErrorMessage('')).toBe('Phone is required');
  });
});
