import type { FormErrors, FormValues } from '@/types'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validatePasswordWithMessages(password: string): ValidationResult {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter.')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number.')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character.')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateForm = (form: FormValues): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {}

  if (!form.username) {
    errors.username = 'Username is required'
  }

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else {
    const passwordValidation = validatePasswordWithMessages(form.password)
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(' ')
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
