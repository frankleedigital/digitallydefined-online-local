import React from 'react';

/**
 * ErrorBoundary — last-resort guard for the SPA.
 * React 18 clears #root before rendering, so an uncaught render error
 * previously produced a fully blank page. This renders a visible,
 * on-brand fallback (and logs the error) instead.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  /** Clears the error so React re-renders the children from scratch. */
  handleReset = () => {
    this.setState({ error: null });
    if (typeof this.props.onReset === 'function') this.props.onReset();
  };

  render() {
    if (this.state.error) {
      // Scoped variant (e.g. around the quiz): keep the surrounding chrome so
      // the visitor is not dumped back to the launcher mid-flow.
      if (this.props.compact) {
        return (
          <section className="story-section story-section--cream">
            <div className="dd-container">
              <div className="dd-card">
                <p className="label label--orange">Something broke</p>
                <h1 className="dd-heading">We could not load this step.</h1>
                <p style={{ marginTop: '12px' }}>
                  Your answers are still saved in this browser. Try again — if it keeps
                  happening, email us and we will fix it.
                </p>
                <pre
                  style={{
                    marginTop: '16px',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.8rem',
                    background: '#FFFAF5',
                    border: '1px solid #111111',
                    padding: '0.75rem',
                    overflowX: 'auto',
                  }}
                >
                  {String(this.state.error?.message || this.state.error)}
                </pre>
                <div className="action-row" style={{ marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn--primary" onClick={this.handleReset}>
                    Try again
                  </button>
                  <a className="btn btn--outline" href="/">
                    Back to the launcher
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      }

      return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', background: '#FFFCF9', color: '#111111', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          <div style={{ maxWidth: 560, border: '1px solid #111111', boxShadow: '1px 1px 0px rgba(0,0,0,0.08)', padding: '1.5rem', background: '#FFFFFF' }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.5rem', color: '#8B1A0A' }}>
              Something broke
            </p>
            <h1 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 800, letterSpacing: '-0.03em', fontSize: '1.5rem', margin: '0 0 0.75rem' }}>
              This page hit an error.
            </h1>
            <p style={{ lineHeight: 1.6, color: '#5F5F5F', margin: '0 0 1rem' }}>
              Try refreshing the page. If it keeps happening, the details below will help track it down.
            </p>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', background: '#FFFAF5', border: '1px solid rgba(17,17,17,0.08)', padding: '0.75rem', overflowX: 'auto', margin: 0 }}>
              {String((this.state.error && this.state.error.message) || this.state.error)}
            </pre>
            <a
              href="/"
              style={{ display: 'inline-block', marginTop: '1rem', padding: '14px 20px', border: '1px solid #111111', background: '#F18B25', color: '#111111', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Back to the launcher
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;