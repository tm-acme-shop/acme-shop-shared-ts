export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export function validateEmail(email: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!email) {
    errors.push({
      field: 'email',
      message: 'Email is required',
      code: 'REQUIRED',
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
      code: 'INVALID_FORMAT',
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validatePassword(password: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!password) {
    errors.push({
      field: 'password',
      message: 'Password is required',
      code: 'REQUIRED',
    });
  } else {
    if (password.length < 8) {
      errors.push({
        field: 'password',
        message: 'Password must be at least 8 characters',
        code: 'MIN_LENGTH',
      });
    }
    if (!/[A-Z]/.test(password)) {
      errors.push({
        field: 'password',
        message: 'Password must contain at least one uppercase letter',
        code: 'MISSING_UPPERCASE',
      });
    }
    if (!/[a-z]/.test(password)) {
      errors.push({
        field: 'password',
        message: 'Password must contain at least one lowercase letter',
        code: 'MISSING_LOWERCASE',
      });
    }
    if (!/[0-9]/.test(password)) {
      errors.push({
        field: 'password',
        message: 'Password must contain at least one number',
        code: 'MISSING_NUMBER',
      });
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validatePhone(phone: string): ValidationResult {
  const errors: ValidationError[] = [];
  const cleanPhone = phone.replace(/\D/g, '');

  if (!phone) {
    errors.push({
      field: 'phone',
      message: 'Phone number is required',
      code: 'REQUIRED',
    });
  } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    errors.push({
      field: 'phone',
      message: 'Invalid phone number',
      code: 'INVALID_FORMAT',
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validateRequired(value: unknown, field: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push({
      field,
      message: `${field} is required`,
      code: 'REQUIRED',
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validateLength(value: string, field: string, min: number, max: number): ValidationResult {
  const errors: ValidationError[] = [];

  if (value.length < min) {
    errors.push({
      field,
      message: `${field} must be at least ${min} characters`,
      code: 'MIN_LENGTH',
    });
  }
  if (value.length > max) {
    errors.push({
      field,
      message: `${field} must be at most ${max} characters`,
      code: 'MAX_LENGTH',
    });
  }

  return { valid: errors.length === 0, errors };
}

export function combineValidationResults(...results: ValidationResult[]): ValidationResult {
  const allErrors = results.flatMap(r => r.errors);
  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
