import React from 'react';

export default function Logo({
  as: Component = 'span',
  style = {},
  className = '',
  showTagline = false,
  size = 'medium', // 'small' | 'medium' | 'large'
}) {
  const fontSizes = {
    small: '0.85rem',
    medium: '1.05rem',
    large: '1.35rem',
  };

  const paddings = {
    small: '0.35rem 0.6rem',
    medium: '0.5rem 0.85rem',
    large: '0.65rem 1.15rem',
  };

  const frameStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: showTagline ? '0.2rem' : '0',
    padding: paddings[size] || paddings.medium,
    border: '2px solid #111111',
    backgroundColor: '#FFFCF9',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    width: 'fit-content',
    boxSizing: 'border-box',
    textDecoration: 'none',
    boxShadow: 'none',
  };

  const wordStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: fontSizes[size] || fontSizes.medium,
    fontWeight: 900,
    letterSpacing: '-0.04em',
    textTransform: 'uppercase',
  };

  return (
    <Component
      className={`dd-brand-logo ${className}`.trim()}
      style={{ ...frameStyle, ...style }}
      aria-label="DigitallyDefined"
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
        <span
          style={{
            ...wordStyle,
            color: '#111111',
            fontStyle: 'normal',
          }}
        >
          DIGITALLY
        </span>
        <span
          style={{
            ...wordStyle,
            color: '#F18B25',
            fontStyle: 'italic',
            marginLeft: '0.05rem',
          }}
        >
          DEFINED
        </span>
      </div>

      {showTagline && (
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#6B7280',
            lineHeight: 1,
            marginTop: '2px',
          }}
        >
          Faceless Digital Real Estate for Gen X Women
        </span>
      )}
    </Component>
  );
}