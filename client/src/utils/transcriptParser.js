/**
 * Transcript Parser Utility
 * Parses various transcript formats and detects speaker roles
 */

// Detection signal weights for role classification
const SELLER_SIGNALS = {
  questionRatio: { weight: 3, description: 'High question ratio indicates seller' },
  solutionLanguage: { weight: 2, patterns: [/let me explain/i, /our solution/i, /okta can/i, /we can help/i, /i'd recommend/i] },
  meetingOpener: { weight: 1, patterns: [/thanks for your time/i, /i appreciate you meeting/i, /thanks for taking/i, /good to connect/i] },
  followUp: { weight: 1, patterns: [/can you tell me more/i, /how does that/i, /what about/i, /could you elaborate/i] }
};

const PROSPECT_SIGNALS = {
  currentState: { weight: 2, patterns: [/we currently/i, /our team/i, /our challenge/i, /our company/i, /we have/i, /we're using/i, /we've been/i] },
  painLanguage: { weight: 2, patterns: [/we struggle/i, /the problem is/i, /it's difficult/i, /we need/i, /we're looking for/i] },
  roleIntro: { weight: 1, patterns: [/i'm the/i, /i manage/i, /i oversee/i, /i'm responsible for/i, /my team handles/i] },
  wordCount: { weight: 1, description: 'More total words typically indicates prospect' }
};

/**
 * Parse VTT (Web Video Text Tracks) format
 */
function parseVTT(content) {
  const lines = content.split('\n');
  const messages = [];
  let currentSpeaker = '';
  let currentContent = '';

  // Skip WEBVTT header
  const startIndex = lines.findIndex(line => line.trim() === 'WEBVTT') + 1;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and timestamp lines
    if (!line || line.match(/^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->/)) {
      continue;
    }

    // Check for speaker label
    const speakerMatch = line.match(/^([A-Za-z\s]+):\s*(.*)$/);
    if (speakerMatch) {
      // Save previous message if exists
      if (currentSpeaker && currentContent) {
        messages.push({ speaker: currentSpeaker, content: currentContent.trim() });
      }
      currentSpeaker = speakerMatch[1].trim();
      currentContent = speakerMatch[2];
    } else if (currentSpeaker) {
      // Continue previous speaker's content
      currentContent += ' ' + line;
    }
  }

  // Add final message
  if (currentSpeaker && currentContent) {
    messages.push({ speaker: currentSpeaker, content: currentContent.trim() });
  }

  return messages;
}

/**
 * Parse JSON format
 * Expected: [{ speaker: string, content: string }, ...]
 */
function parseJSON(content) {
  try {
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed)) {
      throw new Error('JSON must be an array');
    }

    return parsed.map((item, index) => {
      if (!item.speaker && !item.role && !item.name) {
        throw new Error(`Message at index ${index} missing speaker/role/name field`);
      }
      if (!item.content && !item.text && !item.message) {
        throw new Error(`Message at index ${index} missing content/text/message field`);
      }

      return {
        speaker: item.speaker || item.role || item.name,
        content: item.content || item.text || item.message
      };
    });
  } catch (error) {
    throw new Error(`Invalid JSON format: ${error.message}`);
  }
}

/**
 * Parse speaker-labeled text format
 * Examples:
 * - "John Smith: Hello, how are you?"
 * - "[John Smith] Hello, how are you?"
 */
function parseSpeakerLabeled(content) {
  const lines = content.split('\n');
  const messages = [];
  let currentSpeaker = '';
  let currentContent = '';

  // Patterns for speaker labels
  const colonPattern = /^([A-Za-z][A-Za-z\s.'-]{0,50}):\s*(.+)$/;
  const bracketPattern = /^\[([^\]]+)\]\s*(.+)$/;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Try colon format first
    let match = trimmed.match(colonPattern);
    if (!match) {
      // Try bracket format
      match = trimmed.match(bracketPattern);
    }

    if (match) {
      // Save previous message
      if (currentSpeaker && currentContent) {
        messages.push({ speaker: currentSpeaker, content: currentContent.trim() });
      }
      currentSpeaker = match[1].trim();
      currentContent = match[2];
    } else if (currentSpeaker) {
      // Continue previous speaker's content
      currentContent += ' ' + trimmed;
    }
  }

  // Add final message
  if (currentSpeaker && currentContent) {
    messages.push({ speaker: currentSpeaker, content: currentContent.trim() });
  }

  return messages;
}

/**
 * Parse plain text format (alternating speakers)
 */
function parsePlainText(content) {
  const lines = content.split('\n').filter(line => line.trim());
  const messages = [];

  for (let i = 0; i < lines.length; i++) {
    messages.push({
      speaker: i % 2 === 0 ? 'Speaker 1' : 'Speaker 2',
      content: lines[i].trim()
    });
  }

  return messages;
}

