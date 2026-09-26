import React, { useState, useEffect } from 'react';

/**
 * HermesInterventionModal
 * 
 * Displays proactive intervention messages from Hermes with:
 * - Context-aware messaging
 * - Quick action buttons
 * - Option to open full chat or dismiss
 */

export default function HermesInterventionModal({ 
  intervention, 
  onOpenChat, 
  onDismiss,
  onNextStep 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (intervention) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [intervention]);

  if (!isVisible || !intervention) return null;

  const getTypeConfig = (type) => {
    switch (type) {
      case 'hesitation':
        return {
          icon: '💡',
          title: 'Need a hand?',
          urgency: 'low'
        };
      case 'frustration':
        return {
          icon: '🤔',
          title: 'Let me explain',
          urgency: 'medium'
        };
      case 'result_concern':
        return {
          icon: '📊',
          title: 'Important insights',
          urgency: 'high'
        };
      case 'exit_intent':
        return {
          icon: '⏸️',
          title: 'Before you go',
          urgency: 'high'
        };
      default:
        return {
          icon: '🤖',
          title: 'Hermes is here',
          urgency: 'medium'
        };
    }
  };

  const config = getTypeConfig(intervention.type);

  return (
    <div 
      className={`hermes-intervention-modal ${isAnimating ? 'hermes-intervention-modal--visible' : ''}`}
      role="dialog"
      aria-live="polite"
      aria-labelledby="intervention-title"
    >
      <div className="hermes-intervention-modal__overlay" onClick={onDismiss} />
      
      <div className="hermes-intervention-modal__content">
        <button 
          className="hermes-intervention-modal__close"
          onClick={onDismiss}
          aria-label="Close"
        >
          ×
        </button>

        <div className="hermes-intervention-modal__header">
          <span className="hermes-intervention-modal__icon">{config.icon}</span>
          <h3 id="intervention-title" className="hermes-intervention-modal__title">
            {config.title}
          </h3>
        </div>

        <div className="hermes-intervention-modal__body">
          <p className="hermes-intervention-modal__message">
            {intervention.message}
          </p>

          {intervention.context?.resultData && (
            <div className="hermes-intervention-modal__results">
              <h4>Your Results:</h4>
              <ul>
                {intervention.context.resultData.gap && (
                  <li>
                    <strong>Retirement Gap:</strong> ${intervention.context.resultData.gap.toLocaleString()}
                  </li>
                )}
                {intervention.context.resultData.score && (
                  <li>
                    <strong>Niche Score:</strong> {intervention.context.resultData.score}/100
                  </li>
                )}
                {intervention.context.resultData.monthlyGoal && (
                  <li>
                    <strong>Freedom Goal:</strong> ${intervention.context.resultData.monthlyGoal.toLocaleString()}/mo
                  </li>
                )}
                {intervention.context.resultData.totalMonthlyIncome !== undefined && (
                  <li>
                    <strong>Current Income:</strong> ${intervention.context.resultData.totalMonthlyIncome.toLocaleString()}/mo
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="hermes-intervention-modal__actions">
          <button
            className="btn btn--secondary"
            style={{ ...brutalButtonOutline }}
            onClick={onDismiss}
          >
            Not now
          </button>

          {onNextStep && (
            <button
              style={{ ...brutalButtonOutline }}
              onClick={onNextStep}
            >
              Show next step →
            </button>
          )}

          <button
            style={{ ...brutalButtonPrimary }}
            onClick={onOpenChat}
          >
            Chat with Hermes →
          </button>
        </div>

        {config.urgency === 'high' && (
          <div className="hermes-intervention-modal__urgency-indicator">
            <span className="urgency-dot urgency-dot--high"></span>
            <span>Priority guidance available</span>
          </div>
        )}
      </div>
    </div>
  );
}
