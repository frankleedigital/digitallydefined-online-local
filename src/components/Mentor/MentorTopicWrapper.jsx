import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { sendToHermes } from '../../lib/hermes';
import { useToolState } from '../../context/ToolStateContext.jsx';
import {
  buildGapPrompt,
  buildFreedomPrompt,
  buildQuizPrompt,
  buildScorecardPrompt,
  buildROIPrompt,
  buildToolsPrompt,
  buildPricingPrompt,
  buildAutomationPrompt,
  buildContactPrompt,
  buildRoadmapPrompt
} from '../../lib/buildHermesPrompt';

const CALCULATOR_ROUTES = ['/roi', '/freedom', '/gap', '/scorecard', '/tools/calculator'];

function MentorTopicWrapper({ topic, children }) {
  const { toolState, updateToolState } = useToolState();
  const location = useLocation();
  const isCalculatorRoute = CALCULATOR_ROUTES.some(route =>
    location.pathname.startsWith(route)
  );
  const wasCalculated = useRef(false);

  /* -------------------------------------------------------
     Build enriched system prompt (Hermes v2)
  -------------------------------------------------------- */
  const systemPrompt = (() => {
    switch (topic) {
      case 'retirement-gap':
        return buildGapPrompt(toolState);
      case 'freedom':
        return buildFreedomPrompt(toolState);
      case 'quiz':
        return buildQuizPrompt(toolState);
      case 'scorecard':
        return buildScorecardPrompt(toolState);
      case 'roi':
        return buildROIPrompt(toolState);
      case 'tools':
        return buildToolsPrompt();
      case 'pricing':
        return buildPricingPrompt();
      case 'automation':
        return buildAutomationPrompt();
      case 'contact':
        return buildContactPrompt();
      case 'roadmap':
        return buildRoadmapPrompt(toolState);
      default:
        return null;
    }
  })();

  /* -------------------------------------------------------
     Reactive Hermes trigger (auto-open after calculation)
  -------------------------------------------------------- */
  useEffect(() => {
    if (!isCalculatorRoute) return;

    if (!toolState?.hasCalculated) {
      wasCalculated.current = false;
      return;
    }

    if (wasCalculated.current) return;
    wasCalculated.current = true;

    let hermesTopic = null;
    let payload = {};

    if (toolState.gapAmount !== undefined) {
      hermesTopic = 'retirement-gap';
      payload = {
        gapAmount: toolState.gapAmount,
        monthlyNeededToClose: toolState.monthlyNeededToClose,
        desiredIncome: toolState.desiredIncome,
        currentSavings: toolState.currentSavings,
        yearsToRetirement: toolState.yearsToRetirement,
        totalMonthlyIncome: toolState.totalMonthlyIncome,
      };
      updateToolState({ stage: 'gap_calculated', lastAction: 'gap_calculated' });
    }

    if (toolState.monthlyGoal !== undefined) {
      hermesTopic = 'freedom';
      payload = {
        monthlyGoal: toolState.monthlyGoal,
        totalMonthlyIncome: toolState.totalMonthlyIncome,
        assetCount: toolState.assetCount,
        yieldPerAsset: toolState.yieldPerAsset,
        gap: toolState.gap,
        goalMet: toolState.goalMet,
      };
      updateToolState({ stage: 'freedom_calculated', lastAction: 'freedom_calculated' });
    }

    if (toolState.roiClosedLeads !== undefined) {
      hermesTopic = 'roi';
      payload = {
        roiClosedLeads: toolState.roiClosedLeads,
        roiGrossRevenue: toolState.roiGrossRevenue,
        roiMonthlyRent: toolState.roiMonthlyRent,
        roiEquityCap: toolState.roiEquityCap,
        roiPpcSpend: toolState.roiPpcSpend,
        roiSavings: toolState.roiSavings,
      };
      updateToolState({ stage: 'roi_calculated', lastAction: 'roi_calculated' });
    }

    if (toolState.nicheScore !== undefined) {
      hermesTopic = 'scorecard';
      payload = {
        score: toolState.nicheScore,
        category: toolState.nicheCategory,
        inputs: toolState.nicheInputs,
      };
      updateToolState({ stage: 'scorecard_calculated', lastAction: 'scorecard_calculated' });
    }

    if (hermesTopic) {
      sendToHermes("auto", {
        topic: hermesTopic,
        systemPrompt,
        context: {
          ...toolState,
          ...payload,
          page: hermesTopic,
          stage: toolState.stage,
          lastAction: toolState.lastAction
        }
      }).catch(err => {
        console.error('Reactive Hermes trigger failed:', err);
      });
    }
  }, [toolState, isCalculatorRoute]);

  return (
    <>
      {children}
    </>
  );
}

export default MentorTopicWrapper;
