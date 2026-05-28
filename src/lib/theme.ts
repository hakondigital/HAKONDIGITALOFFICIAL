/**
 * HAKON DIGITAL — Design Tokens
 * Single source of truth for all design values.
 * These mirror the CSS custom properties in globals.css.
 */

export const colors = {
  // Surfaces
  bgPrimary: '#070c14',
  bgSecondary: '#090e1a',
  bgCard: '#0c1525',
  bgCardHover: '#111e32',
  bgElevated: '#14233a',

  // Borders
  border: '#182540',
  borderLight: '#223354',

  // Text
  textPrimary: '#e2eeff',
  textSecondary: '#6888ac',
  textMuted: '#344d68',

  // Primary accent: electric cyan
  accent: '#00c8ff',
  accentDim: '#0099cc',
  accentGlow: 'rgba(0, 200, 255, 0.08)',
  accentBright: '#44d8ff',

  // Secondary accent: amber (use sparingly)
  secondary: '#f59e0b',
  secondaryDim: '#d48806',
} as const;

export const typography = {
  fontHeading: 'var(--font-space-grotesk)',
  fontBody: 'var(--font-inter)',
  fontMono: "ui-monospace, 'SF Mono', 'Cascadia Code', Consolas, monospace",

  // Scale
  displayXl: 'clamp(2.5rem, 6vw, 5rem)',
  display: 'clamp(2rem, 4.5vw, 3.75rem)',
  h1: 'clamp(1.75rem, 3.5vw, 3rem)',
  h2: 'clamp(1.5rem, 2.5vw, 2.25rem)',
  h3: '1.25rem',
  body: '1rem',
  small: '0.875rem',
  mono: '0.625rem',

  // Letter spacing
  tight: '-0.03em',
  normal: '-0.015em',
  wide: '0.08em',
  ultraWide: '0.2em',
} as const;

export const spacing = {
  // 8px grid system
  unit: 8,
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
  section: 'clamp(5rem, 8vw, 8rem)',
} as const;

export const borders = {
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  width: {
    hairline: '0.5px',
    thin: '1px',
    medium: '1.5px',
  },
} as const;

export const shadows = {
  card: '0 4px 24px rgba(0, 0, 0, 0.4)',
  cardHover: '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 200, 255, 0.08)',
  glow: '0 0 24px rgba(0, 200, 255, 0.2), 0 0 80px rgba(0, 200, 255, 0.05)',
  glowStrong: '0 0 40px rgba(0, 200, 255, 0.35)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/** Section module labels — brand-relevant telemetry vocabulary */
export const moduleLabels = {
  home: 'SYS.001 — HAKON DIGITAL',
  websites: 'SYS.002 — WEBSITES',
  softwareSystems: 'SYS.003 — SOFTWARE SYSTEMS',
  consultancy: 'SYS.004 — CONSULTANCY',
  portfolio: 'SYS.005 — PORTFOLIO',
  process: 'SYS.006 — PROCESS',
  commitments: 'SYS.007 — COMMITMENTS',
  faq: 'SYS.008 — INTEL',
  contact: 'SYS.009 — CONTACT',
} as const;
