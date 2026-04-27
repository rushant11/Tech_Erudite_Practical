export const colors = {
  background: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textPlaceholder: '#C4C4C4',
  border: '#E5E7EB',
  borderStrong: '#E8E8E8',
  error: '#EF4444',
  primary: '#3CC868',
  onPrimary: '#FFFFFF',
  socialGoogle: '#EA4335',
  socialApple: '#111111',
  socialFacebook: '#1877F2',
} as const;

export type AppColor = (typeof colors)[keyof typeof colors];
