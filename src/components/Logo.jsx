import React from 'react';

export default function Logo({
  as: Component = 'span',
  style = {},
  className = '',
  showTagline = false,
  size = 'medium', // 'small' | 'medium' | 'large'
}) {
  const fontSizes = {
    small: '0.8rem',
    medium: '0.95rem',
    large: '1.2rem',
  };

  const paddings = {
    small: '0.25rem 0.5rem',
    medium: '0.35rem 0.65rem',
    large: '0.5rem 0.9rem',
  };

  const frameStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: showTagline ? '0.15rem' : '0',
    padding: paddings[size] || paddings.medium,
    border: '2px solid #1F2937',
    backgroundColor: '#FFFFFF',
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
    letterSpacing: '-0.03em',
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
            color: '#1F2937',
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
            marginLeft: '0.08rem',
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
            letterSpacing: '0.12em',
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