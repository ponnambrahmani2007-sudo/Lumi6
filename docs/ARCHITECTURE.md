# Lumi6 — Technical Architecture & System Design

> **Document Version:** 1.0.0  
> **Status:** Architecture Blueprint  
> **Target Audience:** Engineering Leads, Software Architects, Full-Stack Developers  
> **Product:** Lumi6 — Think. Explore. Discover.

---

## 1. System Overview & Architecture Principles

Lumi6 is engineered as a modern, responsive, client-first web application powered by **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. 

The system is designed around five core architectural tenets:
1. **Separation of Content and Engine:** Learning activities are defined as declarative, strongly typed data structures. The rendering engine remains completely agnostic of the specific academic subject.
2. **Mobile-First & Touch-Native:** All interactive canvas elements, simulation controls, and navigation pathways operate with zero reliance on mouse hover states or fine desktop cursor control.
3. **Graceful Offline & Resilient Storage:** Discovery notes, drawing artifacts, and progress checkpoints persist immediately to local browser storage (`IndexedDB` / `localStorage`) before any optional remote network sync occurs.
4. **Scaffolded Help State Machine:** The progressive assistance system is driven by a deterministic finite state machine (FSM), ensuring repeatable and measurable pedagogical support across every subject.
5. **Security by Isolation:** Future server-side AI integrations and parental dashboards are strictly sandboxed through server-side API routes and gated boundaries, guaranteeing that no raw child queries or personal identifiers leak to external third parties.

---

## 2. High-Level System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT BROWSER                                    │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │                            Presentation Layer                              │  │
│  │  ┌───────────────────────┐ ┌───────────────────────┐ ┌──────────────────┐  │  │
│  │  │   Public Marketing    │ │ Child Learning Shell  │ │ Grown-ups Portal │  │  │
│  │  │ (Home, About, Explore)│ │(Dashboard, Think, Nav)│ │ (Summary, Auth) │  │  │
│  │  └───────────────────────┘ └───────────────────────┘ └──────────────────┘  │  │
│  └─────────────────────────────────────┬──────────────────────────────────────┘  │
│                                        │                                         │
│  ┌─────────────────────────────────────▼──────────────────────────────────────┐  │
│  │                        Lumi6 Learning Engine                               │  │
│  │  ┌───────────────────────┐ ┌───────────────────────┐ ┌──────────────────┐  │  │
│  │  │  Activity Runner FSM  │ │ 6-Tier Help Ladder    │ │ Interactive      │  │  │
│  │  │ (Inquire->Learn->Save)│ │ (Progressive Scaffld) │ │ Canvas / Sim     │  │  │
│  │  └───────────────────────┘ └───────────────────────┘ └──────────────────┘  │  │
│  └─────────────────────────────────────┬──────────────────────────────────────┘  │
│                                        │                                         │
│  ┌─────────────────────────────────────▼──────────────────────────────────────┐  │
│  │                         Data & Storage Layer                               │  │
│  │  ┌─────────────────────────────────┐ ┌───────────────────────────────────┐  │  │
│  │  │  Local Content Registry         │ │  Client Repository                │  │  │
│  │  │  (Static Subject/Activity Data) │ │  (IndexedDB / LocalStorage)       │  │  │
│  │  └─────────────────────────────────┘ └─────────────────┬─────────────────┘  │  │
│  └────────────────────────────────────────────────────────┼───────────────────┘  │
└───────────────────────────────────────────────────────────┼──────────────────────┘
                                                            │ (Future Sync)
                                                            ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            SERVER INFRASTRUCTURE                                 │
│                                                                                  │
│  ┌─────────────────────────────┐         ┌────────────────────────────────────┐  │
│  │ Next.js API Routes (BFF)    │         │ Server-Side AI Gateway             │  │
│  │ - Session Token Validation  │         │ - Prompt Guardrails & PII Filter   │  │
│  │ - Parent Auth & Consent Gate│         │ - Structured Educational Responses │  │
│  └──────────────┬──────────────┘         └────────────────┬───────────────────┘  │
│                 │                                         │                      │
│  ┌──────────────▼─────────────────────────────────────────▼───────────────────┐  │
│  │ Optional Cloud Persistence (Supabase / PostgreSQL)                          │  │
│  │ - Row Level Security (RLS)                                                 │  │
│  │ - Parent Accounts & Linked Anonymous Child Profiles                        │  │
│  └────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack Specification

