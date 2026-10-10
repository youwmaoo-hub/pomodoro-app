// Design System
export const Colors = {
  background: '#F5F3EF',
  surface: '#FFFFFF',
  surfaceSecondary: '#FAFAF8',
  text: '#2D3436',
  textSecondary: '#636E72',
  textTertiary: '#95A5A6',
  primary: '#5F9EA0',
  primaryLight: '#A8D5D8',
  primaryDark: '#4A7C7E',
  accent: '#7FB3D5',
  success: '#81C784',
  warning: '#FFB74D',
  error: '#E57373',
  border: '#E8E6E3',
  borderLight: '#F0EFEC',
  shadow: 'rgba(45, 52, 54, 0.08)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const Shadows = {
  sm: {
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
};

// App Settings
export const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds
export const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
export const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

export const STORAGE_KEYS = {
  TASKS: '@pomodoro/tasks',
  SESSIONS: '@pomodoro/sessions',
  DAILY_PLANS: '@pomodoro/daily_plans',
  NOTES: '@pomodoro/notes',
  STATS: '@pomodoro/stats',
};
