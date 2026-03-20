// ─── Primary Brand ────────────────────────────────────────────────────────────
// Deep indigo → violet gradient palette (professional, modern, interview-worthy)

export const Colors = {
  // Brand
  primary: '#4F46E5',          // Indigo-600
  primaryDark: '#3730A3',      // Indigo-800
  primaryLight: '#818CF8',     // Indigo-400
  primarySurface: '#EEF2FF',   // Indigo-50

  secondary: '#7C3AED',        // Violet-600
  secondaryLight: '#C4B5FD',   // Violet-300
  secondarySurface: '#F5F3FF', // Violet-50

  accent: '#06B6D4',           // Cyan-500
  accentLight: '#A5F3FC',      // Cyan-200
  accentSurface: '#ECFEFF',    // Cyan-50

  // Status
  success: '#10B981',          // Emerald-500
  successLight: '#D1FAE5',     // Emerald-100
  warning: '#F59E0B',          // Amber-500
  warningLight: '#FEF3C7',     // Amber-100
  error: '#EF4444',            // Red-500
  errorLight: '#FEE2E2',       // Red-100
  info: '#3B82F6',             // Blue-500
  infoLight: '#DBEAFE',        // Blue-100

  // Neutrals (OLED-friendly dark + crisp light)
  background: '#F8FAFC',       // Slate-50
  surface: '#FFFFFF',          // Pure white cards
  surfaceSecondary: '#F1F5F9', // Slate-100 (secondary cards)
  surfaceTertiary: '#E2E8F0',  // Slate-200

  // Text
  text: '#0F172A',             // Slate-900 (headlines)
  textSecondary: '#334155',    // Slate-700 (body)
  textLight: '#64748B',        // Slate-500 (captions/hints)
  textMuted: '#94A3B8',        // Slate-400 (placeholders)
  textInverse: '#FFFFFF',      // On dark/primary backgrounds
  textOnPrimary: '#FFFFFF',

  // Borders
  border: '#E2E8F0',           // Slate-200
  borderLight: '#F1F5F9',      // Slate-100
  borderFocus: '#4F46E5',      // Matches primary

  // Inputs
  inputBg: '#F8FAFC',
  inputBgFocused: '#FFFFFF',
  placeholder: '#94A3B8',      // Slate-400

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(15, 23, 42, 0.5)',  // Slate-900 @ 50%
  divider: '#E2E8F0',
  disabled: '#CBD5E1',         // Slate-300
  ripple: 'rgba(79, 70, 229, 0.12)',

  // Avatar gradient stops (used for initials avatars)
  avatarGradients: [
    ['#4F46E5', '#7C3AED'],  // indigo→violet
    ['#06B6D4', '#3B82F6'],  // cyan→blue
    ['#10B981', '#059669'],  // emerald
    ['#F59E0B', '#EF4444'],  // amber→red
    ['#8B5CF6', '#EC4899'],  // purple→pink
    ['#14B8A6', '#06B6D4'],  // teal→cyan
  ],
};

// Gradient definitions for consistent usage
export const Gradients = {
  primary: ['#4F46E5', '#7C3AED'],
  primaryHero: ['#3730A3', '#4F46E5', '#7C3AED'],
  accent: ['#06B6D4', '#4F46E5'],
  success: ['#10B981', '#059669'],
  card: ['#FFFFFF', '#F8FAFC'],
};
