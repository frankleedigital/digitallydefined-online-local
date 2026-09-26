// DigitallyDefined — Proof-of-Concept Design Tokens (No Dashboard, No Shadows)
// Single source of truth for the DigitallyDefined proof of concept.

export const tokens = {
  palette: {
    background: "#FFFCF9", // warm cream
    card: "#FFFFFF",       // crisp white surface
    panel: "#FAF8F5",      // soft warm neutral
    textPrimary: "#1F2937",// refined charcoal
    textInk: "#111827",    // deep charcoal
    textMuted: "#6B7280",  // accessible neutral gray
    orange: "#F18B25",     // signature brand orange accent / CTA
    orangeLight: "#FFF7ED",// subtle warm tint
    aqua: "#47B7D4",       // supportive secondary
    aquaLight: "#F0F9FF",  // subtle aqua tint
    coral: "#E05D52",      // deficit indicator
    border: "#1F2937",     // thin brand frame
    borderLight: "#E5E7EB",// light frame divider
  },

  type: {
    heading: "Inter",
    body: "DM Sans",
    weight: 800,
    headingSpacing: "-0.025em",
    eyebrowSpace: "0.12em",
    bodyLineHeight: "1.65",
  },

  spacing: {
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "40px",
    xl: "56px",
    gridGap: "24px",
    container: "1040px",
  },

  geometry: {
    width: "1.5px",        // thin black/charcoal frame
    color: "#1F2937",
    radius: "0px",         // clean geometric structure
  },

  shadow: {
    card: "none",          // NO SHADOWS across the entire site
    hard: "none",
    hover: "none",
    elevated: "none",
    none: "none",
  },

  icon: { style: "flat-line-minimal", stroke: "1.75px" },
};

export const theme = {
  fonts: {
    heading: `'${tokens.type.heading}', system-ui, -apple-system, sans-serif`,
    body: `'${tokens.type.body}', system-ui, -apple-system, sans-serif`,
    app: `'${tokens.type.heading}', system-ui, sans-serif`,
  },
  colors: {
    background: tokens.palette.background,
    card: tokens.palette.card,
    panel: tokens.palette.panel,
    textPrimary: tokens.palette.textPrimary,
    textInk: tokens.palette.textInk,
    textMuted: tokens.palette.textMuted,
    border: tokens.geometry.color,
    borderLight: tokens.palette.borderLight,
    orange: tokens.palette.orange,
    orangeLight: tokens.palette.orangeLight,
    aqua: tokens.palette.aqua,
    aquaLight: tokens.palette.aquaLight,
    coral: tokens.palette.coral,
    accent: tokens.palette.orange,
  },
  geometry: tokens.geometry,
  shadows: tokens.shadow,
  spacing: tokens.spacing,
  layout: tokens.spacing,
};

// --- Computed primitives (Thin frames, zero shadows) ---
export const brutalBorder = `${theme.geometry.width} solid ${theme.geometry.color}`;
export const thinBorder = `1px solid ${theme.geometry.color}`;
export const lightBorder = `1px solid ${theme.colors.borderLight}`;

export const brutalCard = {
  border: brutalBorder,
  borderRadius: "0px",
  boxShadow: "none",
  backgroundColor: theme.colors.card,
};

export const brutalHeading = {
  fontFamily: theme.fonts.heading,
  fontWeight: 800,
  fontStyle: "normal",
  textTransform: "uppercase",
  letterSpacing: tokens.type.headingSpacing,
  color: theme.colors.textPrimary,
  lineHeight: 1.15,
};

export const brutalEyebrow = {
  fontFamily: theme.fonts.heading,
  fontSize: "0.7rem",
  fontWeight: 800,
  letterSpacing: tokens.type.eyebrowSpace,
  textTransform: "uppercase",
  color: theme.colors.orange,
  margin: 0,
};

export const brutalButtonPrimary = {
  backgroundColor: theme.colors.orange,
  color: "#1F2937",
  border: brutalBorder,
  borderRadius: "0px",
  fontFamily: theme.fonts.heading,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0.85rem 1.75rem",
  cursor: "pointer",
  boxShadow: "none",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  transition: "all 0.15s ease",
};

export const brutalButtonOutline = {
  backgroundColor: "#FFFFFF",
  color: "#1F2937",
  border: brutalBorder,
  borderRadius: "0px",
  fontFamily: theme.fonts.heading,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0.85rem 1.75rem",
  cursor: "pointer",
  boxShadow: "none",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  transition: "all 0.15s ease",
};

export const brutalButtonSecondary = {
  backgroundColor: "#1F2937",
  color: "#FFFFFF",
  border: brutalBorder,
  borderRadius: "0px",
  fontFamily: theme.fonts.heading,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0.85rem 1.75rem",
  cursor: "pointer",
  boxShadow: "none",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  transition: "all 0.15s ease",
};

export const brutalButtonBase = brutalButtonPrimary;
