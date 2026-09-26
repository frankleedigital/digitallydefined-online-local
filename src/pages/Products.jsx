import React from 'react';

export default function Products() {
  return (
    <>
      <section className="page-hero">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow">Digital Products</p>
          <h1 style={{ marginBottom: '1rem' }}>
            Assets That Build Assets
          </h1>
          <p className="hero__tagline" style={{ fontSize: '1.15rem' }}>
            Faceless tools designed for Gen X women building digital freedom.
          </p>
          <div className="action-row"><a href="/tools" className="btn btn--primary">Explore the Free Tools →</a></div>
        </div>
      </section>

      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container container--narrow" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div className="card" style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Faceless Toolbox</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: 600, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Start free with the tools that map your path — then get notified when the paid systems launch.
          </p>
          <div className="grid-3" style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card__heading" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Digital Superpower Quiz</div>
              <p className="card__text" style={{ fontSize: '0.9rem' }}>Find the faceless asset model that fits how you already think.</p>
              <a href="/quiz" className="btn btn--secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Take the Quiz →</a>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card__heading" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Niche Profitability Scorecard</div>
              <p className="card__text" style={{ fontSize: '0.9rem' }}>Test an idea against 6 weighted criteria before you invest.</p>
              <a href="/tools/scorecard" className="btn btn--secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Score a Niche →</a>
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card__heading" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Calculators & Modeling</div>
              <p className="card__text" style={{ fontSize: '0.9rem' }}>Model your retirement gap, freedom number, and 10X ROI.</p>
              <a href="/tools/calculator" className="btn btn--secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Model My Numbers →</a>
            </div>
          </div>
          <a href="/contact" className="btn btn--primary">Get Notified When Paid Systems Launch →</a>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
            Join the waitlist to be first when products launch.
          </p>
          </div>
        </div>
      </section>
    </>
  );
}
