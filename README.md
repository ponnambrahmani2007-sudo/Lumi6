# Lumi6 — Think. Explore. Discover.

> A complete, interactive, multi-subject learning environment designed for children aged 8–12.  
> **Think. Explore. Discover.**

---

## 🌟 Overview

**Lumi6** is an interactive learning platform that transforms children from passive consumers into active thinkers. Rather than memorizing formulas or watching long videos, children on Lumi6 construct deep conceptual understanding by:
- **Asking questions** freely in an open-ended Think Space.
- **Formulating predictions** without fear of judgment or wrong-answer penalties.
- **Experimenting directly** with interactive, real-time visual micro-worlds.
- **Drawing and diagramming** their evolving mental models.
- **Accessing progressive help** on demand through a 6-tier scaffolded assistance ladder.
- **Applying discoveries** to novel challenges and saving them to a personal learning journal.

Lumi6 provides a unified, reusable learning architecture across **9 foundational disciplines**: Science & Physics, Mathematics, Chemistry, Biology, Art & Creativity, Coding & Logic, Earth & Environment, Language & Communication, and Engineering.

---

## 📚 Product & Technical Documentation

The product architecture and requirements are comprehensively documented in the [`docs/`](./docs/) directory:

| Document | Description |
| :--- | :--- |
| **[Product Requirements Document (PRD)](./docs/PRD.md)** | Product vision, target personas (children 8–12 & grown-ups), 9 subject areas, 15 core features, the 9-step learning loop, 6-tier help ladder, UX standards, child safety guidelines, and acceptance criteria. |
| **[Technical Architecture Specification](./docs/ARCHITECTURE.md)** | Technical design, Next.js App Router structure, component hierarchy, FSM learning engine, declarative Zod content model, HTML5 Canvas/SVG simulation pipeline, client-first storage, future AI gateway, and testing strategy. |
| **[Sequential Implementation Plan](./docs/IMPLEMENTATION_PLAN.md)** | 9 sequential engineering phases with clear tasks, dependencies, deliverables, and acceptance criteria. |
| **[Existing System Audit Report](./docs/EXISTING_SYSTEM_AUDIT.md)** | Thorough audit of the existing workspace, AI connection status, Talk/Write mode architecture, visual simulation pipeline, and data boundaries. |
| **[AI Setup & Integration Guide](./docs/AI_SETUP.md)** | Complete guide for configuring Google Gemini server-side credentials, offline deterministic fallbacks, PII scrubbing, and rate limits. |

---

## 🛠️ Planned Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom child-friendly palette (Soft Lavender, Mint, Warm Yellow, Calm Neutrals)
- **Component Primitives:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/) customized with 48px+ touch targets
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visuals & Simulations:** Native HTML5 2D Canvas & Reactive SVG (zero heavy third-party game engines)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Persistence (Release 1.0):** Client-side `IndexedDB` & `localStorage` with a clean Repository Pattern
- **Testing:** [Vitest](https://vitest.dev/), React Testing Library, [Playwright](https://playwright.dev/)

---

## 🗂️ Project Directory Structure

```
lumi6/
├── app/                                # Next.js App Router hierarchy
│   ├── (public)/                       # Public routes (/, /how-it-works, /features, /explore, /privacy, /help)
│   ├── (learning)/                     # Child learning hub (/dashboard, /think, /subjects, /topics, /learn, /discoveries, /challenges, /settings)
│   ├── (grown-ups)/                    # Grown-ups overview & dashboard (/grown-ups, /grown-ups/dashboard)
│   ├── api/                            # Server-side API endpoints & future AI gateway
│   ├── globals.css                     # Design tokens & Tailwind directives
│   └── layout.tsx                      # Root HTML shell & typography
│
├── components/
│   ├── ui/                             # Base shadcn/ui primitives (Button, Card, Slider, Dialog, Tabs)
│   ├── shared/                         # Cross-cutting components (Navbar, Footer, AvatarBadge)
│   ├── engine/                         # Lumi6 Learning Engine (ActivityRunner, HelpLadder, CanvasBoard, etc.)
│   ├── simulations/                    # Interactive micro-worlds (PrismRefraction, FractionPizza, RobotGrid)
│   └── cards/                          # SubjectCard, TopicCard, DiscoveryCard, ChallengeCard
│
├── content/                            # Declarative, strongly typed curriculum data
│   ├── subjects.ts                     # Metadata for all 9 subjects
│   ├── topics.ts                       # Topic catalog mapped to subjects
│   └── activities/                     # Typed activity definitions (Science, Math, Coding)
│
├── docs/                               # Comprehensive specification files
│   ├── PRD.md                          # Product Requirements Document
│   ├── ARCHITECTURE.md                 # Technical Architecture & System Design
│   └── IMPLEMENTATION_PLAN.md          # 9-Phase Sequential Implementation Roadmap
│
├── lib/                                # Core logic, storage repositories & TypeScript types
│   ├── engine-types.ts                 # Zod schemas & TypeScript interfaces
│   ├── storage/                        # Discovery & settings storage abstraction
│   ├── inquiry-parser.ts               # Keyword routing for Think Space
│   └── utils.ts                        # Utility helpers
│
└── public/                             # Static assets, SVG illustrations & audio chimes
```

---

## 🚀 Getting Started & Local Development

### Quick Start (Zero-Dependency Node.js Server)
1. Ensure [Node.js](https://nodejs.org/) (version 18+) is installed.
2. (Optional) Set up your Gemini API key in `.env.local`:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add: GEMINI_API_KEY=your_key_here
   ```
3. Start the Lumi6 server:
   ```bash
   node server.js
   # or: npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.
   *(Note: If no API key is provided, Lumi6 runs automatically in full offline deterministic mode!)*

### Standalone Browser Mode (No Server Required)
You can also open [`index.html`](./index.html) directly in any modern browser to interact with Talk Mode, Write Mode, the Shadow & Light simulator, Prism & Rainbow chamber, flashcards, quizzes, and local progress tracking immediately!

### Verification & Testing
Execute the automated test suites:
```bash
# Run backend & logic verification tests
node tests/think-first-engine.test.js
# or: npm test
```
Or open [`tests/test-runner.html`](./tests/test-runner.html) directly in your browser to run the 12-test automated verification suite with visual status indicators.

---

## 🛡️ Child Safety & Privacy Pledge

1. **No Personal Data Collection:** Children can explore, draw, and save discoveries without submitting their real name, email, phone number, address, or photos.
2. **Zero Third-Party Trackers:** No marketing trackers, behavioral pixels, or commercial advertisements are permitted.
3. **Calm, Ethical Engagement:** No artificial urgency, no countdown timers, no punitive streaks, and no micro-transactions.
4. **Isolated AI Gateway:** Any future AI interactions are mediated strictly via server-side endpoints with automated PII scrubbing and strict pedagogical guardrails.

---

## 📌 Project Status

- **Current State:** Part 3 Complete (Think-First AI & Interactive Learning Features fully implemented and verified).
- **Interactive Experience:** Open [`index.html`](./index.html) in any modern web browser to interactively explore Talk Mode (voice input & synthesis), Write Mode, Shadow & Light simulation, Prism & Rainbow simulation, 5-tier Progressive Hints, Thinking Flashcards, and Milestone Quizzes.
- **Automated Verification:** Open [`tests/test-runner.html`](./tests/test-runner.html) to run the browser-based automated verification suite.