| Layer | Technology | Version / Tool | Architectural Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.x` / `15.x` | Hybrid rendering (SSG for fast SEO marketing pages, SSR/Client components for dynamic interactive micro-worlds). |
| **UI Library** | React | `18.x` / `19.x` | Declarative UI, state management, concurrent rendering for smooth simulations. |
| **Language** | TypeScript | `5.x` (Strict) | End-to-end type safety across activity models, engine states, and local storage contracts. |
| **Styling** | Tailwind CSS | `3.4+` | Rapid token-based responsive styling, custom color variables, and fluid typography. |
| **Component Primitives**| shadcn/ui & Radix UI | Latest | Accessible, unstyled primitives (Dialog, Slider, Tooltip, Tabs) customized with kid-friendly geometry and generous hit targets. |
| **Iconography** | Lucide React | Latest | Clean, friendly vector icons with customizable stroke width and color fills. |
| **Graphics & Simulation**| HTML5 Canvas + SVG | Native Web APIs | Hardware-accelerated 2D rendering for light refraction, circuit wiring, coordinate grids, and drawing surfaces without bloated third-party game engines. |
| **Validation** | Zod | `3.x` | Runtime schema validation for activity content definitions, inquiry inputs, and local storage data migrations. |
| **Testing** | Vitest + React Testing Library + Playwright | Latest | Fast unit testing for the learning engine, accessible component testing, and automated cross-browser e2e verification. |
| **Future Database** | Supabase (PostgreSQL) | Cloud / Self-hosted | Relational schema with built-in Row-Level Security (RLS), ideal for separating parent accounts from child learning logs. |

---

## 4. Route Organization & Directory Hierarchy

The project follows the standard Next.js App Router structure with logical route groups separating **public marketing**, **child learning**, and **grown-ups** contexts.

```
lumi6/
├── app/
│   ├── (public)/                       # Public marketing & informational routes
│   │   ├── page.tsx                    # Route: / (Homepage)
│   │   ├── how-it-works/
│   │   │   └── page.tsx                # Route: /how-it-works
│   │   ├── features/
│   │   │   └── page.tsx                # Route: /features
│   │   ├── explore/
│   │   │   └── page.tsx                # Route: /explore
│   │   ├── privacy/
│   │   │   └── page.tsx                # Route: /privacy
│   │   └── help/
│   │       └── page.tsx                # Route: /help
│   │
│   ├── (learning)/                     # Child learning hub & interactive activities
│   │   ├── layout.tsx                  # Child shell: friendly navbar, avatar, discovery drawer
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Route: /dashboard
│   │   ├── think/
│   │   │   └── page.tsx                # Route: /think
│   │   ├── subjects/
│   │   │   └── [subject]/
│   │   │       └── page.tsx            # Route: /subjects/[subject]
│   │   ├── topics/
│   │   │   └── [topic]/
│   │   │       └── page.tsx            # Route: /topics/[topic]
│   │   ├── learn/
│   │   │   └── [activity]/
│   │   │       └── page.tsx            # Route: /learn/[activity] (Learning Engine runner)
│   │   ├── discoveries/
│   │   │   └── page.tsx                # Route: /discoveries
│   │   ├── challenges/
│   │   │   └── page.tsx                # Route: /challenges
│   │   └── settings/
│   │       └── page.tsx                # Route: /settings
│   │
│   ├── (grown-ups)/                    # Parent & teacher overview area
│   │   ├── grown-ups/
│   │   │   ├── page.tsx                # Route: /grown-ups (Pedagogical overview & tips)
│   │   │   └── dashboard/
│   │   │       └── page.tsx            # Route: /grown-ups/dashboard (Gated progress review)
│   │
│   ├── api/                            # Server-side API endpoints
│   │   ├── inquiry/route.ts            # Sanitized inquiry mapping (future AI gateway)
│   │   └── parent-gate/route.ts        # Age-verification & adult session check
│   │
│   ├── globals.css                     # Tailwind CSS directives & color variables
│   └── layout.tsx                      # Root layout (HTML shell, font declarations)
│
├── components/
│   ├── ui/                             # Base shadcn/ui primitives (button, slider, dialog, card)
│   ├── shared/                         # Cross-cutting components (Navbar, Footer, AvatarBadge)
│   ├── engine/                         # Lumi6 Learning Engine Core
│   │   ├── ActivityRunner.tsx          # Master state machine orchestrator
│   │   ├── StepHeader.tsx              # Activity title, progress indicator, reset button
│   │   ├── PredictionPrompt.tsx        # Hypothesis selection widget
│   │   ├── ObservationPanel.tsx        # Dynamic observation prompts & state readouts
│   │   ├── HelpLadder.tsx              # 6-tier progressive assistance modal / drawer
│   │   ├── ReflectionStep.tsx          # Discovery summary & note taking
│   │   └── CanvasBoard.tsx             # Drawing, sketch & annotation canvas
│   │
│   ├── simulations/                    # Specialized interactive visual micro-worlds
│   │   ├── science/
│   │   │   └── PrismRefractionCanvas.tsx  # Interactive light beam, prism & rainbow spectrum
│   │   ├── math/
│   │   │   └── FractionPizzaCanvas.tsx     # Interactive circular pizza & proportional slicing
│   │   └── coding/
│   │       └── RobotGridCanvas.tsx         # Interactive grid navigation & sequence execution
│   │
│   └── cards/                          # SubjectCard, TopicCard, DiscoveryCard, ChallengeCard
│
├── content/                            # Declarative activity data & subject registry
│   ├── subjects.ts                     # Metadata for all 9 subjects
│   ├── topics.ts                       # Topic catalog mapped to subjects
│   └── activities/                     # Typed activity definition files
│       ├── science-rainbow-machine.ts  # Science activity definition
│       ├── math-pizza-fractionizer.ts  # Math activity definition
│       └── coding-robot-navigator.ts   # Coding activity definition
│
├── lib/                                # Utility functions & state storage
│   ├── engine-types.ts                 # Core TypeScript interfaces & Zod schemas
│   ├── storage/
│   │   ├── discovery-repository.ts     # LocalStorage / IndexedDB abstraction
│   │   └── settings-repository.ts      # User preferences & avatar state
│   ├── utils.ts                        # Tailwind class mergers (clsx + twMerge)
│   └── inquiry-parser.ts               # Keyword/topic classifier for Think Space
│
├── docs/                               # Product & technical documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   └── IMPLEMENTATION_PLAN.md
│
└── public/                             # Static assets, SVG icons, sound effects
```

---

## 5. Learning Engine Architecture & State Machine

### 5.1 Pedagogical State Transitions
The core interactive learning experience is managed by a deterministic Finite State Machine (FSM). This guarantees consistency whether the child is balancing algebraic equations or observing light refraction.

```
       ┌───────────────┐
       │ 1. INTRODUCE  │  (Real-world context, mystery phenomenon)
       └───────┬───────┘
               │ "I'm ready to predict!"
               ▼
       ┌───────────────┐
       │ 2. PREDICT    │  (Select hypothesis; zero penalty)
       └───────┬───────┘
               │ "Test my prediction!"
               ▼
       ┌───────────────┐
 ┌───► │ 3. EXPERIMENT │ ◄───┐  (Direct manipulation of canvas/simulation)
 │     └───────┬───────┘     │
 │             │ "Look what happened!"
 │             ▼             │
 │     ┌───────────────┐     │
 │     │ 4. OBSERVE    │ ────┘  (Compare result against hypothesis)
 │     └───────┬───────┘
 │             │ "Need a boost?" (Optional, non-blocking)
 │             ▼
 │     ┌───────────────┐
 └──── │ 5. ASSIST     │  (Progressive Help Ladder: 6 escalation tiers)
       └───────┬───────┘
               │ "Try a new challenge!"
               ▼
       ┌───────────────┐
       │ 6. APPLY      │  (Transfer challenge to a modified scenario)
       └───────┬───────┘
               │ "Keep my discovery!"
               ▼
       ┌───────────────┐
       │ 7. REFLECT    │  (Draw, add personal notes, save Discovery Card)
       └───────┬───────┘
               │ Completed!
               ▼
       ┌───────────────┐
       │ 8. COMPLETE   │  (Return to Topic / Discoveries portfolio)
       └───────────────┘
