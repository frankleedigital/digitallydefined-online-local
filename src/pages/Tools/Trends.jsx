import React from 'react';
import ToolShell from './ToolShell';

/**
 * /tool/trends — Trend Scanner
 * Lightweight CRO page. No dedicated backend agent; routes builders to the
 * AI Business Partner (dashboard) and the Niche Scorecard, which is the
 * real validation surface for any niche trend signal.
 */
const POINTS = [
  { title: 'See what is rising', body: 'Spot which niches and topics are gaining demand before they get crowded or saturated.' },
  { title: 'Validate, do not guess', body: 'Trends are only a starting signal — score the niche to confirm privacy fit, ease, and monetization.' },
  { title: 'Move with a plan', body: 'Your roadmap turns a hot signal into a concrete first asset instead of another idea to sit on.' },
];

export default function Trends() {
  return (
    <ToolShell
      eyebrow="AI-Assisted Trend Scanner"
      title="Find the wave. Then build before it peaks."
      tagline="A quick look at which niches are heating up — plus the exact tool to validate one before you invest time."
      ctas={[
        { label: 'Score a Niche Idea →', href: '/tool/scorecard' },
        { label: 'Ask the AI Business Partner', href: '/dashboard' },
      ]}
      points={POINTS}
      related={[
        { label: 'Generate a Roadmap →', href: '/tool/roadmap' },
        { label: 'Back to all tools', href: '/#tools' },
      ]}
    />
  );
}