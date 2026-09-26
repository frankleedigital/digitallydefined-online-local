import React from 'react';

/**
 * DDCard — the base Soft Brutalism surface.
 * 1px #111 border, 0 radius, brutalist hard shadow.
 */
export default function DDCard({
  as: Tag = 'div',
  tone = 'card',
  bordered = true,
  shadow = true,
  className = '',
  children,
}) {
  return (
    <Tag
      className={`dd-card ${tone !== 'card' ? `dd-card--${tone}` : ''} ${bordered ? '' : 'dd-card--unbordered'} ${shadow ? '' : 'dd-card--unshadowed'} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}