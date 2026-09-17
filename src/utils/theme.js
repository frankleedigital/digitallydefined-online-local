// src/utils/theme.js — design tokens (migrated from config/theme.js)

export const tokens = {
  palette: {
    background: '#FFFCF9',
    card: '#FFFFFF',
    panel: '#FFFAF5',
    textPrimary: '#111111',
    textMuted: '#5F5F5F',
    orange: '#F18B25',
    aqua: '#47B7D4',
    red: '#8B1A0A',
    success: '#16A34A',
    gold: '#EAB308',
  },
  type: { heading: 'Inter', body: 'DM Sans', weight: 800, headingSpacing: '-0.03em', eyebrowSpace: '0.12em' },
  spacing: { xs: '8px', sm: '16px', md: '24px', lg: '40px', xl: '60px', container: '1100px' },
  geometry: { width: '1px', color: '#111111', radius: '0px' },
  shadow: { card: '1px 1px 0px rgba(0,0,0,0.08)', hover: '2px 2px 0px rgba(0,0,0,0.12)', elevated: '3px 3px 0px rgba(0,0,0,0.15)' },
};

export const theme = {
  fonts: {
    heading: `'${tokens.type.heading}', system-ui, sans-serif`,
    body: `'${tokens.type.body}', system-ui, sans-serif`,
  },
  colors: {
    background: tokens.palette.background,
    card: tokens.palette.card,
    panel: tokens.palette.panel,
    textPrimary: tokens.palette.textPrimary,
    textMuted: tokens.palette.textMuted,
    border: tokens.geometry.color,
    orange: tokens.palette.orange,
    aqua: tokens.palette.aqua,
    red: tokens.palette.red,
    success: tokens.palette.success,
  },
};

export const brutalBorder = `${theme.geometry.width} solid ${theme.geometry.color}`;
export const brutalButtonBase = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
  padding: '14px 20px', border: brutalBorder, borderRadius: 0,
  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: theme.fonts.body,
};
export const brutalButtonPrimary = { ...brutalButtonBase, backgroundColor: theme.colors.orange, color: theme.colors.textPrimary };
export const brutalButtonOutline = { ...brutalButtonBase, backgroundColor: theme.colors.background, color: theme.colors.textPrimary };
export default theme;
