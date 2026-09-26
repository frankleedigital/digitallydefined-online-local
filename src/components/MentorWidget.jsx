import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Send, Trash2, X, Code, FileText, AlertTriangle } from 'lucide-react';
import useMentor from '../hooks/useMentor';
import useHermesStatus from '../hooks/useHermesStatus';
import { onHermesTyping } from '../lib/hermes.js';

const IDLE_TIMEOUT_MS = 25000;
const SCROLL_HIDE_THRESHOLD = 320;

export default function MentorWidget({ topic = 'default', systemPrompt, toolState, autoOpenCount = 0 }) {
  const {
    messages,
    loading,
    error,
    isOpen,
    devMode,
    messagesEndRef,
    sendMessage,
    clearChat,
    toggleOpen,
    setIsOpen
  } = useMentor(topic, { systemPrompt, toolState });

  const { online, checking } = useHermesStatus();

  const [inputValue, setInputValue] = useState('');
  const [isHermesTyping, setIsHermesTyping] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showIdlePopup, setShowIdlePopup] = useState(false);
  const inputRef = useRef(null);
  const lastScrollY = useRef(0);
  const isOpenRef = useRef(false);
  const idleTimer = useRef(null);
  const idleDismissed = useRef(false);

  isOpenRef.current = isOpen;

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  /* Auto-open when triggered by inactivity or tool events */
  useEffect(() => {
    if (autoOpenCount > 0) {
      idleDismissed.current = true;
      setIsOpen(true);
    }
  }, [autoOpenCount, setIsOpen]);

  /* Hermes typing indicator */
  useEffect(() => {
    onHermesTyping((state) => setIsHermesTyping(state));
  }, []);

  /* Floating presence — fade the toggle out while scrolling down, back in while scrolling up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nextHidden = y > SCROLL_HIDE_THRESHOLD && y > lastScrollY.current && !isOpenRef.current;
      setHiddenByScroll(nextHidden);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Idle detection — after IDLE_TIMEOUT_MS without activity the "Need help?" popup can appear */
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    const events = ['scroll', 'mousemove', 'keydown', 'click', 'touchstart'];
    const onActivity = () => {
      setIsIdle(false);
      resetIdleTimer();
    };
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    resetIdleTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    if (isIdle && online && !isOpen && !idleDismissed.current) {
      setShowIdlePopup(true);
    } else {
      setShowIdlePopup(false);
    }
  }, [isIdle, online, isOpen]);

  const dismissIdle = () => {
    idleDismissed.current = true;
    setShowIdlePopup(false);
    setIsIdle(false);
    resetIdleTimer();
  };

  const openFromIdle = () => {
    idleDismissed.current = true;
    setShowIdlePopup(false);
    setIsIdle(false);
    resetIdleTimer();
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;
    const msg = inputValue.trim();
    setInputValue('');
    await sendMessage(msg);
  };

  const statusTitle = checking ? 'Checking connection' : online ? 'Hermes is online' : 'Hermes is offline';

  return (
    <>
      {/* Floating presence pill (visible while scrolling up, widget closed, Hermes online) */}
      {!isOpen && !hiddenByScroll && online && (
        <button
          type="button"
          className="mentor-presence-pill"
          onClick={toggleOpen}
          aria-label="Open Hermes mentor"
        >
          <span className="mentor-status-dot mentor-status-dot--online" />
          <span>Hermes is here</span>
        </button>
      )}

      {/* Idle-timeout popup */}
      {showIdlePopup && (
        <div className="mentor-idle-popup" role="dialog" aria-live="polite">
          <button
            type="button"
            className="mentor-idle-popup__dismiss"
            onClick={dismissIdle}
            aria-label="Dismiss"
          >
            ×
          </button>
          <div className="mentor-idle-popup__content">
            <span className="mentor-status-dot mentor-status-dot--online" />
            <div>
              <p className="mentor-idle-popup__title">Need help?</p>
              <p className="mentor-idle-popup__sub">
                Hermes is online. Ask about your retirement gap or digital assets.
              </p>
            </div>
          </div>
          <button type="button" className="mentor-idle-popup__open" onClick={openFromIdle}>
            Chat with Hermes →
          </button>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className={`mentor-toggle-btn ${hiddenByScroll ? 'mentor-toggle-btn--hidden' : ''}`}
        aria-label={isOpen ? 'Close Hermes mentor' : 'Open Hermes mentor'}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        {!isOpen && <span className="mentor-toggle-btn__bubble">Hermes</span>}
        <span
          className={`mentor-status-dot mentor-status-dot--toggle ${
            online ? 'mentor-status-dot--online' : 'mentor-status-dot--offline'
          }`}
          title={statusTitle}
        />
      </button>

      {/* Widget */}
      {isOpen && (
        <div className="mentor-widget">
          {/* Header */}
          <div className="mentor-widget__header">
            <div className="mentor-widget__heading">
              <div className="mentor-widget__title">Hermes</div>
              <div className="mentor-widget__status">
                <span
                  className={`mentor-status-dot ${
                    online ? 'mentor-status-dot--online' : 'mentor-status-dot--offline'
                  }`}
                />
                {checking ? 'Checking connection…' : online ? 'AI Mentor · Online' : 'AI Mentor · Offline'}
              </div>
            </div>

            <div className="mentor-widget__header-actions">
              {devMode && (
                <span className="mentor-widget__dev-badge">
                  DEV MODE
                </span>
              )}
              <button
                onClick={clearChat}
                className="mentor-widget__icon-button"
                title="Clear chat"
                aria-label="Clear chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="mentor-widget__messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mentor-widget__message mentor-widget__message--${msg.role}`}
              >
                {/* Dev Guidance Label */}
                {msg.isDevGuidance && (
                  <div className="mentor-widget__dev-notice">
                    <AlertTriangle size={14} />
                    <span>Developer Guidance</span>
                  </div>
                )}

                {/* Main Message */}
                <div className="mentor-widget__message-content">
                  {msg.content}
                </div>

                {/* Structured non-dev response block */}
                {!msg.isDevGuidance && (msg.nextSteps || msg.caution) && (
                  <div className="mentor-widget__structured">
                    {Array.isArray(msg.nextSteps) && msg.nextSteps.length > 0 && (
                      <div className="mentor-widget__block">
                        <div className="mentor-widget__block-title">Next steps</div>
                        <ol className="mentor-widget__list">
                          {msg.nextSteps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {msg.caution && <div className="mentor-widget__caution">{msg.caution}</div>}
                  </div>
                )}

                {/* Optional Dev Blocks */}
                {(msg.filePath || msg.codeSnippet || msg.exactChange) && (
                  <div className="mentor-widget__dev-block">
                    {msg.filePath && (
                      <div className="mentor-widget__dev-label">
                        <FileText size={14} />
                        <span>{msg.filePath}</span>
                      </div>
                    )}

                    {msg.codeSnippet && (
                      <pre className="mentor-widget__code">
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    )}

                    {msg.exactChange && (
                      <div className="mentor-widget__change">
                        <Code size={14} />
                        <span>{msg.exactChange}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {(isHermesTyping || loading) && (
              <div className="hermes-typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                Hermes is thinking…
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="mentor-widget__error">{error}</div>
          )}

          {/* Composer */}
          <form className="mentor-widget__composer" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask Hermes anything..."
              disabled={loading}
              rows={2}
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="mentor-widget__send"
              aria-label="Send message"
            >
              {loading ? '...' : <Send size={17} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
