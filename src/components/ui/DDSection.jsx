import React from 'react';

/**
 * DDSection — a full-bleed content block with the calm 24px/1100px rhythm.
 * Optional eyebrow + title, hard 1px top rule, and tone control.
 */
export default function DDSection({
  id,
  eyebrow,
  title,
  intro,
  tone = 'cream',
  rule = 'none',
  narrow = false,
  className = '',
  children,
}) {
  return (
    <section
      id={id}
      className={`dd-section ${tone !== 'cream' ? `dd-section--${tone}` : ''} ${rule === 'top' ? 'dd-section--rule' : ''} ${className}`.trim()}
    >
      <div className={narrow ? 'dd-container--narrow' : 'dd-container'}>
        <div className="dd-section__head">
          {eyebrow ? <span className={`label label--${eyebrowTone || 'orange'}`}>{eyebrow}</span> : null}
          {title ? <h2>{title}</h2> : null}
          {intro ? <p>{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}