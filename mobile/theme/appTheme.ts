export const appTheme = {
  colors: {
    background: '#FA5D70',
    backgroundLightShape: '#F8B5BC',
    backgroundDarkShape: '#F58490',
    white: '#FFFFFF',
    textDark: '#333333',
    textMuted: '#5A5A5A',
    buttonSecondary: '#F6C6CC',
    borderSoft: '#F0AAB3',
    inputBg: '#F3F3F3',
    overlay: 'rgba(0, 0, 0, 0.15)',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    pill: 999,
  },
  typography: {
    title: 36,
    subtitle: 20,
    label: 28,
    body: 16,
    caption: 14,
    button: 34,
  },
} as const;

export type AppTheme = typeof appTheme;
