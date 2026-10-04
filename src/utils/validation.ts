/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate standard 10-digit US phone
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}

/**
 * Validate 9-digit US SSN
 */
export function isValidSSN(ssn: string): boolean {
  const digits = ssn.replace(/\D/g, '');
  return digits.length === 9;
}

/**
 * Validate numeric positive amount
 */
export function isValidAmount(amount: number, min = 1000, max = 100000): boolean {
  return typeof amount === 'number' && !isNaN(amount) && amount >= min && amount <= max;
}

/**
 * Validate date of birth for age >= 18
 */
export function isAdult(dobString: string): boolean {
  if (!dobString) return false;
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 18;
}
