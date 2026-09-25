import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomeUnified';
import Quiz from './pages/Quiz/DigitalSuperpowerQuizUnified';
import NicheDiscovery from './pages/Tools/NicheDiscovery';
import RoadmapGenerator from './pages/Tools/RoadmapGenerator';
import WealthCalculator from './pages/Calculator/TenXROICalculatorUnified';
import FreedomCalculator from './pages/Calculator/FreedomNumberCalculatorUnified';
import RetirementGapCalculator from './pages/Calculator/RetirementGapCalculatorUnified';
import Scorecard from './pages/Scorecard/NicheProfitabilityScorecardUnified';
import About from './pages/AboutUnified';
import Contact from './pages/ContactUnified';
import Tools from './pages/ToolsUnified';
import Automation from './pages/AutomationUnified';
import ComingSoon from './pages/ComingSoonUnified';
import Products from './pages/ProductsUnified';
import Pricing from './pages/PricingUnified';
import MentorTopicWrapper from './components/Mentor/MentorTopicWrapper.jsx';
import ScrollProgress from './components/ScrollProgress';
import Layout from './components/Layout/SiteLayout';
import OnboardingTour from './components/OnboardingTour';

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}

function App() {
  return (
    <>
      <ScrollProgress />
      <OnboardingTour />
      <Layout>
        <Routes>
          {/* Main Flow */}
          <Route path="/" element={<MentorTopicWrapper topic="home"><Home /></MentorTopicWrapper>} />
          <Route path="/automation" element={<MentorTopicWrapper topic="automation"><Automation /></MentorTopicWrapper>} />

          {/* Quiz Flow */}
          <Route path="/quiz" element={<MentorTopicWrapper topic="quiz"><Quiz /></MentorTopicWrapper>} />

          {/* Tools Flow */}
          <Route path="/tools" element={<MentorTopicWrapper topic="tools"><Tools /></MentorTopicWrapper>} />
          <Route path="/tools/niche" element={<MentorTopicWrapper topic="scorecard"><NicheDiscovery /></MentorTopicWrapper>} />
          <Route path="/tools/roadmap" element={<MentorTopicWrapper topic="roadmap"><RoadmapGenerator /></MentorTopicWrapper>} />
          <Route path="/tools/scorecard" element={<MentorTopicWrapper topic="scorecard"><Scorecard /></MentorTopicWrapper>} />
          <Route path="/tools/calculator" element={<MentorTopicWrapper topic="roi"><WealthCalculator /></MentorTopicWrapper>} />

          {/* Calculators */}
          <Route path="/scorecard" element={<MentorTopicWrapper topic="scorecard"><Scorecard /></MentorTopicWrapper>} />
          <Route path="/roi" element={<MentorTopicWrapper topic="roi"><WealthCalculator /></MentorTopicWrapper>} />
          <Route path="/freedom" element={<MentorTopicWrapper topic="freedom"><FreedomCalculator /></MentorTopicWrapper>} />
          <Route path="/gap" element={<MentorTopicWrapper topic="retirement-gap"><RetirementGapCalculator /></MentorTopicWrapper>} />

          {/* Info Pages */}
          <Route path="/products" element={<MentorTopicWrapper topic="products"><Products /></MentorTopicWrapper>} />
          <Route path="/pricing" element={<MentorTopicWrapper topic="pricing"><Pricing /></MentorTopicWrapper>} />
          <Route path="/about" element={<MentorTopicWrapper topic="about"><About /></MentorTopicWrapper>} />
          <Route path="/contact" element={<MentorTopicWrapper topic="contact"><Contact /></MentorTopicWrapper>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<ExternalRedirect to="https://dashboard.digitallydefined.online" />} />

          {/* Fallback */}
          <Route path="*" element={<MentorTopicWrapper topic="home"><ComingSoon /></MentorTopicWrapper>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
