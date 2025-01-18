import type { FormErrors, FormValues } from '@/types'

const passwordRules = [
  {
    condition: (password: string) => !password,
    message: 'Password is required.',
  },
  {
    condition: (password: string) => password.length < 8,
    message: 'Password must be at least 8 characters long.',
  },
  {
    condition: (password: string) => !/[A-Z]/.test(password),
    message: 'Password must contain at least one uppercase letter.',
  },
  {
    condition: (password: string) => !/[a-z]/.test(password),
    message: 'Password must contain at least one lowercase letter.',
  },
  {
    condition: (password: string) => !/[0-9]/.test(password),
    message: 'Password must contain at least one number.',
  },
  {
    condition: (password: string) => !/[!@#$%^&*(),.?":{}|<>]/.test(password),
    message: 'Password must contain at least one special character.',
  },
]

const validatePassword = (password: string): string[] => {
  return passwordRules.filter((rule) => rule.condition(password)).map((rule) => rule.message)
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
    errors.password = ['Password is required.']
  } else {
    const passwordErrors = validatePassword(form.password)
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
