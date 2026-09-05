import React from 'react';
import ToolShell from './ToolShell';

/**
 * /tool/social — Social & Automations
 * Lightweight CRO page. Social publishing and funnel automations live in the
 * dashboard's integration layer; this page routes builders there and to a
 * validated niche first.
 */
const POINTS = [
  { title: 'One asset, many channels', body: 'Turn a single piece of content into a repeatable distribution system without being on camera.' },
  { title: 'Automate the repetition', body: 'Funnels, follow-ups, and publishing belong in the dashboard where they can run on autopilot.' },
  { title: 'Measure what works', body: 'See which channels and assets compound so you can double down on what is actually working.' },
];

export default function Social() {
  return (
    <ToolShell
      eyebrow="Social & Automations"
      title="Build the quiet distribution system."
      tagline="Publish, follow up, and measure on autopilot while you stay faceless and stay in control."
      ctas={[
        { label: 'Open the Dashboard →', href: '/dashboard' },
        { label: 'Validate a Niche First', href: '/tool/scorecard' },
      ]}
      points={POINTS}
      related={[
        { label: 'Generate a Roadmap →', href: '/tool/roadmap' },
        { label: 'Back to all tools', href: '/#tools' },
      ]}
    />
  );
}