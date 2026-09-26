import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Target, Users, Lightbulb } from 'lucide-react';
import { IconMessageCircle } from '../../lib/icons.jsx';
import { theme, brutalBorder, brutalCard, brutalHeading, brutalButtonPrimary, brutalButtonOutline } from '../../config/theme';

/**
 * NextStepRecommendation
 * 
 * Displays personalized next-step recommendations after tool completion.
 * Integrates with Hermes for AI-powered guidance.
 */
export default function NextStepRecommendation({ 
  toolType, 
  results, 
  onNavigate,
  onAskHermes 
}) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (results && toolType) {
      generateRecommendation(toolType, results);
    }
  }, [toolType, results]);
  
  const generateRecommendation = async (type, data) => {
    setLoading(true);
    
    // Generate context-aware recommendation
    let rec = null;
    
    switch (type) {
      case 'retirement_gap':
        rec = getRetirementGapRec(data);
        break;
      case 'freedom_number':
        rec = getFreedomNumberRec(data);
        break;
      case 'niche_scorecard':
        rec = getNicheScorecardRec(data);
        break;
      case 'tenx_roi':
        rec = getTenXROIRec(data);
        break;
      default:
        rec = getDefaultRec();
    }
    
    setRecommendation(rec);
    setLoading(false);
  };
  
  const getRetirementGapRec = (data) => {
    const gap = data.gap || 0;
    
    if (gap === 0) {
      return {
        title: "You're on track!",
        description: "Your retirement planning looks solid. Consider optimizing your investment strategy or exploring additional income streams.",
        primaryAction: {
          label: "Explore Investment Strategies",
          href: "/tools/roi-calculator",
          icon: TrendingUp
        },
        secondaryAction: {
          label: "Ask Hermes for optimization tips",
          hermes: true
        }
      };
    }
    
    if (gap < 50000) {
      return {
        title: "Small gap, big opportunity",
        description: "You're close to closing your retirement gap. A single well-chosen digital asset could make up the difference.",
        primaryAction: {
          label: "Calculate Your Freedom Number",
          href: "/tools/freedom-calculator",
          icon: Target
        },
        secondaryAction: {
          label: "See how others closed similar gaps",
          hermes: true
        }
      };
    }
    
    return {
      title: "Let's create a plan",
      description: `Your $${gap.toLocaleString()} gap is addressable with the right strategy. Most users close this gap within 18-36 months using digital assets.`,
      primaryAction: {
        label: "Build Your Action Plan",
        href: "/tools/roadmap-generator",
        icon: ArrowRight
      },
      secondaryAction: {
        label: "Chat with Hermes about your options",
        hermes: true
      }
    };
  };
  
  const getFreedomNumberRec = (data) => {
    const goalMet = data.goalMet;
    const gap = data.gap || 0;
    
    if (goalMet) {
      return {
        title: "Congratulations!",
        description: "You've reached your freedom number! Now it's time to protect and scale your assets.",
        primaryAction: {
          label: "Learn Asset Protection Strategies",
          href: "/pillar-pages/digital-assets",
          icon: Target
        },
        secondaryAction: {
          label: "Ask Hermes about scaling strategies",
          hermes: true
        }
      };
    }
    
    if (gap < 2000) {
      return {
        title: "So close!",
        description: `You're just $${gap.toLocaleString()}/month away from your freedom number. One additional asset could get you there.`,
        primaryAction: {
          label: "Discover Your Best Asset Type",
          href: "/tools/niche-discovery",
          icon: Lightbulb
        },
        secondaryAction: {
          label: "Get personalized asset recommendations",
          hermes: true
        }
      };
    }
    
    return {
      title: "Let's bridge the gap",
      description: `Your freedom number is achievable. Based on your current setup, adding ${Math.ceil(gap / 3000)} more assets could get you to your goal.`,
      primaryAction: {
        label: "Find Your Next Profitable Niche",
        href: "/tools/niche-discovery",
        icon: ArrowRight
      },
      secondaryAction: {
        label: "Discuss your asset strategy with Hermes",
        hermes: true
      }
    };
  };
  
  const getNicheScorecardRec = (data) => {
    const score = data.score || 0;
    
    if (score >= 70) {
      return {
        title: "Strong potential detected!",
        description: `Your niche scored ${score}/100. This is in the top tier. Time to validate and build!`,
        primaryAction: {
          label: "Calculate ROI Potential",
          href: "/tools/roi-calculator",
          icon: TrendingUp
        },
        secondaryAction: {
          label: "Ask Hermes about validation strategies",
          hermes: true
        }
      };
    }
    
    if (score >= 50) {
      return {
        title: "Moderate potential",
        description: `Your niche scored ${score}/100. There's promise here, but consider optimizing weak areas before building.`,
        primaryAction: {
          label: "Reassess with Adjusted Parameters",
          action: 'retry',
          icon: Target
        },
        secondaryAction: {
          label: "Get Hermes' take on improving your score",
          hermes: true
        }
      };
    }
    
    return {
      title: "Consider alternatives",
      description: `Your niche scored ${score}/100. This doesn't mean failure—it means this idea might need refinement or it's time to explore other opportunities.`,
      primaryAction: {
        label: "Discover Better-Matched Niches",
        href: "/tools/niche-discovery",
        icon: ArrowRight
      },
      secondaryAction: {
        label: "Ask Hermes for niche improvement tips",
        hermes: true
      }
    };
  };
  
  const getTenXROIRec = (data) => {
    const roi = data.roi || 0;
    
    if (roi >= 10) {
      return {
        title: "Excellent ROI!",
        description: `Your ${roi}X ROI is outstanding. This business model has strong fundamentals.`,
        primaryAction: {
          label: "Plan Your Scaling Strategy",
          href: "/tools/roadmap-generator",
          icon: TrendingUp
        },
        secondaryAction: {
          label: "Ask Hermes about scaling tactics",
          hermes: true
        }
      };
    }
    
    return {
      title: "Optimization opportunity",
      description: `Your ${roi}X ROI shows potential. Let's identify leverage points to improve returns.`,
      primaryAction: {
        label: "Explore Optimization Strategies",
        href: "/pillar-pages/automation",
        icon: Target
      },
      secondaryAction: {
        label: "Get Hermes' optimization analysis",
        hermes: true
      }
    };
  };
  
  const getDefaultRec = () => ({
    title: "What's next?",
    description: "You've gathered valuable insights. Let's turn them into action.",
    primaryAction: {
      label: "Explore More Tools",
      href: "/tools",
      icon: ArrowRight
    },
    secondaryAction: {
      label: "Ask Hermes what to do next",
      hermes: true
    }
  });
  
  if (loading || !recommendation) {
    return (
      <div style={{ ...brutalCard, padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: theme.fonts.body, color: theme.colors.textMuted }}>Generating your personalized next step...</p>
      </div>
    );
  }

  return (
    <section style={{ ...brutalCard, padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h3 style={{ ...brutalHeading, fontSize: '1.5rem', marginBottom: '0.75rem' }}>{recommendation.title}</h3>
        <p style={{ fontFamily: theme.fonts.body, fontSize: '1rem', lineHeight: 1.6, color: theme.colors.textMuted, margin: '0 auto 1.5rem' }}>
          {recommendation.description}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {recommendation.primaryAction && (
          <a
            href={recommendation.primaryAction.href}
            style={{ ...brutalButtonPrimary, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontFamily: theme.fonts.body }}
            onClick={(e) => {
              if (recommendation.primaryAction.action === 'retry') {
                e.preventDefault();
                window.location.reload();
              } else if (onNavigate) {
                e.preventDefault();
                onNavigate(recommendation.primaryAction.href);
              }
            }}
          >
            {recommendation.primaryAction.icon && (
              <recommendation.primaryAction.icon size={18} />
            )}
            {recommendation.primaryAction.label}
          </a>
        )}
        {recommendation.secondaryAction && (
          <button
            style={{ ...brutalButtonOutline, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontFamily: theme.fonts.body }}
            onClick={() => {
              if (recommendation.secondaryAction.hermes && onAskHermes) {
                onAskHermes(recommendation.secondaryAction.label);
              }
            }}
          >
            <IconMessageCircle size="md" />
            {recommendation.secondaryAction.label}
          </button>
        )}
      </div>
    </section>
  );
}
