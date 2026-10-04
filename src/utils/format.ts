/**
 * Formats a number as a USD currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a percentage number (e.g. 5.99 => "5.99%")
 */
export function formatPercentage(val: number): string {
  return `${val.toFixed(2)}%`;
}

/**
 * Formats a phone number string into (XXX) XXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  const cleaned = ('' + value).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
}

/**
 * Mask an SSN or ID number showing only last 4 digits (e.g. ***-**-1234)
 */
export function maskSSN(ssn: string): string {
  const digits = ssn.replace(/\D/g, '');
  if (digits.length >= 4) {
    return `***-**-${digits.slice(-4)}`;
  }
  return '***-**-****';
}
