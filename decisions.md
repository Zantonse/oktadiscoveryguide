# Architecture Decisions

This document captures key architecture and design decisions made during development of the Discovery Guide application.

## Discovery System Design

### Stage-Aware Question Suggestions

**Decision**: Implement a 5-stage discovery flow (opening, building, exploring, deepening, closing) with stage-specific question suggestions.

**Rationale**: Real discovery conversations follow a natural progression. Jumping to closing questions during opening feels unnatural and trains bad habits.

**Implementation**:
- Stage determined by `discoveryProgress` percentage and `discoveredAreas` count
- Each stage has curated questions targeting appropriate discovery areas
- Stage indicator shown in UI with focus area hints

### Discovery Area Dependencies

**Decision**: Implement a dependency graph where certain discovery areas should logically be explored before others.

**Rationale**: In real conversations, asking about "timeline to production" before understanding "what AI initiatives exist" feels premature and can damage rapport.

**Dependencies by Track**:

**AI Agents Track**:
- `agent_use_cases` requires `ai_initiatives`
- `mcp_tool_access` requires `ai_initiatives` + `agent_use_cases`
- `security_concerns` requires `ai_initiatives` + `agent_use_cases`
- `governance_needs` requires `security_concerns`
- `shadow_ai` requires `ai_initiatives` + `security_concerns`
- `timeline` requires `ai_initiatives` + `agent_use_cases` + `security_concerns`
- `decision_process` requires `security_concerns` + `governance_needs`

**Sales Track**:
- `business_impact` requires `current_state` + `pain_points`
- `budget` requires `pain_points` + `business_impact`
- `timeline` requires `pain_points`
- `decision_process` requires `pain_points` + `business_impact`
- `success_criteria` requires `pain_points` + `business_impact`

**Technical Track**:
- `pain_points` requires `architecture`
- `requirements` requires `architecture` + `pain_points`
- `compliance` requires `architecture`
- `migration` requires `architecture` + `integrations` + `requirements`

## Stakeholder Realism

### Interest-Level Response Variation

**Decision**: Stakeholder tone and information sharing varies dramatically based on current interest level (1-10).

**Rationale**: Real stakeholders don't share the same way regardless of engagement. A disengaged executive gives one-word answers; an excited technical lead shares war stories.

**Implementation**:
- Interest 1-3: Short, guarded answers. Impatience signals. May try to end call.
- Interest 4-6: Professional but not volunteering. Answers directly asked questions.
- Interest 7-10: Engaged sharing. Asks questions back. Mentions pain points unprompted.

### Objection Triggers

**Decision**: Specific sales behaviors trigger realistic objections from stakeholders.

**Triggers**:
1. "We're not ready" - pushing too fast without building value
2. "We'll build this ourselves" - not demonstrating differentiation
3. "Let me think about it" - not uncovering real pain
4. "Send me info" - pitching before understanding needs
5. "Need to check with..." - not confirming decision-making authority
6. "Budget concerns" - not connecting to business outcomes

### Competitor Mentions

**Decision**: Stakeholders naturally mention competitors when relevant, creating realistic competitive scenarios.

**IGA Track Competitors**: SailPoint, Saviynt, One Identity, IBM, custom scripts
**Technical Track Competitors**: Microsoft Entra, legacy tools, homegrown solutions
**AI Agents Track Competitors**: AWS/Azure native, Salesforce Agentforce, open-source frameworks

### Red Herrings & Distractions

**Decision**: Stakeholders occasionally introduce tangential topics to test salesperson focus.

**Examples**:
- "By the way, we just went through a reorg..."
- "I saw an interesting AI demo at a conference last week..."
- "Our CEO is really focused on cost cutting right now..."

**Rationale**: Real conversations aren't linear. Good discovery practitioners redirect gracefully.

## Report Card & Feedback

### Golden Question Detection

**Decision**: Identify and reward "golden questions" - questions that unlock multiple discovery areas or significantly advance understanding.

**Implementation**:
- Regex patterns identify high-impact question types
- Track which areas the question "unlocks"
- Bonus points for questions matching multiple patterns
- Highlighted in report card

**Example Patterns**:
- "What keeps you up at night about AI/agents/security?" - unlocks security_concerns + governance_needs
- Questions about shadow AI/ungoverned agents - unlocks shadow_ai + governance_needs
- Questions about how they handle AI auth today - unlocks current_approach + agent_use_cases

### Discovery Flow Analysis

**Decision**: Score not just what was discovered but the logical flow of discovery.

**Scoring Factors**:
- Following dependency order (exploring prerequisites before advanced topics)
- Natural transitions between related areas
- Penalties for skipping foundational areas
- Recognition of good transition patterns

**Implementation**:
- `analyzeDiscoveryFlow()` function scores the order of discovered areas
- Identifies specific issues (e.g., "Asked about timeline before establishing pain points")
- Highlights good transitions (e.g., "Nice flow from current state to pain points")

## Technical Decisions

### Streaming Responses

**Decision**: Use Server-Sent Events (SSE) for streaming AI responses rather than polling or WebSockets.

**Rationale**:
- Simpler than WebSockets for unidirectional data
- Better UX with visible typing effect
- Allows extraction of metadata (interest, coaching) at end of stream

### Context Management

**Decision**: Use React Context (SessionContext) as single source of truth rather than distributed state.

**Rationale**:
- Discovery session has many interdependent state values
- Single context simplifies API call coordination
- Easier to implement reset/export functionality

### Demo Mode Fallback

**Decision**: Provide demo responses when no API key is configured.

**Rationale**: Allows UI development and testing without API costs. Demo questions are stage-aware to maintain realistic feel.

## Future Considerations

### Not Yet Implemented

1. **Conversation Recording/Playback**: Save and review practice sessions
2. **Leaderboard/Gamification**: Compare scores across users
3. **Custom Personas**: Allow users to define stakeholder characteristics
4. **Multi-language Support**: Internationalization
5. **Team Features**: Share sessions, collaborative practice

### Potential Improvements

1. **Voice Input**: Speech-to-text for more realistic practice
2. **Emotion Detection**: Analyze user message sentiment
3. **Adaptive Difficulty**: Adjust stakeholder difficulty based on performance
4. **Industry-Specific Deep Dives**: More detailed industry context
