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
    category: 'Writing assistance',
    items: [
      { name: 'AI writing assistant', note: 'Use for outlines, drafts, and editing without public attribution.' },
      { name: 'Grammar and style checker', note: 'Clean copy quickly. Keep voice yours.' },
      { name: 'Content rewriter', note: 'Turn one draft into multiple formats.' },
    ],
  },
  {
    category: 'Research and validation',
    items: [
      { name: 'Search trend analyzer', note: 'Check whether a topic is rising or falling before writing.' },
      { name: 'Competitor page analyzer', note: 'See what ranks without copying structure.' },
      { name: 'Keyword grouping tool', note: 'Cluster terms into pillar and cluster page plans.' },
    ],
  },
  {
    category: 'Design and media',
    items: [
      { name: 'Simple graphic maker', note: 'Create banners, pins, and social cards without design skill.' },
      { name: 'Mockup generator', note: 'Preview product covers or lead magnets before publishing.' },
      { name: 'Thumbnail creator', note: 'Make clickable but not sensational video previews.' },
    ],
  },
  {
    category: 'Automation',
    items: [
      { name: 'Workflow connector', note: 'Link forms, lists, and notifications without custom code.' },
      { name: 'Scheduler', note: 'Publish posts and emails on a calm, consistent rhythm.' },
      { name: 'Analytics summarizer', note: 'Turn raw traffic data into simple action items.' },
    ],
  },
];

export default function BestFreeAIToolsDigitalMarketing() {
  return (
    <>
      <div style={wrapStyle}>
        <div style={heroStyle}>
          <h1 style={headingStyle}>Best Free AI Tools for Digital Marketing</h1>
          <p style={subStyle}>Practical set. No hype. No face required.</p>
        </div>

        <p style={introStyle}>
          This list focuses on tools that help with research, writing, design, and automation for digital marketing. Every choice is evaluated on whether it protects privacy, keeps costs low, and supports faceless execution.
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
            How to choose
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Pick one tool per category. Master it before adding another. The goal is clarity, not collection.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            If a tool asks for more access than necessary, move on. Privacy and simplicity are features, not compromises.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/tools" style={primaryBtnStyle}>Use the Free Tools Hub</a>
          <p style={helperStyle}>
            Score niches and model returns before spending on paid tools.
          </p>
        </div>
      </div>
    </>
  );
}
