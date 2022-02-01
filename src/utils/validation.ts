export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRequired(value: unknown, field: string): void {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${field} is required`);
  }
}
