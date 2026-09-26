import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Calculator,
  Target,
  Layers,
  Wrench,
  CheckCircle2,
  Eye,
} from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Welcome to DigitallyDefined',
    subtitle: 'The Faceless Digital Wealth System for Gen X Women',
    route: '/',
    desc: 'We help you bridge the retirement gap by transforming your decades of career experience into automated, faceless digital assets without appearing on video.',
    icon: Compass,
    actionText: 'Explore The Platform',
  },
  {
    step: 2,
    title: 'Discover Your Superpower',
    subtitle: '2-Minute Creator Archetype Diagnostic',
    route: '/quiz',
    desc: 'Identify whether you are a Content Architect, Curator, Systems Builder, or Template Designer, and unlock your personalized asset launch blueprint.',
    icon: Sparkles,
    actionText: 'Take The Quiz',
  },
  {
    step: 3,
    title: 'Retirement Gap Calculator',
    subtitle: 'Model Your Freedom Number',
    route: '/gap',
    desc: 'Calculate the exact number of $500/mo faceless digital assets needed to replace corporate salary and eliminate retirement shortfall.',
    icon: Calculator,
    actionText: 'Calculate Gap',
  },
  {
    step: 4,
    title: 'The 4-Tier Framework',
    subtitle: 'Niche, Build, Distribute, Scale',
    route: '/framework',
    desc: 'Understand the end-to-end architecture: how to package, automate, and stack multiple digital assets with zero public identity exposure.',
    icon: Layers,
    actionText: 'View The Framework',
  },
  {
    step: 5,
    title: 'The Tools & Agents Hub',
    subtitle: 'Calculators, Scorecards & Automations',
    route: '/tools',
    desc: 'Access our complete diagnostic suite including Niche Profitability Scorecard, 10X ROI Engine, and Freedom Number calculators.',
    icon: Wrench,
    actionText: 'Explore Tools Suite',
  },
  {
    step: 6,
    title: 'Your 4-Step Action Path',
    subtitle: 'Start Your Digital Reinvention',
    route: '/start-here',
    desc: 'Follow the guided sequence to launch your first digital product in 30 days. You are not behind — you are early in the AI shift.',
    icon: CheckCircle2,
    actionText: 'Go to Action Plan',
  },
];

export default function OnboardingTour() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem('dd_onboarding_completed');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('dd_onboarding_completed', 'true');
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      navigate(TOUR_STEPS[nextIdx].route);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      navigate(TOUR_STEPS[prevIdx].route);
    }
  };

  const handleStepJump = (idx) => {
    setCurrentStep(idx);
    navigate(TOUR_STEPS[idx].route);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 9999,
          backgroundColor: '#1F2937',
          color: '#FFFFFF',
          border: '2px solid #F18B25',
          padding: '0.6rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: 'pointer',
          boxShadow: '4px 4px 0 0 #F18B25',
        }}
      >
        <Compass size={14} color="#F18B25" />
        <span>Site Walkthrough</span>
      </button>
    );
  }

  const active = TOUR_STEPS[currentStep];
  const StepIcon = active.icon;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(31, 41, 55, 0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 10000,
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
          width: '100%',
          maxWidth: '540px',
          boxShadow: '8px 8px 0 0 #1F2937',
          padding: '2rem',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
          }}
        >
          <X size={20} />
        </button>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleStepJump(idx)}
              style={{
                height: '6px',
                flex: 1,
                backgroundColor: idx === currentStep ? '#F18B25' : idx < currentStep ? '#1F2937' : '#E5E7EB',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>

        {/* Icon & Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#FFFCF9',
              border: '1.5px solid #1F2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StepIcon size={16} color="#F18B25" />
          </div>

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#F18B25',
              letterSpacing: '0.1em',
            }}
          >
            Step {active.step} of {TOUR_STEPS.length}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#1F2937',
            margin: '0 0 0.35rem',
            lineHeight: 1.2,
          }}
        >
          {active.title}
        </h2>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#6B7280',
            marginBottom: '1rem',
          }}
        >
          {active.subtitle}
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.92rem',
            lineHeight: 1.6,
            color: '#4B5563',
            marginBottom: '2rem',
          }}
        >
          {active.desc}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.7rem 1.1rem',
              backgroundColor: '#FFFCF9',
              color: currentStep === 0 ? '#9CA3AF' : '#1F2937',
              border: '2px solid #1F2937',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 0 ? 0.5 : 1,
            }}
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.75rem 1.4rem',
              backgroundColor: '#F18B25',
              color: '#1F2937',
              border: '2px solid #1F2937',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '3px 3px 0 0 #1F2937',
            }}
          >
            <span>{currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : active.actionText}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
