# Challenge Modes Design

## Overview

Add a new "Challenge" section to the AI Security Discovery Guide with four scenario-based learning modes that build the skills needed to be an AI specialist SE/product specialist at Okta. Each mode puts the user in a realistic situation and evaluates their response — no multiple choice, no quizzes, just open-ended scenarios scored by AI.

## Goals

1. **Technical AI fluency** — Ability to hold credible technical conversations about LLMs, agents, RAG, MCP, and identity in AI
2. **Product-to-architecture mapping** — Skill at identifying security gaps in customer AI architectures and mapping Okta products to them
3. **Market & competitive awareness** — Readiness to handle customer questions about competitors, analyst reports, and industry trends
4. **Real-world proof point recall** — Ability to pull the right reference architecture, use case, or analogy under pressure

## Design Principles

- **Scenario-first learning** — Everything is situation-based, not reference material
- **AI-evaluated, not quiz-style** — Free-form responses scored on rubrics, not right/wrong answers
- **Additive, not disruptive** — No changes to existing Learn, Drill, Practice, or Analyze sections
- **Short-burst friendly** — Each mode works in 10-15 minute sessions

---

## The Four Challenge Modes

### 1. Technical Deep Dive

**What it tests:** Technical AI fluency and credibility with technical buyers.

**Format:** Multi-turn conversation (5-8 exchanges) with a skeptical technical persona.

**Topic areas:**
- LLM Fundamentals — Tokens, inference, fine-tuning vs RAG, model hosting
- Agentic AI — Agent loops, tool calling, multi-agent orchestration, memory
- RAG & Data Pipelines — Retrieval patterns, embeddings, vector DBs, chunking
- MCP & Tool Access — Protocol mechanics, server/client roles, transport, auth
- Identity in AI — OAuth for agents, OBO flows, token exchange, workload identity
- AI Security Threats — Prompt injection, data exfiltration, privilege escalation, shadow AI

**Flow:**
1. User selects a topic area
2. AI plays a skeptical technical persona (ML engineer, platform architect)
3. Questions start accessible and escalate based on user's answers
4. After 5-8 exchanges, AI delivers a scorecard

**Evaluation rubric:**
- Technical Accuracy — Did you say things that were correct?
- Depth — Did you go beyond surface-level?
- Credibility — Would a technical buyer trust you after this conversation?
- Gaps Identified — Specific concepts to study up on

**Post-evaluation:** AI provides "here's what a great answer would have included" for any question where the user struggled.

---

### 2. Architecture Lab

**What it tests:** Ability to identify security gaps in customer AI architectures and map Okta products to them.

**Format:** Single-turn scenario + free-form response + evaluation.

**Flow:**
1. User is presented with a customer scenario card (3-5 sentences describing a real-world AI architecture)
2. User responds with: security gaps identified, which Okta products map where, and why
3. AI evaluates the response

**Example scenario:**
> "We're a mid-size fintech building a customer-facing AI advisor. It uses LangChain agents with RAG over our financial products database. The agents can look up account balances via internal APIs and initiate transfers through our payments service. We're using API keys stored in environment variables. Three teams are building agents independently with no central governance."

**Evaluation rubric:**
- Gap Identification — Did you catch the security risks?
- Product Mapping Accuracy — Did you recommend the right products for the right problems?
- Articulation — Could a customer follow your reasoning?
- Missed Opportunities — Gaps or products you didn't mention

**Scenario organization:** By complexity (single-agent, multi-agent, multi-team, enterprise-scale) and by industry.

---

### 3. Briefing Room

**What it tests:** Market and competitive awareness. Ability to handle curveball questions about competitors, analyst reports, and industry trends.

**Format:** Rapid-fire situational prompts — one at a time, 5 prompts per round.

**Example prompts:**
- "Customer says: 'We just saw that Microsoft added agent identity to Entra. Why would we need Okta for this?'"
- "CTO asks: 'What's your take on the A2A protocol Google just announced? How does it relate to MCP?'"
- "CISO says: 'Gartner's latest report says identity is the #1 risk vector for AI agents. What specifically are they referring to?'"
- "VP of Engineering: 'We're evaluating CrewAI vs LangGraph for our agent framework. Does that choice matter from a security perspective?'"
- "Customer heard about an AI agent data breach at a competitor. They want to know how Okta would have prevented it."

**Evaluation rubric:**
- Positioning — Did you acknowledge the premise fairly before differentiating?
- Accuracy — Are your claims about competitors, market, and Okta correct?
- Composure — Did you sound confident and informed vs. defensive or vague?
- Bridge to Value — Did you connect back to what Okta uniquely solves?

**Pacing:** 5 prompts per round, ~10-15 minutes. Good for warming up before customer calls.

---

### 4. Proof Point Match

**What it tests:** Ability to recall and articulate the right reference architecture, use case, or analogy for a given customer situation.

**Format:** Single-turn scenario + response + evaluation.

**Flow:**
1. User is presented with a customer situation (who they are, what they're building, what's making them hesitate)
2. User responds with the most relevant reference architecture, analogy, or proof point and explains why it's relevant
3. AI evaluates the response
4. AI shows 2-3 proof points the user could have used but didn't

**Example scenario:**
> "Series B healthtech startup. Building AI agents that access patient records via FHIR APIs. Their CISO is nervous about HIPAA exposure but the CTO wants to move fast. They're skeptical that an identity vendor understands AI workloads."

