# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Okta Discovery Guide - A React + Node.js application that simulates AI-powered discovery conversations with stakeholders for practicing sales and technical discovery across three tracks:
- **IGA Sales Discovery** - Business-focused discovery for Okta Identity Governance
- **IGA Technical Discovery** - Technical architecture discovery for IGA
- **AI Agents Discovery** - Discovery for Okta's AI security and agentic AI identity solutions (including MCP - Model Context Protocol)

## Development Commands

### Server (Express backend)
```bash
cd server
npm install           # Install dependencies
npm run dev           # Start with hot reload (port 3007)
npm start             # Production start
```

### Client (React + Vite frontend)
```bash
cd client
npm install           # Install dependencies
npm run dev           # Start Vite dev server (localhost:5173)
npm run build         # Build for production
npm run preview       # Preview production build
```

### Running Both
Start server first, then client in separate terminal. Client proxies `/api` requests to server via `vite.config.js`.

### Environment Setup
```bash
cp .env.example server/.env
```

Required in `server/.env`:
```
OPENAI_API_KEY=<your-litellm-key>
OPENAI_API_BASE=https://llm.atko.ai  # LiteLLM proxy endpoint
PORT=3007
```

## Architecture

### Dual Deployment Structure
The app supports two deployment modes:
- **Local development**: Express server (`/server`) + Vite dev server (`/client`)
- **Vercel production**: Serverless functions (`/api`) + static client build

### Directory Structure
- `/client` - React SPA with Vite
- `/server` - Express API server for local development
- `/api` - Vercel serverless functions (mirrors server endpoints)
- `/prompts` - Shared prompt templates used by Vercel functions

### Server Architecture (Local Dev)
- `server/server.js` - Express app entry, middleware, static file serving
- `server/routes/api.js` - REST endpoints for industries, personas, phases, chat, streaming
- `server/services/openai.js` - LiteLLM/OpenAI integration with coaching hints and demo fallback
- `server/prompts/` - AI prompt templates

### Vercel Serverless Functions
- `api/chat.js` - Main chat endpoint (non-streaming)
- `api/chat/start.js` - Conversation start endpoint
- `api/suggestions.js` - Suggested questions
- `api/industries.js`, `api/personas.js`, `api/phases.js` - Data endpoints
- Uses `/prompts` directory (shared with Vercel, not `/server/prompts`)

### Prompt Templates
- `systemPrompt.js` - Base prompt + track-specific prompts (sales, technical, aiAgents)
- `industries.js` - Industry context (compliance frameworks, challenges)
- `personas.js` - Flat lookup of all personas by ID with track-specific context

### Client Architecture
- `client/src/App.jsx` - Root component with ThemeContext (light/dark + color themes)
- `client/src/contexts/SessionContext.jsx` - Central state management (selection state, conversation, streaming, API calls)
- `client/src/components/` - UI organized by:
  - `common/` - Button, Card, Dropdown
  - `layout/` - Header, Sidebar, MainContent
  - `selectors/` - IndustrySelector, PhaseSelector (track), StakeholderSelector
  - `chat/` - ChatContainer, ChatInput, ChatMessage, CoachingHint
  - `features/` - FlowGuide, ReportCard, SuggestedQuestions
- `client/src/data/` - Static data (industries, stakeholders by track)
- `client/src/styles.css` - Complete stylesheet with CSS variables for theming

### State Flow
1. User selects industry → track → stakeholder (stakeholder options depend on track)
2. `SessionContext` manages all state; changing track clears stakeholder selection
3. API calls include config: `{industryId, personaId, track, phaseId}`
4. Server builds system prompt from industry + persona + phase contexts
5. `POST /api/chat/stream` uses SSE for streaming responses (local dev only)
6. Server parses `[INTEREST:X]`, `[PROGRESS:X]`, `[DISCOVERED:areas]` tags from AI response
7. Coaching hints generated based on conversation context

### Key API Endpoints
- `GET /api/industries` - List industries
- `GET /api/personas` - List stakeholder personas grouped by level
- `GET /api/phases` - Get track phases
- `POST /api/chat/start` - Get stakeholder opening message
- `POST /api/chat/stream` - SSE streaming chat (local dev)
- `POST /api/chat` - Non-streaming chat (Vercel)
- `POST /api/chat/end` - End session, get report card
- `POST /api/suggestions` - Get context-aware suggested questions

### Prompt Architecture
System prompts composed in `buildSystemPrompt()`:
1. Base prompt - Stakeholder role-play instructions, interest scoring rules, response format
2. Industry context - Compliance frameworks, common challenges
3. Persona context - Role, concerns, communication style (track-specific)
4. Phase context - Discovery areas to track, product knowledge

The AI plays the stakeholder (buyer), not salesperson. It simulates realistic discovery with:
- Skepticism that gradually opens up with good questions
- Interest level (1-10) that fluctuates based on conversation quality
- Discovery progress tracking per area
- Automatic conversation end if interest drops to 2 or below

### Track-Specific Stakeholders
Each track has different personas defined in both `server/prompts/personas.js` (and `/prompts/personas.js` for Vercel) and `client/src/data/stakeholders.js`:
- **Sales**: CISO, CIO, IT Director, IAM Engineer
- **Technical**: CISO, IT Director, Security Manager, IAM Engineer, Systems Architect
- **AI Agents**: CISO, CTO, AI Platform Lead, DS Manager, ML Engineer, Platform Engineer

AI Agents personas understand MCP (Model Context Protocol) for agent-tool connections.

### Theming
- Light/dark mode toggle stored in localStorage
- 6 color themes (indigo, blue, emerald, rose, amber, violet) with light/dark variants
- CSS variables applied dynamically via `useEffect` in App.jsx
