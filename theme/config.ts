import { createConfig } from '@gluestack-ui/themed'

// DiveTribe Ocean-Inspired Design System
// Color palette based on diving depths and ocean tones
export const config = createConfig({
  aliases: {
    bg: 'backgroundColor',
    bgColor: 'backgroundColor',
    rounded: 'borderRadius',
  },
  tokens: {
    colors: {
      // Ocean-inspired color palette
      primary: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#0891b2', // Main dive blue
        600: '#0e7490',
        700: '#155e75',
        800: '#164e63',
        900: '#083344',
      },
      surface: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      // Diving-specific colors
      depth: {
        500: '#1e40af',
      },
      safety: {
        500: '#dc2626',
      },
      achievement: {
        500: '#059669',
      },
    },
    space: {
      '1': '8px',
      '2': '16px',
      '3': '24px',
      '4': '32px',
      '5': '40px',
      '6': '48px',
      '8': '64px',
      '10': '80px',
      '12': '96px',
      '16': '128px',
      '20': '160px',
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'Inter',
    },
    radii: {
      none: 0,
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 12,
      '2xl': 16,
      '3xl': 24,
      full: 9999,
    },
  },
})