/**
 * Detect format of transcript content
 */
export function detectFormat(content) {
  const trimmed = content.trim();

  // Check for JSON
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // Not valid JSON
    }
  }

  // Check for VTT
  if (trimmed.startsWith('WEBVTT') || trimmed.match(/^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->/m)) {
    return 'vtt';
  }

  // Check for speaker-labeled format
  const lines = trimmed.split('\n');
  let speakerLabelCount = 0;
  for (const line of lines.slice(0, 10)) {
    if (line.match(/^[A-Za-z][A-Za-z\s.'-]{0,50}:\s*.+/) || line.match(/^\[[^\]]+\]\s*.+/)) {
      speakerLabelCount++;
    }
  }

  if (speakerLabelCount >= 2) {
    return 'speaker-labeled';
  }

  return 'plain';
}

/**
 * Parse transcript content based on format
 */
export function parseTranscript(content, format = null) {
  const detectedFormat = format || detectFormat(content);

  let messages;
  switch (detectedFormat) {
    case 'json':
      messages = parseJSON(content);
      break;
    case 'vtt':
      messages = parseVTT(content);
      break;
    case 'speaker-labeled':
      messages = parseSpeakerLabeled(content);
      break;
    case 'plain':
    default:
      messages = parsePlainText(content);
  }

  // Merge consecutive messages from same speaker
  const mergedMessages = [];
  for (const msg of messages) {
    if (mergedMessages.length > 0 &&
        mergedMessages[mergedMessages.length - 1].speaker === msg.speaker) {
      mergedMessages[mergedMessages.length - 1].content += '\n' + msg.content;
    } else {
      mergedMessages.push({ ...msg });
    }
  }

  return {
    format: detectedFormat,
    messages: mergedMessages
  };
}

/**
 * Calculate role detection signals for a speaker
 */
function calculateSignals(speakerMessages) {
  let sellerScore = 0;
  let prospectScore = 0;
  const allContent = speakerMessages.join(' ');
  const wordCount = allContent.split(/\s+/).length;

  // Count questions
  const questionCount = speakerMessages.reduce((count, msg) => {
    return count + (msg.match(/\?/g) || []).length;
  }, 0);
  const totalSentences = speakerMessages.reduce((count, msg) => {
    return count + (msg.match(/[.!?]+/g) || []).length;
  }, 0);
  const questionRatio = totalSentences > 0 ? questionCount / totalSentences : 0;

  // High question ratio indicates seller
  if (questionRatio > 0.4) {
    sellerScore += SELLER_SIGNALS.questionRatio.weight;
  }

  // Check seller patterns
  for (const patternGroup of Object.values(SELLER_SIGNALS)) {
    if (patternGroup.patterns) {
      for (const pattern of patternGroup.patterns) {
        if (pattern.test(allContent)) {
          sellerScore += patternGroup.weight;
          break;
        }
      }
    }
  }

  // Check prospect patterns
  for (const patternGroup of Object.values(PROSPECT_SIGNALS)) {
    if (patternGroup.patterns) {
      for (const pattern of patternGroup.patterns) {
        if (pattern.test(allContent)) {
          prospectScore += patternGroup.weight;
          break;
        }
      }
    }
  }

  return {
    sellerScore,
    prospectScore,
    questionRatio,
    wordCount
  };
}

/**
 * Detect roles for all speakers
 */
export function detectRoles(messages) {
  // Group messages by speaker
  const speakerMessages = {};
  const speakerOrder = [];

  for (const msg of messages) {
    if (!speakerMessages[msg.speaker]) {
      speakerMessages[msg.speaker] = [];
      speakerOrder.push(msg.speaker);
    }
    speakerMessages[msg.speaker].push(msg.content);
  }

  // Calculate signals for each speaker
  const speakerSignals = {};
  for (const [speaker, msgs] of Object.entries(speakerMessages)) {
    speakerSignals[speaker] = calculateSignals(msgs);
  }

  // Determine roles based on signals
  const speakers = Object.keys(speakerSignals);

  if (speakers.length === 0) {
    return { sellers: [], prospects: [], confidence: 'low' };
  }

  if (speakers.length === 1) {
    // Only one speaker - can't determine role
    return {
      sellers: [speakers[0]],
      prospects: [],
      confidence: 'low'
    };
  }

  // Calculate net score (seller - prospect) for each speaker
  const netScores = speakers.map(speaker => ({
    speaker,
    net: speakerSignals[speaker].sellerScore - speakerSignals[speaker].prospectScore,
    signals: speakerSignals[speaker]
  }));

  // Sort by net score (higher = more likely seller)
  netScores.sort((a, b) => b.net - a.net);

  // The one with highest net score is the seller
  const sellers = [netScores[0].speaker];
  const prospects = netScores.slice(1).map(s => s.speaker);

  // Calculate confidence
  const scoreDiff = Math.abs(netScores[0].net - (netScores[1]?.net || 0));
  let confidence = 'low';
  if (scoreDiff >= 4) confidence = 'high';
  else if (scoreDiff >= 2) confidence = 'medium';

  return {
    sellers,
    prospects,
    confidence,
    signals: speakerSignals
  };
}

/**
 * Convert parsed messages to analysis format
 */
export function convertToAnalysisFormat(messages, roleAssignments) {
  const { sellers, prospects } = roleAssignments;

  return messages.map(msg => ({
    role: sellers.includes(msg.speaker) ? 'user' : 'assistant',
    content: msg.content,
    originalSpeaker: msg.speaker
  }));
}

/**
 * Full parsing pipeline
 */
export function parseAndAnalyze(content) {
  // Parse the transcript
  const { format, messages } = parseTranscript(content);

  if (messages.length === 0) {
    throw new Error('No messages found in transcript');
  }

  // Get unique speakers
  const rawSpeakers = [...new Set(messages.map(m => m.speaker))];

  // Detect roles
  const roleDetection = detectRoles(messages);

  // Convert to analysis format
  const analysisMessages = convertToAnalysisFormat(messages, roleDetection);

  return {
    format,
    rawSpeakers,
    parsedMessages: messages.map(m => ({
      ...m,
      detectedRole: roleDetection.sellers.includes(m.speaker) ? 'seller' : 'prospect'
    })),
    roleAssignments: {
      sellers: roleDetection.sellers,
      prospects: roleDetection.prospects
    },
    confidence: roleDetection.confidence,
    messages: analysisMessages,
    signals: roleDetection.signals
  };
}

/**
 * Swap roles between sellers and prospects
 */
export function swapRoles(parseResult) {
  const newRoleAssignments = {
    sellers: parseResult.roleAssignments.prospects,
    prospects: parseResult.roleAssignments.sellers
  };

  const newParsedMessages = parseResult.parsedMessages.map(m => ({
    ...m,
    detectedRole: newRoleAssignments.sellers.includes(m.speaker) ? 'seller' : 'prospect'
  }));

  const newMessages = convertToAnalysisFormat(
    parseResult.parsedMessages.map(m => ({ speaker: m.speaker, content: m.content })),
    newRoleAssignments
  );

  return {
    ...parseResult,
    roleAssignments: newRoleAssignments,
    parsedMessages: newParsedMessages,
    messages: newMessages
  };
}

/**
 * Manually assign a speaker to a role
 */
export function assignSpeakerRole(parseResult, speaker, role) {
  const newRoleAssignments = {
    sellers: [...parseResult.roleAssignments.sellers],
    prospects: [...parseResult.roleAssignments.prospects]
  };

  // Remove speaker from both lists
  newRoleAssignments.sellers = newRoleAssignments.sellers.filter(s => s !== speaker);
  newRoleAssignments.prospects = newRoleAssignments.prospects.filter(s => s !== speaker);

  // Add to appropriate list
  if (role === 'seller') {
    newRoleAssignments.sellers.push(speaker);
  } else {
    newRoleAssignments.prospects.push(speaker);
  }

  const newParsedMessages = parseResult.parsedMessages.map(m => ({
    ...m,
    detectedRole: newRoleAssignments.sellers.includes(m.speaker) ? 'seller' : 'prospect'
  }));

  const newMessages = convertToAnalysisFormat(
    parseResult.parsedMessages.map(m => ({ speaker: m.speaker, content: m.content })),
    newRoleAssignments
  );

  return {
    ...parseResult,
    roleAssignments: newRoleAssignments,
    parsedMessages: newParsedMessages,
    messages: newMessages,
    confidence: 'manual'
  };
}

/**
 * Calculate talk ratio from messages
 */
export function calculateTalkRatio(messages) {
  let sellerChars = 0;
  let prospectChars = 0;

  for (const msg of messages) {
    const charCount = msg.content.length;
    if (msg.role === 'user') {
      sellerChars += charCount;
    } else {
      prospectChars += charCount;
    }
  }

  const total = sellerChars + prospectChars;
  if (total === 0) return { salesperson: 50, prospect: 50, verdict: 'poor' };

  const salespersonPercent = Math.round((sellerChars / total) * 100);
  const prospectPercent = 100 - salespersonPercent;

  // Ideal is 60-70% prospect talk time
  let verdict = 'poor';
  if (prospectPercent >= 60 && prospectPercent <= 70) {
    verdict = 'excellent';
  } else if (prospectPercent >= 50 && prospectPercent <= 80) {
    verdict = 'good';
  } else if (prospectPercent >= 40 && prospectPercent <= 85) {
    verdict = 'needs_work';
  }

  return {
    salesperson: salespersonPercent,
    prospect: prospectPercent,
    verdict
  };
}
