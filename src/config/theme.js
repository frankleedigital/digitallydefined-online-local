// DigitallyDefined — unified Soft Brutalism design tokens
// Single source of truth for the online-local site theme.
// Mirrored in: digitallydefined-dashboard/src/theme.js

export const tokens = {
  palette: {
    background: "#FFFCF9", // cream
    card: "#FFFFFF", // white surface
    panel: "#FFFAF5", // warm white
    textPrimary: "#2D3748", // matches HTML reference files
    textInk: "#111111",
    textMuted: "#6B7280",   // matches reference files
    orange: "#F18B25",      // primary accent / CTA
    aqua: "#47B7D4",        // secondary / info
    red: "#C20F0A",         // matches reference files
    success: "#16A34A",
    gold: "#EAB308",
  },

  type: {
    heading: "Inter",
    body: "DM Sans",
    weight: 900,
    headingSpacing: "-0.03em",
    eyebrowSpace: "0.15em",
    bodyLineHeight: "1.6",
  },

  spacing: {
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "40px",
    xl: "60px",
    gridGap: "32px",
    container: "1100px",
  },

  geometry: {
    width: "2px",           // reference files use 2px solid borders
    color: "#111111",
    radius: "0px", // Brutalism: never rounded
  },

  shadow: {
    card: "none",
    hard: "4px 4px 0 0 rgba(0,0,0,1)", // true hard shadow from reference files
    hover: "4px 4px 0 0 rgba(0,0,0,1)",
    elevated: "4px 4px 0 0 rgba(0,0,0,1)",
    none: "none",
  },

  // Flat, geometric, brutalist visual language
  icon: { style: "flat-line-geometric", stroke: "1.5px" },
  illustration: { style: "flat-abstract", radius: "0px", figures: "none" },

  rules: [
    "no silhouettes",
    "no human forms",
    "no gradients",
    "no rounded corners",
    "no non-brand fonts",
    "no off-palette colors",
    "no non-brutalist shadows",
  ],
};

export const theme = {
  fonts: {
    heading: `'${tokens.type.heading}', system-ui, sans-serif`,
    body: `'${tokens.type.body}', system-ui, sans-serif`,
    app: `'${tokens.type.heading}', '${tokens.type.body}', system-ui, sans-serif`,
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
    gold: tokens.palette.gold,
    accent: tokens.palette.orange,
  },
  geometry: tokens.geometry,
  shadows: tokens.shadow,
  spacing: tokens.spacing,
  layout: tokens.spacing,
};

// --- Computed primitives -------------------------------------------
export const brutalBorder = `${theme.geometry.width} solid ${theme.geometry.color}`;

export const brutalCard = {
  border: brutalBorder,
  borderRadius: 0,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.card,
};

export const brutalHeading = {
  fontFamily: theme.fonts.heading,
  fontWeight: tokens.type.weight,
  fontStyle: "normal",
  textTransform: "uppercase",
  letterSpacing: tokens.type.headingSpacing,
  color: theme.colors.textPrimary,
  lineHeight: 1.1,
};

export const brutalEyebrow = {
  fontFamily: theme.fonts.heading,
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  margin: 0,
  color: theme.colors.orange,
};

export const brutalButtonBase = {
  display: "inline-block",
  fontFamily: theme.fonts.heading,
  fontWeight: 700,
  fontSize: "0.8rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  border: brutalBorder,
  borderRadius: 0,
  boxShadow: "none",
  textDecoration: "none",
  cursor: "pointer",
  padding: "0.9rem 2rem",
  transition: "background 150ms, color 150ms",
};

export const brutalButtonPrimary = {
  ...brutalButtonBase,
  backgroundColor: theme.colors.orange,
  color: theme.colors.textPrimary,
};

export const brutalButtonSecondary = {
  ...brutalButtonBase,
  backgroundColor: theme.colors.aqua,
  color: theme.colors.textPrimary,
};

export const brutalButtonOutline = {
  ...brutalButtonBase,
  backgroundColor: "transparent",
  color: theme.colors.textPrimary,
};

// Hard-shadow card — for featured / pitch / revenue cards
export const brutalCardHard = {
  border: brutalBorder,
  borderRadius: 0,
  boxShadow: "4px 4px 0 0 rgba(0,0,0,1)",
  backgroundColor: theme.colors.card,
};

export default theme;