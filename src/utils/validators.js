// Small shared validation helpers so every form applies the same rules.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accepts a standard Indian mobile number, with optional +91 prefix.
export const PHONE_REGEX = /^(?:\+91[-\s]?)?[6-9][0-9]{9}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidPhone(value) {
  return PHONE_REGEX.test(value.trim().replace(/[\s-]/g, ""));
}

export const PASSWORD_MIN_LENGTH = 8;

export function isValidPassword(value) {
  return value.length >= PASSWORD_MIN_LENGTH;
}

// Permissive alphanumeric postal/PIN code check (4-10 characters) — covers
// numeric PIN/ZIP codes as well as alphanumeric formats like "SW1A 1AA".
export const PIN_CODE_REGEX = /^[A-Za-z0-9][A-Za-z0-9 -]{3,9}$/;

export function isValidPinCode(value) {
  return PIN_CODE_REGEX.test(value.trim());
}
