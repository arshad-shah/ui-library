export const PASSWORD_REQUIREMENTS = [
  { label: 'Minimum 8 characters', validator: (p: string) => p.length >= 8 },
  {
    label: 'At least one uppercase letter',
    validator: (p: string) => /[A-Z]/.test(p),
  },
  {
    label: 'At least one lowercase letter',
    validator: (p: string) => /[a-z]/.test(p),
  },
  { label: 'At least one number', validator: (p: string) => /[0-9]/.test(p) },
  {
    label: 'At least one special character',
    validator: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
];