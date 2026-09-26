import { useState, useCallback, useRef, useEffect } from 'react';

function detectDevMode(message) {
  if (!message) return false;
  const lower = message.toLowerCase();
  const keywords = [
    'fix the header', 'fix the footer', 'fix the nav', 'fix the spacing',
    'my cta is', 'cta isnt', 'cta isn\'t', 'cta button', 'add a cta',
    'add the cta', 'remove the cta', 'move the cta', 'cta is not',
    'button is', 'button isnt', 'button is not', 'fix the button',
    'add a button', 'add the button', 'remove the button',
    'header navigation', 'the header', 'the navigation', 'nav menu',
    'the navbar', 'the nav bar', 'right of the header',
    'font is', 'font size', 'color is wrong', 'change the color',
    'change the font', 'make it bigger', 'make it smaller',
    'the layout is', 'fix the layout', 'something is broken',
    'not showing', 'not appearing', 'missing', 'broken',
    'css is', 'style is', 'styling is', 'margin is', 'padding is',
    'help me fix', 'can you fix', 'fix this', 'debug',
    'the page is', 'component is', 'widget is', 'import is',
    'router is', 'routing is', 'link is', 'route is',
    'i want to add', 'can you add', 'please add', 'add a navbar',
    'create a component', 'edit the', 'update the', 'change the',
    'where is the', 'move the', 'position the', 'align the',
    'needs spacing', 'is too big', 'is too small', 'is overlapping'
  ];
  return keywords.some(k => lower.includes(k));
}

function getTopicPrompt(topic) {
  const prompts = {
    'home': "Hi, I'm Hermes, your DigitallyDefined guide. I help Gen X women build faceless digital real estate for retirement. Ask me about digital assets, retirement planning, or how AI can help you build income without being visible online.",
    'retirement-gap': "I'm Hermes. I help you understand the gap between where you are and where you want to be financially. Ask me about the Retirement Gap Calculator.",
    'quiz': "I'm Hermes. I can help explain the Digital Superpower Quiz and what your results mean.",
    'tools': "I'm Hermes. These free tools help you plan before you build. Ask me which tool is right for your current question.",
    'scorecard': "I'm Hermes. The Niche Profitability Scorecard helps you test an idea before investing time.",
    'freedom': "I'm Hermes. The Freedom Number Calculator models a portfolio of digital assets to hit your monthly income target.",
    'roi': "I'm Hermes. The 10X ROI Calculator models lead flow and revenue for rank-and-rent properties.",
    'products': "I'm Hermes. Our digital products help you systematize your asset building.",
    'pricing': "I'm Hermes. I can help you understand which plan fits your current stage.",
    'about': "I'm Hermes. DigitallyDefined was built for Gen X women who want ownership without exposure.",
    'contact': "I'm Hermes. Before you reach out, tell me what you're building or wondering about.",
    'automation': "I'm Hermes. Automation is how faceless empires scale without constant work.",
    'default': "Hi, I'm Hermes, your DigitallyDefined guide. Ask me about digital real estate, retirement planning, AI tools, or how to build income without showing your face."
  };
  return prompts[topic] || prompts['default'];
}

export function useMentor(topic = 'default', options = {}) {
  const { systemPrompt, toolState } = options;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const messagesEndRef = useRef(null);
  const isInitialized = useRef(false);

  // The system prompt is instructions for Hermes (sent to the backend as the)
  // "system" role) — it must NOT be displayed as a chat message. The opening
  // chat message is a friendly greeting instead.
  const openingMessage = getTopicPrompt(topic);

  useEffect(() => {
    if (!isInitialized.current) {
      setMessages([{ role: 'assistant', content: openingMessage }]);
      isInitialized.current = true;
    }
  }, [openingMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = useCallback(async (message) => {
    if (!message?.trim() || loading) return;

    const userMessage = { role: 'user', content: message.trim() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    const detectedDevMode = detectDevMode(message);
    if (detectedDevMode) {
      setDevMode(true);
    }

    try {
      const { sendToHermes } = await import('../lib/hermes');
      const response = await sendToHermes(message, {
        topic,
        systemPrompt: systemPrompt,
        toolState,
        page: topic,
        devMode: detectedDevMode,
        currentUrl: typeof window !== 'undefined' ? window.location.href : ''
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.reply || response.message || 'I processed your request.',
      };

      if (response.nextSteps || response.caution) {
        assistantMessage.nextSteps = Array.isArray(response.nextSteps) ? response.nextSteps : [];
        assistantMessage.caution = response.caution || '';
      }

      if (response.filePath) assistantMessage.filePath = response.filePath;
      if (response.codeSnippet) assistantMessage.codeSnippet = response.codeSnippet;
      if (response.exactChange) assistantMessage.exactChange = response.exactChange;
      if (detectedDevMode) assistantMessage.isDevGuidance = true;

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Hermes mentor error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment."
      }]);
      setError(err.message || 'Connection error');
    } finally {
      setLoading(false);
    }
  }, [loading, topic, systemPrompt, toolState]);

  const clearChat = useCallback(() => {
    setMessages([{ role: 'assistant', content: openingMessage }]);
    setError(null);
    setDevMode(false);
  }, [openingMessage]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    messages,
    loading,
    error,
    isOpen,
    devMode,
    messagesEndRef,
    sendMessage,
    clearChat,
    toggleOpen,
    setDevMode,
    setIsOpen,
    topic,
    openingMessage
  };
}

export default useMentor;
