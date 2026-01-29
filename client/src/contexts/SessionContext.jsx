import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const SessionContext = createContext(null);

const TIMER_DURATION = 30 * 60; // 30 minutes in seconds

export function SessionProvider({ children }) {
  // Selection state
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [selectedTrack, setSelectedTrackInternal] = useState('sales');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [availableScenarios, setAvailableScenarios] = useState([]);
  const [discoveryProgress, setDiscoveryProgress] = useState(0);

  // Timer state
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);
  const timerRef = useRef(null);

  // Custom setter for track that clears stakeholder and scenario selection
  const setSelectedTrack = useCallback((track) => {
    setSelectedTrackInternal(track);
    setSelectedStakeholder(null); // Clear stakeholder when track changes
    setSelectedScenario(null); // Clear scenario when track changes
  }, []);

  // Fetch available scenarios when track changes
  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await fetch(`/api/scenarios/${selectedTrack}`);
        const data = await response.json();
        if (data.success) {
          setAvailableScenarios(data.scenarios);
        } else {
          setAvailableScenarios([]);
        }
      } catch (error) {
        console.error('Failed to fetch scenarios:', error);
        setAvailableScenarios([]);
      }
    };
    fetchScenarios();
  }, [selectedTrack]);

  // Conversation state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);

  // Session metadata
  const [sessionNotes, setSessionNotes] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [coachingHint, setCoachingHint] = useState(null);
  const [interestLevel, setInterestLevel] = useState(5);
  const [discoveredAreas, setDiscoveredAreas] = useState([]);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [reportCard, setReportCard] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [discoveryStage, setDiscoveryStage] = useState('opening');
  const [nextPriorityAreas, setNextPriorityAreas] = useState([]);

  // Timer effect - counts down when started
  useEffect(() => {
    if (timerStarted && !conversationEnded && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerStarted, conversationEnded]);

  // Auto-end conversation when timer expires
  useEffect(() => {
    if (timerExpired && !conversationEnded && messages.length > 0) {
      endConversationRef.current?.();
    }
  }, [timerExpired, conversationEnded, messages.length]);

  // Ref to hold endConversation for timer effect
  const endConversationRef = useRef(null);

  // Check if ready to start conversation
  const canStartConversation = selectedIndustry && selectedStakeholder && selectedTrack;

  // Get current config for API calls
  const getConfig = useCallback(() => {
    let phaseId = 'discovery';
    if (selectedTrack === 'technical') {
      phaseId = 'technical-discovery';
    } else if (selectedTrack === 'aiAgents') {
      phaseId = 'ai-discovery';
    }
    return {
      industryId: selectedIndustry?.id,
      personaId: selectedStakeholder?.id,
      track: selectedTrack,
      phaseId,
      scenarioId: selectedScenario?.id
    };
  }, [selectedIndustry, selectedStakeholder, selectedTrack, selectedScenario]);

  // Add a message to the conversation
  const addMessage = useCallback((role, content) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role,
      content,
      timestamp: new Date().toISOString()
    }]);
  }, []);

  // Start a new conversation
  const startConversation = useCallback(async () => {
    if (!canStartConversation) return;

    setIsLoading(true);
    setConversationStarted(true);
    setMessages([]);
    setCoachingHint(null);

    try {
      const response = await fetch('/api/chat/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: getConfig() })
      });

      const data = await response.json();

      if (data.success) {
        addMessage('assistant', data.message);
        // Set initial coaching hint for the opening
        setCoachingHint("Start by introducing yourself and explaining why you wanted to meet. Ask an open-ended question about their current situation.");
        fetchSuggestedQuestions();
      }
    } catch (error) {
      console.error('Failed to start conversation:', error);
      addMessage('assistant', 'Sorry, there was an error starting the conversation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [canStartConversation, getConfig, addMessage]);

  // Send a message with streaming (falls back to non-streaming on Vercel)
  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    // Start timer on first user message (messages only has assistant opening)
    if (!timerStarted && messages.length === 1) {
      setTimerStarted(true);
    }

    addMessage('user', content);
    setIsLoading(true);
    setCoachingHint(null);
    setStreamingMessage('');

    try {
      const apiMessages = [...messages, { role: 'user', content }].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          config: getConfig()
        })
      });

      const contentType = response.headers.get('content-type');

      // Handle non-streaming JSON response (Vercel serverless)
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setStreamingMessage(null);

        if (data.success) {
          addMessage('assistant', data.message);
          if (data.coachingHint) {
            setCoachingHint(data.coachingHint);
          }
          if (data.interestLevel) {
            setInterestLevel(data.interestLevel);
          }
          if (data.discoveryProgress !== undefined) {
            setDiscoveryProgress(data.discoveryProgress);
          }
          if (data.discoveredAreas && data.discoveredAreas.length > 0) {
            setDiscoveredAreas(prev => {
              const combined = [...new Set([...prev, ...data.discoveredAreas])];
              return combined;
            });
          }
          if (data.conversationEnded) {
            setConversationEnded(true);
            if (data.reportCard) {
              setReportCard(data.reportCard);
            }
          } else {
            fetchSuggestedQuestions();
          }
        } else {
          addMessage('assistant', 'Sorry, there was an error. Please try again.');
        }
      } else {
        // Handle SSE streaming response (local dev)
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullMessage = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === 'content') {
                  fullMessage += data.content;
                  setStreamingMessage(fullMessage);
                } else if (data.type === 'done') {
                  // Finalize the message (use cleanMessage if provided to strip interest tag)
                  setStreamingMessage(null);
                  addMessage('assistant', data.cleanMessage || fullMessage);
                  if (data.coachingHint) {
                    setCoachingHint(data.coachingHint);
                  }
                  if (data.interestLevel) {
                    setInterestLevel(data.interestLevel);
                  }
                  if (data.discoveryProgress !== undefined) {
                    setDiscoveryProgress(data.discoveryProgress);
                  }
                  if (data.discoveredAreas && data.discoveredAreas.length > 0) {
                    setDiscoveredAreas(prev => {
                      const combined = [...new Set([...prev, ...data.discoveredAreas])];
                      return combined;
                    });
                  }
                  if (data.conversationEnded) {
                    setConversationEnded(true);
                    if (data.reportCard) {
                      setReportCard(data.reportCard);
                    }
                  } else {
                    fetchSuggestedQuestions();
                  }
                } else if (data.type === 'error') {
                  setStreamingMessage(null);
                  addMessage('assistant', 'Sorry, there was an error. Please try again.');
                }
              } catch (e) {
                // Skip malformed JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setStreamingMessage(null);
      addMessage('assistant', 'Sorry, there was an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, getConfig, addMessage, timerStarted]);

  // Fetch suggested questions
  const fetchSuggestedQuestions = useCallback(async () => {
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: getConfig(),
          conversationHistory: messages.slice(-4),
          discoveredAreas,
          discoveryProgress
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuggestedQuestions(data.questions);
        if (data.stage) {
          setDiscoveryStage(data.stage);
        }
        if (data.nextPriorityAreas) {
          setNextPriorityAreas(data.nextPriorityAreas);
        }
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  }, [getConfig, messages, discoveredAreas, discoveryProgress]);

  // End conversation manually
  const endConversation = useCallback(async () => {
    if (messages.length === 0) return;

    setIsLoading(true);

    try {
      const apiMessages = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          config: getConfig(),
          interestLevel,
          discoveredAreas
        })
      });

      const data = await response.json();

      if (data.success && data.reportCard) {
        setConversationEnded(true);
        setReportCard(data.reportCard);
      }
    } catch (error) {
      console.error('Failed to end conversation:', error);
    } finally {
      setIsLoading(false);
    }
  }, [messages, getConfig, interestLevel, discoveredAreas]);

  // Update ref so timer effect can call endConversation
  useEffect(() => {
    endConversationRef.current = endConversation;
  }, [endConversation]);

  // Reset session
  const resetSession = useCallback(() => {
    setSelectedIndustry(null);
    setSelectedStakeholder(null);
    setSelectedTrackInternal('sales');
    setSelectedScenario(null);
    setDiscoveryProgress(0);
    setMessages([]);
    setConversationStarted(false);
    setSessionNotes('');
    setSuggestedQuestions([]);
    setCoachingHint(null);
    setStreamingMessage(null);
    setInterestLevel(5);
    setDiscoveredAreas([]);
    setConversationEnded(false);
    setReportCard(null);
    setTimerStarted(false);
    setTimeRemaining(TIMER_DURATION);
    setTimerExpired(false);
    setDiscoveryStage('opening');
    setNextPriorityAreas([]);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  // Export session data
  const exportSession = useCallback(() => {
    const sessionData = {
      metadata: {
        industry: selectedIndustry,
        stakeholder: selectedStakeholder,
        track: selectedTrack,
        discoveryProgress,
        exportedAt: new Date().toISOString()
      },
      conversation: messages,
      notes: sessionNotes
    };

    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `discovery-session-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedIndustry, selectedStakeholder, selectedTrack, discoveryProgress, messages, sessionNotes]);

  const value = {
    // Selection state
    selectedIndustry,
    setSelectedIndustry,
    selectedStakeholder,
    setSelectedStakeholder,
    selectedTrack,
    selectedScenario,
    setSelectedScenario,
    availableScenarios,
    setSelectedTrack,
    discoveryProgress,

    // Conversation state
    messages,
    isLoading,
    conversationStarted,
    canStartConversation,
    streamingMessage,

    // Session data
    sessionNotes,
    setSessionNotes,
    suggestedQuestions,
    coachingHint,
    interestLevel,
    discoveredAreas,
    conversationEnded,
    reportCard,

    // Timer
    timerStarted,
    timeRemaining,
    timerExpired,

    // Discovery stage
    discoveryStage,
    nextPriorityAreas,

    // Actions
    startConversation,
    sendMessage,
    endConversation,
    resetSession,
    exportSession,
    fetchSuggestedQuestions
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
