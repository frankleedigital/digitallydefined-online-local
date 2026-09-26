import React from 'react';

export default function Logo({ size = 'medium', showTagline = false, style = {} }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const badgeSize = isSmall ? '24px' : isLarge ? '34px' : '28px';
  const iconSize = isSmall ? 13 : isLarge ? 18 : 15;
  const fontSize = isSmall ? '0.95rem' : isLarge ? '1.45rem' : '1.15rem';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        textDecoration: 'none',
        ...style,
      }}
    >
      {/* Geometric Clean Badge (Thin Frame, No Shadow) */}
      <div
        style={{
          width: badgeSize,
          height: badgeSize,
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #1F2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1F2937"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" fill="#F18B25" stroke="#F18B25" />
        </svg>
      </div>

      {/* Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: fontSize,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#1F2937',
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '0.2rem',
          }}
        >
          <span>DIGITALLY</span>
          <span
            style={{
              fontStyle: 'italic',
              color: '#F18B25',
              fontWeight: 900,
            }}
          >
            DEFINED
          </span>
        </span>

        {showTagline && (
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.62rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#6B7280',
              marginTop: '0.2rem',
            }}
          >
            Faceless Digital Wealth for Gen X Women
          </span>
        )}
      </div>
    </div>
  );
}
