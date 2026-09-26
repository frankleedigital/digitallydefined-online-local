import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  Calculator,
  Layers,
  Wrench,
  Bot
} from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    route: '/',
    title: 'Welcome to DigitallyDefined',
    badge: 'Step 1 of 6 · Overview',
    content:
      'This platform is designed specifically for Gen X women to close the retirement gap by creating faceless digital assets with AI—without camera pressure or tech overwhelm.',
    actionText: 'Explore Quiz →',
    icon: Compass,
  },
  {
    step: 2,
    route: '/quiz',
    title: 'Discover Your Digital Superpower',
    badge: 'Step 2 of 6 · Diagnostic',
    content:
      'Take the 2-minute archetype assessment to find out if you are a Curator, Systems Builder, Template Architect, or Research Synthesizer based on your career experience.',
    actionText: 'Check Retirement Gap →',
    icon: Sparkles,
  },
  {
    step: 3,
    route: '/gap',
    title: 'Model Your Retirement Gap',
    badge: 'Step 3 of 6 · Financial Engine',
    content:
      'See exactly how many micro-digital assets generating $500/mo each are required to replace a $500k+ traditional stock portfolio requirement.',
    actionText: 'See The Framework →',
    icon: Calculator,
  },
  {
    step: 4,
    route: '/framework',
    title: 'The 4-Tier Faceless System',
    badge: 'Step 4 of 6 · System Architecture',
    content:
      'From Niche Validation to AI Creation, 1-Page Funnels, and Automated Distribution—follow a tested, step-by-step roadmap.',
    actionText: 'View Tools Directory →',
    icon: Layers,
  },
  {
    step: 5,
    route: '/tools',
    title: 'Interactive Tools & Calculators',
    badge: 'Step 5 of 6 · Diagnostic Suite',
    content:
      'Access the Niche Profitability Scorecard, 10X ROI Engine, Freedom Number Planner, and AI Automation prompts.',
    actionText: 'Get Started Guide →',
    icon: Wrench,
  },
  {
    step: 6,
    route: '/start-here',
    title: 'Your 3-Step Action Plan',
    badge: 'Step 6 of 6 · Action Plan',
    content:
      'Begin your reinvention today with the 3 practical steps. Hermes, your AI mentor, is here at every turn to guide you.',
    actionText: 'Finish Tour',
    icon: Bot,
  },
];

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const tourDismissed = localStorage.getItem('dd_tour_dismissed');
      const savedStep = localStorage.getItem('dd_tour_step');
      if (!tourDismissed) {
        setIsOpen(true);
        if (savedStep) {
          setCurrentStepIndex(parseInt(savedStep, 10) || 0);
        }
      }
    } catch (err) {
      console.error('Error reading tour state', err);
    }
  }, []);

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      localStorage.setItem('dd_tour_step', nextIndex.toString());
      const nextRoute = TOUR_STEPS[nextIndex].route;
      if (location.pathname !== nextRoute) {
        navigate(nextRoute);
      }
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      localStorage.setItem('dd_tour_step', prevIndex.toString());
      const prevRoute = TOUR_STEPS[prevIndex].route;
      if (location.pathname !== prevRoute) {
        navigate(prevRoute);
      }
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    try {
      localStorage.setItem('dd_tour_dismissed', 'true');
      localStorage.setItem('dd_tour_completed', 'true');
    } catch (err) {
      console.error('Error saving tour completion', err);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      localStorage.setItem('dd_tour_dismissed', 'true');
    } catch (err) {
      console.error('Error saving tour dismissal', err);
    }
  };

  const restartTour = () => {
    setCurrentStepIndex(0);
    localStorage.setItem('dd_tour_step', '0');
    setIsOpen(true);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const step = TOUR_STEPS[currentStepIndex];
  const StepIcon = step.icon;

  return (
    <>
      {/* Floating launcher if closed */}
      {!isOpen && (
        <button
          type="button"
          onClick={restartTour}
          style={{
            position: 'fixed',
            left: '20px',
            bottom: '20px',
            zIndex: 90,
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #1F2937',
            padding: '0.45rem 0.85rem',
            fontSize: '0.75rem',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#1F2937',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: 'none',
          }}
          title="Restart site onboarding walkthrough"
        >
          <Compass size={14} color="#F18B25" />
          <span>Site Walkthrough</span>
        </button>
      )}

      {/* Guided Tour Modal — Thin Frame, Zero Shadow */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(31, 41, 55, 0.45)',
            backdropFilter: 'blur(2px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1F2937',
              maxWidth: '480px',
              width: '100%',
              padding: '1.75rem',
              position: 'relative',
              boxShadow: 'none',
            }}
          >
            {/* Close / Dismiss */}
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280',
                padding: '0.25rem',
              }}
              aria-label="Close tour"
            >
              <X size={20} />
            </button>

            {/* Header: Icon + Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: '#FFF7ED',
                  border: '1.5px solid #F18B25',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StepIcon size={18} color="#F18B25" />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#F18B25',
                    display: 'block',
                  }}
                >
                  {step.badge}
                </span>
                <h3
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.92rem',
                lineHeight: 1.55,
                color: '#4B5563',
                marginBottom: '1.5rem',
              }}
            >
              {step.content}
            </p>

            {/* Progress Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {TOUR_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  style={{
                    flex: 1,
                    height: '4px',
                    backgroundColor: idx <= currentStepIndex ? '#F18B25' : '#E5E7EB',
                    transition: 'background-color 0.2s ease',
                  }}
                />
              ))}
            </div>

            {/* Navigation Buttons (Centered, Thin Frame) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #1F2937',
                  color: currentStepIndex === 0 ? '#9CA3AF' : '#1F2937',
                  padding: '0.6rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentStepIndex === 0 ? 0.5 : 1,
                }}
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#F18B25',
                  border: '1.5px solid #1F2937',
                  color: '#1F2937',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                <span>{step.actionText}</span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