```

### 5.2 State Machine Interface Definition
```typescript
export type ActivityStep = 
  | 'INTRODUCE'
  | 'PREDICT'
  | 'EXPERIMENT'
  | 'OBSERVE'
  | 'APPLY'
  | 'REFLECT'
  | 'COMPLETE';

export interface ActivitySessionState {
  activityId: string;
  currentStep: ActivityStep;
  prediction?: string;
  experimentVariables: Record<string, number | string | boolean>;
  activeHelpTier: number; // 0 (none) to 6 (complete explanation)
  observationNotes?: string;
  drawingDataUri?: string;
  isCompleted: boolean;
  timestampStarted: number;
}
```

---

## 6. Activity Content Model & TypeScript Schemas

All learning activities are declared as strongly typed objects validated at build and runtime via **Zod**. This ensures that curriculum creators can curate content safely without writing UI code.

### 6.1 Schema Specification (`lib/engine-types.ts`)

```typescript
import { z } from 'zod';

export const HelpTierSchema = z.object({
  tier: z.number().min(1).max(6),
  title: z.string(),
  description: z.string(),
  highlightElementId: z.string().optional(),
  analogyDiagramUrl: z.string().optional(),
});

export const PredictionOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  explanationSnippet: z.string(),
  icon: z.string().optional(),
});

