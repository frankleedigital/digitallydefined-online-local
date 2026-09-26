import React from 'react';

/**
 * DDLabel — small-caps brutalist eyebrow / label.
 */
export default function DDLabel({ children, as: Tag = 'span', tone = 'default', className = '', ...rest }) {
  return (
    <Tag
      className={`dd-label label--${tone} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}