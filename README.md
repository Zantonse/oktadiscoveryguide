# Okta IGA Discovery Guide

A React + Node.js web application that simulates AI-powered discovery conversations with various stakeholders across industries. Designed for practicing Okta Identity Governance (IGA), technical discovery, and AI Agents security conversations.

## Features

### Core Functionality
- **Industry Selection**: 12+ industries including Financial Services, Healthcare, Technology, and more
- **Stakeholder Personas**: Executive, Management, and Technical level personas with track-specific options
- **Three Discovery Tracks**: Sales IGA, Technical IGA, and AI Agents tracks
- **AI-Powered Conversations**: Realistic stakeholder responses via LiteLLM/OpenAI
- **30-Minute Timer**: Session timer that auto-ends conversations when expired
- **Light/Dark Theme**: Full theming support with system preference detection

### Coaching & Guidance
- **Stage-Aware Suggested Questions**: Questions adapt to discovery stage (opening, building, exploring, deepening, closing)
- **Real-time Coaching Hints**: Contextual guidance after each stakeholder response
- **Discovery Progress Tracking**: Visual progress indicator for areas covered
- **Priority Area Hints**: Guidance on which discovery areas to focus on next

### Stakeholder Realism
- **Interest Level Tracking**: 1-10 scale that affects stakeholder tone and openness
- **Response Variation by Interest**: Guarded responses at low interest, engaged sharing at high interest
- **Objection Triggers**: Realistic pushback when pushing too hard or skipping rapport
- **Red Herrings & Distractions**: Tangential topics to test conversation focus
- **Competitor Mentions**: Realistic competitive scenarios (SailPoint, Saviynt, AWS/Azure, etc.)
- **Buying Signals**: Natural indicators when interest is high

### Report Card & Analysis
- **Session Report Card**: Comprehensive scoring (0-100) with letter grade
- **Discovery Coverage**: Percentage of areas covered with detailed breakdown
- **Discovery Flow Analysis**: Score for logical progression through discovery areas
- **Golden Question Detection**: Recognition of high-impact questions
- **Strengths & Improvements**: Specific feedback on conversation quality
- **Tips for Next Time**: Actionable recommendations

### AI Agents Track Features
- **MCP (Model Context Protocol) Awareness**: Questions about tool access patterns
- **Agent Use Cases**: Customer service, copilots, autonomous agents scenarios
- **Security Concerns**: Data exposure, permissions, credential risks
- **Governance Needs**: EU AI Act, SOC2, audit requirements
- **Shadow AI Discovery**: Ungoverned AI deployment scenarios

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- LiteLLM/OpenAI API access

### Installation

1. Clone the repository and navigate to the project:
```bash
cd DiscoveryGuide
```

2. Set up environment variables:
```bash
cp .env.example server/.env
# Edit server/.env with your configuration
```

Required in `server/.env`:
```
OPENAI_API_KEY=<your-litellm-key>
OPENAI_API_BASE=https://llm.atko.ai  # LiteLLM proxy endpoint
PORT=3002
```

3. Install server dependencies:
```bash
cd server
npm install
```

4. Install client dependencies:
```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd client
npm run dev
```

3. Open http://localhost:5173 in your browser

## Usage

1. Select an **Industry** from the grid
2. Choose a **Discovery Track** (Sales IGA, Technical IGA, or AI Agents)
3. Select a **Stakeholder Persona** appropriate to your track
4. Click **Start Conversation** to begin
5. Engage in discovery - watch the interest meter and discovery progress
6. Use **Suggested Questions** for stage-appropriate guidance
7. Take **Session Notes** as you uncover insights
8. Click **End Session** or let the timer expire to see your Report Card
9. **Export** your session when complete

## Project Structure

```
/DiscoveryGuide
├── /client                    # React frontend (Vite)
│   ├── /src
│   │   ├── /components        # UI components
│   │   │   ├── /common        # Reusable UI (Button, etc.)
│   │   │   ├── /layout        # Header, Sidebar
│   │   │   ├── /selectors     # Industry, Stakeholder, Track selectors
│   │   │   ├── /chat          # ChatWindow, ChatInput, MessageList
│   │   │   └── /features      # ReportCard, SuggestedQuestions, etc.
│   │   ├── /contexts          # SessionContext (central state)
│   │   ├── /data              # Static data
│   │   └── styles.css         # Complete stylesheet with theming
│   └── package.json
├── /server                    # Node.js backend
│   ├── /routes                # Express API routes
│   │   └── api.js             # All REST endpoints
│   ├── /services
│   │   └── openai.js          # LiteLLM integration, coaching, report generation
│   ├── /prompts
│   │   ├── systemPrompt.js    # Base system prompt with all behaviors
│   │   ├── industries.js      # Industry contexts
│   │   └── personas.js        # Stakeholder personas
│   └── package.json
├── CLAUDE.md                  # Claude Code guidance
├── decisions.md               # Architecture decisions
├── todo.md                    # Current status and roadmap
├── .env.example
└── README.md
```

## API Endpoints

- `GET /api/industries` - Get list of industries
- `GET /api/personas` - Get list of stakeholder personas by level
- `GET /api/phases` - Get discovery phases for all tracks
- `POST /api/chat/start` - Start conversation, get opening message
- `POST /api/chat/stream` - Send message, get streaming AI response with coaching
- `POST /api/chat/end` - End conversation, get report card
- `POST /api/suggestions` - Get stage-aware suggested questions
- `GET /api/health` - Health check endpoint

## Architecture

### State Flow
1. User selects industry, stakeholder, and track
2. `SessionContext` manages all state and API calls
3. Server builds system prompt from industry + persona + track context
4. LiteLLM generates stakeholder responses with interest tagging
5. Server extracts coaching hints, interest level, discovered areas
6. Report card generated with flow analysis and golden question detection

### Key Design Decisions
See `decisions.md` for detailed architecture decisions including:
- Stage-aware discovery system
- Interest-level response variation
- Discovery area dependencies
- Golden question detection
- Competitor mention strategy

## License

MIT
