import React from 'react';

const wrapStyle = {
  maxWidth: '980px',
  margin: '0 auto',
  padding: '3rem 1.5rem 4rem',
};

const heroStyle = {
  textAlign: 'center',
  marginBottom: '2.5rem',
};

const headingStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 800,
  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  lineHeight: 1.05,
  marginBottom: '1rem',
};

const subStyle = {
  fontSize: '0.95rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
  marginBottom: '1.5rem',
};

const introStyle = {
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: 'var(--color-text)',
  marginBottom: '2rem',
  maxWidth: '720px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const sectionStyle = {
  marginBottom: '2.5rem',
};

const sectionTitleStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 800,
  fontSize: '1.1rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #111111',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  padding: '0.9rem 0',
  borderBottom: '1px solid var(--color-border)',
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

const toolNameStyle = {
  fontWeight: 700,
  minWidth: '140px',
};

const primaryBtnStyle = {
  display: 'inline-block',
  background: 'var(--color-accent)',
  color: '#fff',
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
  fontSize: '0.8rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '1rem 1.5rem',
  textDecoration: 'none',
  border: '1px solid #F18B25',
  marginTop: '1.5rem',
};

const helperStyle = {
  fontSize: '0.8rem',
  color: 'var(--color-text-muted)',
  marginTop: '0.75rem',
  textAlign: 'center',
};

const TOOLS = [
  {
    category: 'Content creation',
    items: [
      { name: 'AI writing assistant', note: 'Draft articles, outlines, and email sequences in private.' },
      { name: 'Template generator', note: 'Turn repeated formats into reusable systems.' },
      { name: 'Voice-to-draft tool', note: 'Speak ideas aloud and create first drafts without typing.' },
    ],
  },
  {
    category: 'Audience building',
    items: [
      { name: 'SEO keyword explorer', note: 'Find topics people already search for.' },
      { name: 'Email list manager', note: 'Keep contacts organized without complex CRM overhead.' },
      { name: 'Community poll tool', note: 'Ask small groups what they need before building.' },
    ],
  },
  {
    category: 'Sales and conversion',
    items: [
      { name: 'Offer builder', note: 'Shape promises, prices, and delivery methods clearly.' },
      { name: 'Landing page starter', note: 'Launch simple offer pages without design pressure.' },
      { name: 'Payment and delivery connector', note: 'Automate delivery without exposing private workflow details.' },
    ],
  },
  {
    category: 'Operations',
    items: [
      { name: 'SOP writer', note: 'Document repeatable work so it can be delegated later.' },
      { name: 'Analytics summarizer', note: 'Turn raw traffic and sales data into one-page reviews.' },
      { name: 'Workflow connector', note: 'Link tasks and notifications without writing code.' },
    ],
  },
];

export default function BestAIToolsOnlineBusiness() {
  return (
    <>
      <div style={wrapStyle}>
        <div style={heroStyle}>
          <h1 style={headingStyle}>Best AI Tools for Online Business</h1>
          <p style={subStyle}>Build privately. Work simply. Scale quietly.</p>
        </div>

        <p style={introStyle}>
          Online business does not require public performance. These tools are selected for women who want to build offers, automate delivery, and keep their identity private while creating real revenue.
        </p>

        {TOOLS.map((section) => (
          <div key={section.category} style={sectionStyle}>
            <h2 style={sectionTitleStyle}>{section.category}</h2>
            <ul style={listStyle}>
              {section.items.map((item) => (
                <li key={item.name} style={listItemStyle}>
                  <span style={toolNameStyle}>{item.name}</span>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div style={{ border: '1px solid #111111', background: 'var(--color-card)', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            The rule of one
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Choose one tool in each category. Use it until the workflow is boring. Boring means repeatable. Repeatable means sellable.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            If a tool requires more personal data than necessary, it is not a tool. It is a liability.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/tools" style={primaryBtnStyle}>Explore the Tools Hub</a>
          <p style={helperStyle}>
            Start with the Niche Profitability Scorecard before choosing tools.
          </p>
        </div>
      </div>
    </>
  );
}
