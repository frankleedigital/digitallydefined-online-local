import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Trash2, X } from 'lucide-react';
import { callSupabaseEdge } from '../lib/supabase-edge';

function StructuredMessage({ msg }) {
  const reply = msg.reply || msg.content || '';
  const nextSteps = Array.isArray(msg.nextSteps) ? msg.nextSteps : [];
  const caution = msg.caution || '';
  const hasStructured = nextSteps.length > 0 || caution;

  return (
    <div className={`chat-widget__message chat-widget__message--assistant`}>
      {reply ? <div className="chat-widget__reply">{reply}</div> : null}
      {hasStructured ? (
        <div className="chat-widget__structured">
          {nextSteps.length > 0 ? (
            <div className="chat-widget__block">
              <div className="chat-widget__block-title">Next steps</div>
              <ol className="chat-widget__list">
                {nextSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          ) : null}
          {caution ? <div className="chat-widget__caution">{caution}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function ChatWidget({ position = 'bottom-right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "I'm your DigitallyDefined guide. Ask about faceless digital real estate, retirement planning, or how to build assets without showing your face."
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!currentMessage?.trim() || loading) return;

    const userMsg = { role: 'user', content: currentMessage.trim() };
    setMessages(prev => [...prev, userMsg]);
    setCurrentMessage('');
    setLoading(true);
    setError(null);

    try {
      const data = await callSupabaseEdge('hermes', {
        message: userMsg.content,
        userId: 'website-user',
        structured: true
      });

      const assistantMessage = {
        role: 'assistant',
        reply: data?.reply || '',
        nextSteps: Array.isArray(data?.nextSteps) ? data.nextSteps : [],
        caution: data?.caution || '',
        content: data?.reply || 'I responded.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment."
      }]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "I'm your DigitallyDefined guide. Ask about faceless digital real estate, retirement planning, or how to build assets without showing your face."
      }
    ]);
    setError(null);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleOpen}
        className="chat-toggle-btn"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-widget__header">
            <div>
              <div className="chat-widget__title">AI Planning Guide</div>
              <div className="chat-widget__subtitle">Faceless Digital Real Estate</div>
            </div>
            <button
              onClick={clearChat}
              className="chat-widget__icon-button"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="chat-widget__messages">
            {messages.map((msg, idx) =>
              msg.role === 'assistant' && (msg.reply || msg.nextSteps || msg.caution) ? (
                <StructuredMessage key={idx} msg={msg} />
              ) : (
                <div
                  key={idx}
                  className={`chat-widget__message chat-widget__message--${msg.role}`}
                >
                  {msg.content}
                </div>
              )
            )}
            {loading && (
              <div className="chat-widget__message chat-widget__message--assistant">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="chat-widget__error">{error}</div>
          )}

          <div className="chat-widget__composer">
            <textarea
              ref={inputRef}
              value={currentMessage}
              onChange={e => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={!currentMessage?.trim() || loading}
              className="chat-widget__send"
              aria-label="Send message"
            >
              {loading ? '...' : <Send size={17} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
