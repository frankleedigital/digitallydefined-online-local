import React from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { IconMessageCircle } from '../../lib/icons.jsx';

/**
 * SmartTooltip
 * 
 * Context-aware tooltip that appears on calculator inputs.
 * Can optionally trigger Hermes assistance.
 */
export default function SmartTooltip({ 
  label, 
  description, 
  hermesQuestion, 
  position = 'right' 
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div className="smart-tooltip-wrapper">
      <button
        type="button"
        className="smart-tooltip-trigger"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label={`Learn more about ${label}`}
        aria-describedby={`tooltip-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <Lightbulb size={14} />
      </button>
      
      {isVisible && (
        <div 
          id={`tooltip-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className={`smart-tooltip smart-tooltip--${position}`}
          role="tooltip"
        >
          <div className="smart-tooltip__content">
            <p className="smart-tooltip__description">{description}</p>
            
            {hermesQuestion && (
              <button
                className="smart-tooltip__hermes-btn"
                onClick={() => {
                  // Dispatch custom event for parent to handle
                  window.dispatchEvent(new CustomEvent('hermes-ask', { 
                    detail: { question: hermesQuestion } 
                  }));
                  setIsVisible(false);
                }}
              >
                <IconMessageCircle size="xs" />
                Ask Hermes about this
              </button>
            )}
          </div>
          <div className="smart-tooltip__arrow"></div>
        </div>
      )}
      
      <style jsx>{`
        .smart-tooltip-wrapper {
          position: relative;
          display: inline-block;
          margin-left: 0.5rem;
        }
        
        .smart-tooltip-trigger {
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
        }
        
        .smart-tooltip-trigger:hover {
          color: var(--color-accent);
        }
        
        .smart-tooltip {
          position: absolute;
          z-index: 100;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          max-width: 280px;
          font-size: 0.875rem;
          line-height: 1.5;
          animation: tooltipFadeIn 0.2s ease-out;
        }
        
        .smart-tooltip--right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        }
        
        .smart-tooltip--top {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        }
        
        .smart-tooltip__content {
          color: var(--color-text-muted);
        }
        
        .smart-tooltip__description {
          margin: 0 0 0.75rem 0;
        }
        
        .smart-tooltip__hermes-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 0.375rem 0.625rem;
          font-size: 0.75rem;
          color: var(--color-accent);
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .smart-tooltip__hermes-btn:hover {
          background: var(--color-bg);
          border-color: var(--color-border);
        }
        
        .smart-tooltip__arrow {
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }
        
        .smart-tooltip--right .smart-tooltip__arrow {
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 6px 6px 0;
          border-color: transparent #fff transparent transparent;
        }
        
        .smart-tooltip--top .smart-tooltip__arrow {
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 6px 6px;
          border-color: transparent transparent #fff;
        }
        
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
