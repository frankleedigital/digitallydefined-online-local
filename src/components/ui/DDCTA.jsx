import React from 'react';

/**
 * DDCTA — the only conversion button on the website.
 * Sharp, 0 radius, 1px border, no gradient, no shadow.
 */
export default function DDCTA({ label, href, onClick, variant = 'primary', wide = false, className = '', disabled, icon, target, ...rest }) {
  const Tag = href ? 'a' : 'button';
  const baseClass = `dd-btn dd-btn--${variant} ${wide ? 'dd-btn--wide' : ''} ${className}`.trim();

  const inner = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {label}
    </>
  );

  if (Tag === 'a') {
    return (
      <a href={href} className={baseClass} target={target} disabled={disabled} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={baseClass} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}