export const ActivityDefinitionSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  topicId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  estimatedMinutes: z.number().default(10),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  
  // 1. Introduction Step
  introduction: z.object({
    hookQuestion: z.string(),
    realWorldScenario: z.string(),
    illustrationUrl: z.string().optional(),
  }),

  // 2. Prediction Step
  prediction: z.object({
    prompt: z.string(),
    options: z.array(PredictionOptionSchema).min(2),
  }),

  // 3. Interactive Simulation Parameters
  simulation: z.object({
    componentName: z.string(), // Maps to simulation component registry
    initialParameters: z.record(z.union([z.number(), z.string(), z.boolean()])),
    controls: z.array(z.object({
      id: z.string(),
      label: z.string(),
      type: z.enum(['slider', 'toggle', 'color-picker', 'select']),
      min: z.number().optional(),
      max: z.number().optional(),
      step: z.number().optional(),
      options: z.array(z.string()).optional(),
      defaultValue: z.union([z.number(), z.string(), z.boolean()]),
    })),
  }),

  // 4. Observation Feedback
  observation: z.object({
    keyTakeawayPrompt: z.string(),
    whatHappenedExplanation: z.string(),
  }),

  // 5. Progressive Help Ladder (6 tiers)
  helpLadder: z.array(HelpTierSchema).length(6),

  // 6. Transfer Challenge
  challenge: z.object({
    prompt: z.string(),
    targetCondition: z.record(z.union([z.number(), z.string(), z.boolean()])),
    successMessage: z.string(),
  }),

  // 7. Reflection & Synthesis
  reflection: z.object({
    defaultSummary: z.string(),
    drawingPrompt: z.string(),
    discussionPromptForGrownUps: z.string(),
  }),
});

export type ActivityDefinition = z.infer<typeof ActivityDefinitionSchema>;
```

---

## 7. Interactive Simulation & Drawing Engine

### 7.1 Simulation Execution Pipeline
Simulations (such as the Light Refraction Prism, Fraction Pizza, and Robot Navigator) operate inside isolated, reactive viewports:
- **Zero-Dependency Graphics:** Written using native HTML5 2D Canvas or reactive SVG elements. This eliminates dependencies on heavy game frameworks (e.g., Phaser or Three.js) while ensuring load times under 200ms and minimal memory footprint on mobile devices.
- **Parametric Binding:** The parent `<ActivityRunner />` maintains the state of all sliders and switches. Whenever an input changes, the parameter updates pass into the simulation component via typed props, triggering an immediate render pass.
- **Physics Tick:** Continuous phenomena (such as light rays propagating or motors spinning) run on an encapsulated `requestAnimationFrame` loop with delta-time smoothing and frame capping to preserve battery life on student tablets.

### 7.2 The Canvas Drawing Engine (`CanvasBoard.tsx`)
The integrated drawing and annotation tool provides:
1. **Pointer Events Normalization:** Uses `PointerEvent` (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) with `touch-action: none`, ensuring seamless input across fingers, styluses (Apple Pencil, S-Pen), and mice.
2. **Path Smoothing:** Real-time quadratic Bézier curve interpolation smooths jittery input from younger learners.
3. **Layer Management:** Supports two layers:
   - *Background Layer:* Contains the current simulation snapshot or activity template.
   - *Active Ink Layer:* The child's freehand drawings, arrows, and highlights.
4. **Serialization & Export:** Renders the combined layers into a compressed Data URI (`image/png` or `image/webp`) saved directly into the child's local `DiscoveryCard`.

---

## 8. Data Boundaries, Persistence & Future Integrations

### 8.1 Client-First Repository Pattern
Lumi6 decouples storage logic from UI components using an explicit repository interface:

```typescript
export interface IDiscoveryRecord {
  id: string;
  activityId: string;
  subjectId: string;
  title: string;
  notes: string;
  drawingUri?: string;
  variablesSnapshot: Record<string, unknown>;
  createdAt: string;
}