**Evaluation rubric:**
- Relevance — Did you pick a proof point that matches their situation?
- Specificity — Did you go beyond generic to specific patterns and outcomes?
- Persuasiveness — Would this make a hesitant buyer more confident?
- Adaptation — Did you tailor the story to their industry, scale, and concerns?

**Key learning mechanism:** The AI's post-evaluation debrief showing alternative proof points is where the real learning happens. Over time, users build a mental library of reference points.

---

## Content & Data Layer

### Static Data: `client/src/data/challenges.js`

Scenario banks for each mode:

```javascript
export const technicalTopics = [
  { id, topic, difficulty, questions: [...] }
]

export const architectureScenarios = [
  { id, industry, complexity, description, gaps: [...], productMappings: [...] }
]

export const briefingPrompts = [
  { id, category, prompt, context, keyPoints: [...] }
]

export const proofPointScenarios = [
  { id, industry, situation, relevantPatterns: [...], analogies: [...] }
]
```

Static data provides scenario prompts and seed content. The AI does the evaluation via API calls using mode-specific system prompts.

### Prompt Templates

New files in `server/prompts/` and `prompts/` (for Vercel):

- `technicalDeepDive.js` — Technical persona + escalation logic + evaluation rubric
- `architectureLab.js` — Scenario evaluation + product mapping rubric
- `briefingRoom.js` — Competitive/market evaluation rubric
- `proofPointMatch.js` — Reference relevance + debrief generation rubric

### Score Persistence

localStorage object keyed by mode, storing last 20 session scores with timestamps. Structure:

```javascript
{
  technicalDeepDive: [{ timestamp, topic, scores: { accuracy, depth, credibility }, feedback }],
  architectureLab: [{ timestamp, scenario, scores: { gaps, mapping, articulation }, feedback }],
  briefingRoom: [{ timestamp, scores: { positioning, accuracy, composure, bridge }, feedback }],
  proofPointMatch: [{ timestamp, scores: { relevance, specificity, persuasiveness, adaptation }, feedback }]
}
```

---

## UI Components

### New: `client/src/components/challenge/`

- **`ChallengeSelector.jsx`** — Landing page for Challenge tab. Four cards showing mode name, description, and recent score trend (sparkline or last-3 indicator). Click to enter a mode.

- **`ChallengeShell.jsx`** — Shared wrapper for all four modes. Handles: scenario presentation, user response input, AI evaluation call, scorecard display. Each mode passes its own config (prompt template, evaluation criteria, scenario data).

- **`ScenarioCard.jsx`** — Renders the scenario/prompt. Styled as a briefing document — distinct background, quote styling for customer statements, monospace for architecture descriptions.

- **`ScoreCard.jsx`** — Post-response evaluation display. Rubric dimensions shown as horizontal bars (similar to discovery progress in Practice). Written feedback and "what great looks like" debrief below. Reuses existing `Card` component.

- **`ChallengeHistory.jsx`** — Score history view per mode. Last 20 attempts with per-dimension scores and trend direction.

### UI Flow (per challenge round)

1. `ScenarioCard` presents the scenario
2. User types response in input area
3. Submit → API call with response + scenario + mode system prompt
4. `ScoreCard` renders scores and debrief
5. "Next Scenario" or "Back to Modes" buttons

### Special case: Technical Deep Dive

Uses multi-turn chat (reuses existing chat components from Practice mode) instead of the single-turn ScenarioCard → ScoreCard flow. Scorecard appears after 5-8 exchanges.

---

## API Endpoints

### `POST /api/challenge/evaluate`

Single-turn evaluation for Architecture Lab, Briefing Room, and Proof Point Match.

**Request:**
```json
{
  "mode": "architecture|briefing|proofpoint",
  "scenario": {},
  "response": "user's free-text response"
}
```

**Response:** Structured evaluation with scores per dimension, written feedback, and debrief content. Parsed from structured tags in AI response (same pattern as `[INTEREST:X]` in Practice mode).

### `POST /api/challenge/technical`

Multi-turn conversation for Technical Deep Dive.

**Request:**
```json
{
  "topic": "agentic_ai|rag|mcp|identity|security_threats|llm_fundamentals",
  "messages": []
}
```

**Response:** Next question from the technical persona, or final scorecard when the AI decides to wrap (after 5-8 exchanges).

### `GET /api/challenge/scenarios/:mode`

Returns scenario data for a mode. Initially serves from static data. Provides a hook to later generate fresh scenarios via AI.

---

## Integration Points

- **Header:** Add "Challenge" tab between "Drill" and "Practice"
- **App.jsx:** Add `challenge` view state and render `ChallengeSelector` or active mode
- **SessionContext:** No changes needed — Challenge modes manage their own state
- **Theming:** All new components use existing CSS variables for light/dark and color themes
- **Existing sections:** No changes to Learn, Drill, Practice, or Analyze

---

## Implementation Order

1. Data layer — `challenges.js` with initial scenario banks for all four modes
2. Prompt templates — System prompts for each mode's AI evaluation
3. API endpoints — `/api/challenge/evaluate` and `/api/challenge/technical`
4. UI components — `ChallengeSelector`, `ChallengeShell`, `ScenarioCard`, `ScoreCard`
5. Technical Deep Dive — Multi-turn mode (reuses chat components)
6. Architecture Lab — Single-turn with product mapping evaluation
7. Briefing Room — Rapid-fire prompt mode
8. Proof Point Match — Single-turn with debrief generation
9. Score history — localStorage persistence and `ChallengeHistory` view
10. Vercel functions — Mirror endpoints in `api/` directory
