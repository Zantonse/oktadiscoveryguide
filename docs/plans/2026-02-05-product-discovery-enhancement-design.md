# Product Discovery Enhancement Design

## Overview

Enhance the Discovery Guide learning capabilities to be more Okta AI agent feature-specific, with better discovery-to-product mapping and Okta-specific discovery questions.

## Goals

1. **Discovery-to-product mapping** — Clear connection between discovery questions and which Okta/Auth0 products address uncovered needs
2. **Okta-specific discovery questions** — Questions designed to uncover opportunities for specific Okta solutions

## Scope

### Products Covered (8 total)

**Okta:**
- Workforce Identity for AI
- ISPM (Identity Security Posture Management)
- AI Governance
- Identity for AI Agents

**Auth0:**
- Auth for GenAI Applications
- Token Vault
- FGA (Fine-Grained Authorization)
- Cross App Access (XAA)

---

## Design

### 1. Product Guide View (New Top-Level View)

**Location:** New tab in header alongside Learn, Drill, Practice, Analyze

**Structure:** Three sub-views via tabs:

#### Tab 1: Products (Catalog Style)
Eight product cards, each containing:
- Product name and one-line description
- Key capabilities (3-4 bullets)
- Ideal buyer persona (CISO, CTO, Platform Lead, etc.)
- Discovery triggers — "When you hear..." phrases that signal this product fits
- Qualification questions — 2-3 questions to confirm fit
- Pairs with — Which other products complement it

#### Tab 2: Problems (Solution Mapping)
Organized by customer pain points:
- Shadow AI / ungoverned tools → ISPM + Governance
- Agent credential sprawl → Token Vault
- AI app authentication → Auth for GenAI
- Multi-app agent access → XAA + FGA
- Compliance/audit pressure → Governance + ISPM
- Employee AI tool access → Workforce Identity

Each problem shows: description, signals you'll hear, products that solve it, discovery questions to probe deeper.

#### Tab 3: Personas (Buyer-Based)
Six personas with:
- What they care about
- Products that resonate
- Language that works
- Discovery approach

---

### 2. Enhanced Existing Learn Sections

#### Discovery Framework
Add to each of the 10 discovery areas:
- **Product fit indicators** — Which products become relevant when this area reveals needs
- **Okta vs Auth0 signal** — Quick indicator of which product line fits based on answers
- Visual badge/tag showing product relevance

#### Golden Questions
Enhance each of the 8 golden questions with:
- **What good answers reveal** — Product opportunities unlocked
- **What bad answers reveal** — Potential blockers or wrong fit
- **Follow-up questions** — Drill deeper based on response type
- **Product mapping** — Direct link to which products address the uncovered need

#### Scenario Playbooks
Add to each scenario:
- **Likely product fit** — Which products typically win in this scenario
- **Disqualification signals** — When to walk away or pivot

---

### 3. Okta-Specific Discovery Questions

#### Question Bank by Style

**Trigger-based (8-10 questions)**
Questions that surface specific pain points mapping to products:
- "How do you track which AI tools employees have connected to your systems?" → ISPM
- "Where do your agents store credentials for third-party APIs?" → Token Vault
- "How do users authenticate to your AI-powered features today?" → Auth for GenAI

**Qualification-focused (6-8 questions)**
Questions that determine Okta vs Auth0 fit:
- "Is this AI initiative primarily for employees or customers?"
- "Who owns AI security — CISO's team or the platform/dev team?"
- "Are you building AI into existing apps or creating new AI-native products?"

**Technical depth (6-8 questions)**
Architecture-probing questions where Okta has advantages:
- "How are your agents handling OAuth token refresh and rotation?"
- "What's your approach to fine-grained permissions in RAG pipelines?"
- "How do you audit which data AI agents accessed and why?"

#### Integration Points
Questions appear in:
- Product Guide → Under each product's "Qualification questions"
- Golden Questions → As follow-up questions
- Discovery Framework → Within each area's question list
- Flashcards → New "Product Discovery" card category for Drill mode

---

### 4. Data Structure

#### New Data File: `productGuide.js`

```javascript
export const products = {
  authForGenAI: {
    id: "authForGenAI",
    name: "Auth0 for GenAI",
    tagline: "User authentication for AI-powered applications",
    capabilities: [...],
    buyerPersona: "CTO, Platform Lead",
    discoveryTriggers: [...],
    qualificationQuestions: [...],
    technicalQuestions: [...],
    pairsWith: ["tokenVault", "fga"],
    oktaOrAuth0: "auth0"
  },
  // ... 7 more products
};

export const problemSolutions = {
  shadowAI: {
    id: "shadowAI",
    name: "Shadow AI / Ungoverned Tools",
    description: "...",
    signals: [...],
    products: ["ispm", "governance"],
    discoveryQuestions: [...]
  },
  // ... 5 more problems
};

export const buyerPersonas = {
  ciso: {
    id: "ciso",
    name: "CISO",
    cares: [...],
    resonantProducts: [...],
    language: [...],
    discoveryApproach: "..."
  },
  // ... 5 more personas
};
```

#### Enhanced Existing Data (`learningContent.js`)
- Add `productFit` array to each discovery area
- Add `productMapping` and `followUps` to golden questions
- Add `likelyProducts` to scenario playbooks

#### New Components
- `ProductGuide.jsx` — Main view with three tabs
- `ProductCard.jsx` — Individual product display
- `ProblemSolutionCard.jsx` — Problem-to-product mapping
- `PersonaCard.jsx` — Buyer persona view

---

### 5. UI/UX & Navigation

#### Header Navigation
Add "Products" as 5th view tab:
- Learn | Drill | Practice | Analyze | **Products**
- Icon: Box or package icon

#### Product Guide Visual Design
Follows existing warm professional aesthetic:
- **Products tab:** Card grid (2-3 columns), expandable details
- **Problems tab:** Accordion or card list, problem → solution flow
- **Personas tab:** Large persona cards with organized info sections

#### Cross-Linking
- Product names throughout Learn sections become clickable → jump to Product Guide
- "See in Product Guide" links on enhanced framework/golden questions
- Breadcrumb-style navigation back to Learn context

#### Mobile Behavior
- Single column card layout
- Tabs become horizontal scrollable pills
- Same auto-hide nav behavior as Learn section

#### Drill Mode Addition
New flashcard category: "Product Discovery"
- Product-to-trigger cards
- Problem-to-solution cards
- Persona-to-product cards

---

## Implementation Notes

### Files to Create
- `client/src/data/productGuide.js` — New product data
- `client/src/components/products/ProductGuide.jsx` — Main view
- `client/src/components/products/ProductCard.jsx` — Product cards
- `client/src/components/products/ProblemSolutionCard.jsx` — Problem mapping
- `client/src/components/products/PersonaCard.jsx` — Persona cards

### Files to Modify
- `client/src/App.jsx` — Add 'products' to activeView options
- `client/src/components/layout/Header.jsx` — Add Products tab
- `client/src/components/layout/MainContent.jsx` — Route to ProductGuide
- `client/src/components/layout/MobileNav.jsx` — Add Products nav item
- `client/src/data/learningContent.js` — Enhance with product mappings
- `client/src/data/flashcards.js` — Add product discovery cards
- `client/src/styles.css` — Product Guide styles

### Verification
- All 8 products display correctly in Product Guide
- Three tabs (Products, Problems, Personas) functional
- Cross-links navigate correctly between Learn and Products
- Enhanced Learn sections show product mappings
- New flashcard category appears in Drill mode
- Mobile responsive behavior works
- Light/dark theme compatibility
