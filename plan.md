# Discovery Guide - Development Plan

## Summary
A React + Node.js application that simulates AI-powered discovery conversations with stakeholders for practicing Okta Identity Governance (IGA) sales and technical discovery.

## Current Status: Active Development

### What's Built
- Full Express API with OpenAI/LiteLLM integration and demo fallback
- React client with modern UI components
- 12 industries, 14 personas, 2 discovery tracks with rich prompts
- SessionContext managing all state
- Light/dark theme support
- Vercel serverless deployment ready

---

## Recent Updates (Jan 2026)

### UI Modernization [COMPLETED]
**Changes made:**
- Complete CSS overhaul with modern indigo/purple color scheme
- Smooth animations (dropdowns, messages, hints)
- Better shadows, gradients, and depth
- Fixed dropdown overflow issues (cards now allow overflow)
- Improved border-radius and spacing throughout

### Stakeholder Selector Redesign [COMPLETED]
**Files modified:**
- `client/src/components/selectors/StakeholderSelector.jsx` - Complete rewrite

**Changes made:**
- Converted from accordion-style to dropdown (matches Industry selector)
- Grouped options by level (Executive, Management, Technical)
- Added icons for each persona type
- Shows selection badge with icon when selected
- Much cleaner, more intuitive UX

### User Avatar Fix [COMPLETED]
**Files modified:**
- `client/src/components/chat/ChatMessage.jsx`
- `client/src/styles.css`

**Changes made:**
- Replaced broken user icon with clean "You" text avatar
- Circular gradient background matching the app's color scheme

### Casual Opening Messages [COMPLETED]
**Files modified:**
- `server/services/openai.js`

**Changes made:**
- Opening prompts now generate brief, casual greetings (1-2 sentences)
- Stakeholder just says hello and their role, then hands off to salesperson
- Updated demo fallback messages to match casual style
- Examples: "Hi, I'm the CISO here. What can I help you with?"

### Coaching Hints Feature [COMPLETED]
**Files modified:**
- `server/services/openai.js` - Added `generateCoachingHint()` function
- `client/src/contexts/SessionContext.jsx` - Added `coachingHint` state
- `client/src/components/chat/ChatContainer.jsx` - Added hint display
- `client/src/styles.css` - Added coaching hint styling

**How it works:**
- After each stakeholder response, AI generates a coaching tip
- Displayed in a green gradient box above the chat input
- Context-aware based on phase, persona, and conversation
- Helps salespeople learn what questions to ask next
- Falls back to phase-specific default hints if AI fails

**Example hints:**
- "They mentioned audit findings - dig deeper into the specific compliance gaps."
- "Good opening to ask about their current IAM stack."
- "They seem hesitant about budget - pivot to understanding priorities first."

### LiteLLM Configuration [COMPLETED]
**Files modified:**
- `server/services/openai.js` - Model changed to `gpt-5.2-pro`
- `server/.env` - Added `OPENAI_API_BASE` support

**Environment variables:**
```
OPENAI_API_KEY=<your-litellm-key>
OPENAI_API_BASE=https://llm.atko.ai
PORT=3002
```

---

## Architecture

### Server (Express backend)
- `server/server.js` - Express app entry, middleware
- `server/routes/api.js` - REST endpoints
- `server/services/openai.js` - OpenAI/LiteLLM integration with coaching hints
- `server/prompts/` - AI prompt templates

### Client (React + Vite)
- `client/src/contexts/SessionContext.jsx` - Central state management
- `client/src/components/` - UI organized by type
  - `common/` - Dropdown, Card, Avatar, Button
  - `layout/` - Header, Sidebar
  - `selectors/` - Industry, Stakeholder, Phase selectors
  - `chat/` - ChatContainer, ChatMessage, ChatInput, TypingIndicator
  - `features/` - SuggestedQuestions, SessionNotes, ProgressTracker
- `client/src/styles.css` - Complete modern stylesheet

### Key Features
1. **Industry Selection** - Dropdown with 12 industries, each with compliance context
2. **Stakeholder Selection** - Dropdown with 14 personas across 3 levels
3. **Phase Selection** - Sales track (4 phases) or Technical track (5 phases)
4. **AI Conversations** - Realistic stakeholder responses via LiteLLM
5. **Coaching Hints** - AI-powered tips after each stakeholder response
6. **Suggested Questions** - Context-aware question suggestions
7. **Session Notes** - Text area for taking notes during practice
8. **Progress Tracking** - Visual progress through discovery phases

---

## Running Locally

### Start the server
```bash
cd server
npm install
npm run dev  # Runs on port 3002
```

### Start the client
```bash
cd client
npm install
npm run dev  # Runs on port 5173, proxies to server
```

### Environment Setup
Create `server/.env`:
```
OPENAI_API_KEY=<your-key>
OPENAI_API_BASE=https://llm.atko.ai
PORT=3002
```

---

## Deployment (Vercel)

### Serverless Functions
- `api/industries.js` - GET /api/industries
- `api/personas.js` - GET /api/personas
- `api/phases.js` - GET /api/phases
- `api/chat.js` - POST /api/chat
- `api/chat/start.js` - POST /api/chat/start
- `api/suggestions.js` - POST /api/suggestions

### Environment Variables (Vercel Dashboard)
- `OPENAI_API_KEY` - LiteLLM virtual key
- `OPENAI_API_BASE` - LiteLLM endpoint URL
- `OPENAI_MODEL` - Model name (defaults to gpt-5.2-pro)

---

## Future Enhancements
- [ ] Export conversation transcripts as PDF
- [ ] Scoring/evaluation of salesperson responses
- [ ] Multi-turn coaching mode with detailed feedback
- [ ] Save/load practice sessions
- [ ] Leaderboard for team training
- [ ] More detailed analytics on question effectiveness