export interface ILearningRepository {
  getDiscoveries(): Promise<IDiscoveryRecord[]>;
  saveDiscovery(discovery: Omit<IDiscoveryRecord, 'id' | 'createdAt'>): Promise<IDiscoveryRecord>;
  deleteDiscovery(id: string): Promise<boolean>;
  getLearnerSettings(): Promise<LearnerSettings>;
  updateLearnerSettings(settings: Partial<LearnerSettings>): Promise<LearnerSettings>;
  clearAllData(): Promise<void>;
}
```

In Phase 1, `LocalLearningRepository` implements this interface using `localStorage` with an in-memory fallback. This ensures the application runs completely independently without requiring database credentials.

### 8.2 Future Cloud Persistence Architecture (Phase 2)
When cloud synchronization is activated:
- **Backend:** Supabase / PostgreSQL.
- **Authentication:** Supabase Auth for parents (email magic link or passwordless). Children access their profiles via parent-authorized session tokens.
- **Database Schema:**
  - `adult_accounts`: Contains parent credentials, consent timestamps, and pin.
  - `child_profiles`: Contains pseudonymized handles, avatar IDs, and accessibility preferences.
  - `discoveries`: Contains saved activities, serialized sketches, and observation notes with foreign keys pointing to `child_profiles.id`.
- **Row-Level Security (RLS):** Child records are accessible only through authenticated parent tokens or signed child session cookies.

### 8.3 Server-Side AI Gateway Architecture (Future Integration)
To preserve child safety, no direct browser-to-LLM connections are permitted:
```
[ Child Browser ]
       │  (POST /api/inquiry with user question)
       ▼
[ Next.js API Gateway ]
       ├── 1. PII Redaction Filter (Regex + Name Scrubber)
       ├── 2. Safe-Topic Classification (Guardrails)
       ├── 3. Pediatric Pedagogical System Prompt Injection
       ▼
[ External AI Model (OpenAI / Claude / Gemini) ]
       │  (Streams structured JSON tokens)
       ▼
[ Next.js API Gateway ]
       ├── 4. Response Output Sanitizer
       └── 5. Formatted Concept Card & Suggested Activities
       ▼
[ Child Browser ] (Renders visual learning pills)
```

---

## 9. Accessibility, Internationalization & Performance Standards

### 9.1 Accessibility Engineering
- **WCAG 2.1 Level AA Compliance:** Color contrast ratios strictly $\ge 4.5:1$ for body copy and $\ge 3:1$ for large text and UI boundaries.
- **Focus Ring Standard:** Every interactive button, slider, toggle, and tab includes an explicit high-contrast focus indicator (`focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:ring-offset-2`).
- **Screen Reader ARIA Semantics:**
  - Simulation viewports are wrapped in `<div role="region" aria-label="Interactive experiment canvas">`.
  - Sliders provide explicit `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and human-readable `aria-valuetext` (e.g. `aria-valuetext="Angle: 45 degrees"`).
  - Help ladder reveals use `aria-live="polite"` regions so assistive technology announces clues without interrupting user focus.

### 9.2 Performance Budgets
- **Total Initial JS Bundle:** `< 160 KB` (gzipped).
- **Interactive Component Lazy Loading:** Heavy simulation components are dynamically loaded via `next/dynamic` with `ssr: false` to ensure instant initial page paints.
- **Zero Heavy Assets:** All icons are vector SVG (`lucide-react`); all illustrations use lightweight SVG or WebP formats.

---

## 10. Testing Strategy

The test pyramid guarantees reliability, visual correctness, and safety across all platforms.

```
       ▲
      / \        Playwright End-to-End Tests
     /   \       (Full 9-step learning loop, touch simulation, viewport checks)
    /─────\
   /       \     React Testing Library & Component Tests
  /         \    (HelpLadder tiers, Prediction prompt, Canvas drawing events)
 /───────────\
/             \  Vitest Unit Tests
───────────────── (Learning state machine transitions, Zod schemas, repo methods)
```

1. **Unit Testing (Vitest):**
   - Verification of the 9-step activity state transitions.
   - Progressive Help Ladder escalation rules (1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6).
   - Zod schema validation of all subject and activity definitions.
   - Local storage serialization, migration, and error handling.
2. **Component & Accessibility Testing (RTL + axe-core):**
   - Automated axe audits on all public and learning page layouts.
   - Keyboard traversal verification across all activity controls.
   - Touch event handling and preventDefault checks on canvas tools.
3. **End-to-End Testing (Playwright):**
   - Cross-device verification: iPhone (Safari/WebKit), Android (Chromium), Tablet, and Desktop.
   - Full user journey verification: Landing ➔ Explore ➔ Subject ➔ Learn Activity ➔ Prediction ➔ Simulation ➔ Help Ladder ➔ Save Discovery ➔ Review in Portfolio.
