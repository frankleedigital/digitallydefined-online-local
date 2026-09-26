import React from 'react';
import DDCard from './DDCard';
import DDCTA from './DDCTA';
import DDLabel from './DDLabel';

/**
 * DDToolCard — a tool tile: number / flat icon + title + description + CTA + sub-links.
 */
export default function DDToolCard({ step, title, description, cta, icon, note, subLinks = [], className = '' }) {
  return (
    <DDCard as="article" tone="card" className={`dd-tool-card ${className}`}>
      <div className="dd-tool-card__header">
        <span className="dd-tool-card__step">
          {icon || step}
        </span>
        <div className="dd-tool-card__body">
          <h3>{title}</h3>
          <p>{description}</p>
          {note ? <p className="dd-tool-card__note">{note}</p> : null}
        </div>
      </div>
      {subLinks.length > 0 ? (
        <div className="dd-tool-card__sub-links">
          {subLinks.map((l, i) => (
            <a key={i} href={l.href} className="dd-tool-card__sub-link">
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
      {cta ? <DDCTA {...cta} /> : null}
    </DDCard>
  );
}