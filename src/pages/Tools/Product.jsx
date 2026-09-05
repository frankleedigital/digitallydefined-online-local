import React from 'react';
import ToolShell from './ToolShell';

/**
 * /tool/product — Digital Product Builder
 * Lightweight CRO page. Routes to the AI Business Partner (dashboard) for
 * done-for-you product generation and to the roadmap for the build path.
 */
const POINTS = [
  { title: 'Package what you know', body: 'Turn a niche you understand into a sellable lead magnet, guide, or template — no face required.' },
  { title: 'Start small, ship fast', body: 'One focused product beats a sprawling course. Validate demand before you build everything.' },
  { title: 'Automate delivery', body: 'Your AI Business Partner helps you structure, draft, and set up automated delivery.' },
];

export default function Product() {
  return (
    <ToolShell
      eyebrow="Product Builder"
      title="Turn expertise into a product someone will pay for."
      tagline="Package a single problem you can solve into a sellable digital asset — then let the system handle the busywork."
      ctas={[
        { label: 'Generate with the AI Business Partner →', href: '/dashboard' },
        { label: 'Start with a Roadmap', href: '/tool/roadmap' },
      ]}
      points={POINTS}
      related={[
        { label: 'Find a niche first →', href: '/tool/niche' },
        { label: 'Back to all tools', href: '/#tools' },
      ]}
    />
  );
}