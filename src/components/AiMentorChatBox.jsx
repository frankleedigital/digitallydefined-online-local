import React, { useState, useRef, useEffect } from 'react';
import { sendToHermes } from '../lib/hermes';

const GREETING = "I'm here to help you analyze your niche.";

function StructuredMessage({ msg }) {
  const reply = msg.reply || msg.content || '';
  const nextSteps = Array.isArray(msg.nextSteps) ? msg.nextSteps : [];
  const caution = msg.caution || '';
  const hasStructured = nextSteps.length > 0 || caution;

  return (
    <div className="ai-mentor-box__message ai-mentor-box__message--assistant">
      {reply ? <div className="ai-mentor-box__reply">{reply}</div> : null}
      {hasStructured ? (
        <div className="ai-mentor-box__structured">
          {nextSteps.length > 0 ? (
            <div className="ai-mentor-box__block">
              <div className="ai-mentor-box__block-title">Next steps</div>
              <ol className="ai-mentor-box__list">
                {nextSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          ) : null}
          {caution ? <div className="ai-mentor-box__caution">{caution}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function AiMentorChatBox() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const response = await sendToHermes(text, { topic: 'scorecard', page: 'scorecard', structured: true });
      const assistantMessage = {
        role: 'assistant',
        reply: response.reply || '',
        nextSteps: Array.isArray(response.nextSteps) ? response.nextSteps : [],
        caution: response.caution || '',
        content: response.reply || 'I processed your request.',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Mentor error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-mentor-box">
      <header className="ai-mentor-box__header">
        <span className="ai-mentor-box__avatar" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H9.2L5 18.8v-3.3H6.5A2.5 2.5 0 0 1 4 13V5.5Z"
              fill="var(--color-accent)"
            />
            <circle cx="8.5" cy="9" r="1" fill="#FFFFFF" />
            <circle cx="12" cy="9" r="1" fill="#FFFFFF" />
            <circle cx="15.5" cy="9" r="1" fill="#FFFFFF" />
          </svg>
        </span>
        <div className="ai-mentor-box__heading">
          <div className="ai-mentor-box__title-row">
            <span className="ai-mentor-box__title">AI Mentor</span>
            <span className="ai-mentor-box__dot" title="Active" aria-hidden="true" />
          </div>
          <span className="ai-mentor-box__status">Active</span>
        </div>
      </header>

      <div className="ai-mentor-box__messages" aria-live="polite">
        {messages.map((msg, idx) =>
          msg.role === 'assistant' && (msg.reply || msg.nextSteps || msg.caution) ? (
            <StructuredMessage key={idx} msg={msg} />
          ) : (
            <div
              key={idx}
              className={`ai-mentor-box__message ai-mentor-box__message--${msg.role}`}
            >
              {msg.content}
            </div>
          )
        )}
        {loading && (
          <div className="ai-mentor-box__typing">AI Mentor is thinking…</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="ai-mentor-box__composer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI Mentor about your niche…"
          aria-label="Ask the AI Mentor"
        />
        <button
          type="submit"
          className="btn btn--primary"
          style={{ width: '100%' }}
          disabled={!input.trim() || loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
