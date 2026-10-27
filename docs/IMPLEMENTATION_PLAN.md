# Lumi6 — Sequential Implementation Plan

> **Document Version:** 1.0.0  
> **Status:** Implementation Roadmap  
> **Target Audience:** Engineering Team, Project Management, QA  
> **Product:** Lumi6 — Think. Explore. Discover.

---

## 1. Plan Overview & Execution Principles

This implementation plan outlines the engineering progression required to deliver **Lumi6 Release 1.0**. 

### Execution Principles:
- **Phase Gate Protocol:** Each phase must satisfy its defined acceptance criteria before subsequent phases begin.
- **Zero Placeholder Polish:** Every component introduced must be fully styled, responsive, accessible, and functional.
- **Client-First Independence:** The initial release delivers full interactive value using local storage and static curriculum registries, preventing blocking dependencies on cloud backends or external AI keys.
- **Cross-Subject Cohesion:** The UI and interaction grammar established in the first activity must be 100% reusable across all subsequent subjects.

---

## 2. Implementation Phases Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Project Setup, Tooling & Design System Foundations            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 2: Public Marketing & Informational Surfaces                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 3: Learning Core Engine, FSM & Progressive Help Ladder           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 4: Think Space & Inquiry Routing Engine                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 5: Three Flagship Interactive Activities (Science, Math, Coding) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 6: Practice Challenges, Subject & Topic Deep Dives               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 7: My Discoveries Portfolio, Canvas Drawing & Settings           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 8: Grown-ups Area & Parental Overview                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 9: Accessibility Audit, Performance Optimization & Polish        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Phase Specifications

### Phase 1: Project Setup, Tooling & Design System Foundations

#### Purpose
Establish the core Next.js application, TypeScript environment, Tailwind configuration, design tokens, and base component primitives.

#### Tasks
1. Initialize Next.js project with App Router, TypeScript, ESLint, and PostCSS.
2. Configure Tailwind CSS with the Lumi6 color tokens (`brand-lavender`, `brand-mint`, `brand-yellow`, `surface-neutral`, `ink-primary`).
3. Set up shadcn/ui primitive library with accessible Radix UI wrappers (`Button`, `Card`, `Slider`, `Dialog`, `Tabs`, `Tooltip`, `Badge`).
4. Install `lucide-react` for iconography.
5. Create shared root layout (`app/layout.tsx`) with font configuration (`Plus Jakarta Sans`), metadata, and responsive viewport meta tags.
6. Configure Vitest and Playwright test harnesses.

#### Dependencies
None (Clean workspace setup).

#### Expected Deliverables
- Functional Next.js App Router workspace compiling with 0 TypeScript/ESLint warnings.
- `tailwind.config.ts` containing the custom palette, typography scale, and border radiuses.
- Core UI primitive components in `components/ui/`.
- Test runner configuration (`vitest.config.ts`, `playwright.config.ts`).

#### Acceptance Criteria
- `npm run build` succeeds cleanly.
- `npm run test` executes successfully.
- Color contrast between all primary text and background tokens passes WCAG 2.1 AA ($\ge 4.5:1$).

---

### Phase 2: Public Marketing & Informational Surfaces

#### Purpose
Construct the public-facing pages that establish Lumi6's brand identity, communicate its unique pedagogical philosophy, and outline child safety principles.

#### Tasks
1. Build the Public Homepage (`/`):
   - Hero section with interactive mini-visual teaser and clear dual CTAs.
   - "What are you curious about today?" inquiry spark bar.
   - 3 interactive feature highlight cards.
   - Child safety and zero-ad pledge banner.
2. Build the "How It Works" Page (`/how-it-works`):
   - Visual breakdown of the 9-step learning loop (**Ask ➔ Predict ➔ Experiment ➔ Understand ➔ Apply**).
   - Interactive preview of the 6-tier Progressive Help Ladder.
3. Build the Features Showcase Page (`/features`):
   - Detailed demos of the interactive canvas, drawing tools, and curiosity tree.
4. Build the Explore Subjects Directory (`/explore`):
   - Grid of 9 subject cards with icons, topic counts, and color badges.
   - Filter and search mechanism (filter by subject, difficulty, time).
5. Build the Privacy Policy (`/privacy`) and Help/FAQ (`/help`) pages:
   - Plain-English child summary plus technical disclosures for parents.
   - Interactive visual tool guide for children.
6. Build shared public header and footer with mobile hamburger navigation.

#### Dependencies
Phase 1 (Design tokens and UI primitives).

#### Expected Deliverables
- Fully rendered routes for `/`, `/how-it-works`, `/features`, `/explore`, `/privacy`, and `/help`.
- Shared `PublicNavbar` and `PublicFooter` components.
- Responsive mobile drawer navigation.

#### Acceptance Criteria
- All 6 routes render correctly on mobile (360px), tablet (768px), and desktop (1280px).
- Navigation links between public pages function with 0 broken links.
- Lighthouse Accessibility score of $\ge 95$ on all public routes.

---

### Phase 3: Learning Core Engine, FSM & Progressive Help Ladder

#### Purpose
Engineer the reusable pedagogical engine, finite state machine, and progressive assistance ladder that powers every learning activity.

#### Tasks
1. Implement the Activity State Machine (`components/engine/ActivityRunner.tsx`):
   - Step management: `INTRODUCE` ➔ `PREDICT` ➔ `EXPERIMENT` ➔ `OBSERVE` ➔ `APPLY` ➔ `REFLECT` ➔ `COMPLETE`.
   - Variable bindings and synchronization between UI controls and the canvas simulation.
2. Build the Prediction Prompt Widget (`components/engine/PredictionPrompt.tsx`):
   - Multi-option hypothesis cards with zero-judgment feedback.
3. Build the Observation Panel (`components/engine/ObservationPanel.tsx`):
   - Live visual readouts comparing experimental outcomes against the child's prediction.
4. Build the 6-Tier Progressive Help Ladder (`components/engine/HelpLadder.tsx`):
   - Tier 1: Gentle Hint.
   - Tier 2: Highlight Detail.
   - Tier 3: Stronger Clue.
   - Tier 4: Similar Example.
   - Tier 5: Guided Solution.
   - Tier 6: Complete Explanation.
   - Accessible modal/drawer interface with step-by-step unmasking.
5. Define TypeScript schemas and Zod validators in `lib/engine-types.ts`.

#### Dependencies
Phase 1 & Phase 2.

#### Expected Deliverables
- `<ActivityRunner />` orchestrator component.
- Complete 6-tier `<HelpLadder />` component.
- Unit test suite verifying state machine transitions and help tier escalation logic.

#### Acceptance Criteria
- Unit tests verify 100% of state transitions in the 9-step learning loop.
- Escalating from Tier 1 to Tier 6 functions smoothly and preserves user input state.
- Screen readers announce newly revealed help clues via `aria-live="polite"`.

---

### Phase 4: Think Space & Inquiry Routing Engine

#### Purpose
Create the open-ended question hub (`/think`) that allows children to type or select questions and maps them to appropriate learning pathways.

#### Tasks
1. Build the Think Space Page (`/think`):
   - Welcoming search/query bar with voice-input mock/readiness and suggestion chips.
   - "Curiosity Sparks" carousel presenting intriguing real-world phenomena.
2. Build the Inquiry Routing Logic (`lib/inquiry-parser.ts`):
   - Rule-based natural language classifier matching child keywords (e.g. "rainbow", "straw", "color", "light") to relevant curriculum activities.
   - Safe-query filter redirecting non-academic questions to friendly learning prompts.
3. Build the Child Navigation Shell (`app/(learning)/layout.tsx`):
   - Top banner with avatar, subject shortcuts, Think Space button, and My Discoveries counter.

#### Dependencies
Phase 1, Phase 2, and Phase 3.

#### Expected Deliverables
- `/think` route with interactive question parser and suggestions.
- Child learning layout shell applied to all `(learning)` routes.
- Keyword routing engine supporting all 9 curriculum domains.

#### Acceptance Criteria
- Submitting sample questions (e.g., *"Why does light bend?"*, *"What is half of a half?"*, *"How do computers repeat things?"*) correctly resolves to relevant activities.
- Mobile-responsive input bar with 48px touch targets and clear focus rings.

---

### Phase 5: Three Flagship Interactive Activities

#### Purpose
Implement three complete, polished, and distinct interactive activities demonstrating the cross-curricular flexibility of the learning engine.

#### Activity 1: Science & Physics — *The Rainbow Machine (Light & Prisms)*
- **Topic:** Light, Refraction, Snell's Law, and Color Dispersion.
- **Component:** `PrismRefractionCanvas.tsx` (HTML5 Canvas).
- **Interactive Controls:** Light angle slider ($0^\circ$ to $90^\circ$), prism material selector (Glass, Water, Diamond), light beam color toggle (White sunlight vs Monochromatic laser).
- **Core Mystery:** *"Why does clear glass turn white sunlight into a full rainbow?"*

#### Activity 2: Mathematics — *Visual Fractions & Pizza Slices*
- **Topic:** Fractions, Proportions, and Equivalence.
- **Component:** `FractionPizzaCanvas.tsx` (Interactive SVG / Canvas).
- **Interactive Controls:** Slice denominator slider ($2$ to $12$), slice selector (tap to highlight eaten slices), equivalent fraction balance beam.
- **Core Mystery:** *"Is $\frac{2}{4}$ of a pizza really the exact same amount of food as $\frac{1}{2}$?"*

#### Activity 3: Coding & Logic — *Robot Navigator (Sequencing & Loops)*
- **Topic:** Algorithms, Sequential Execution, Repeat Loops, and Debugging.
- **Component:** `RobotGridCanvas.tsx` (Interactive Grid Canvas).
- **Interactive Controls:** Command card deck (`Step Forward`, `Turn Left`, `Turn Right`, `Repeat [N]`), code sequencer tray, step-by-step `Run / Step` button.
- **Core Mystery:** *"How can we teach our robot to navigate the maze using the fewest possible instructions?"*

#### Dependencies
Phase 3 (ActivityRunner & HelpLadder).

#### Expected Deliverables
- 3 content definition files in `content/activities/`.
- 3 simulation components in `components/simulations/`.
- Full integration into `/learn/[activity]` route.

#### Acceptance Criteria
- Each activity seamlessly executes all 9 learning steps: Introduce ➔ Predict ➔ Experiment ➔ Observe ➔ Help ➔ Apply ➔ Reflect.
- All 3 simulations maintain a steady 60 FPS on mobile and tablet viewports.
- Resetting an activity cleanly resets parameters without page reloads.

---

### Phase 6: Practice Challenges, Subject & Topic Deep Dives

#### Purpose
Deliver the structured curriculum hierarchy (`/subjects/[subject]`, `/topics/[topic]`) and transfer challenge library (`/challenges`).

#### Tasks
1. Build Subject Detail Pages (`/subjects/[subject]`):
   - Overview banner, key concepts, topic list, and recommended starting activity.
2. Build Topic Detail Pages (`/topics/[topic]`):
   - Conceptual milestones, interactive play area link, and practice challenges.
3. Build the Practice Challenges Hub (`/challenges`):
   - Collection of transferable micro-challenges applying the concepts learned in Phase 5.
   - Low-stress puzzle format with instant feedback and encouragement.
4. Implement Breadcrumb navigation across all subject, topic, and activity pages.

#### Dependencies
Phase 4 & Phase 5.

#### Expected Deliverables
- Dynamic routes for `/subjects/[subject]`, `/topics/[topic]`, and `/challenges`.
- Reusable `SubjectCard`, `TopicCard`, and `ChallengeCard` components.

#### Acceptance Criteria
- Breadcrumb trails accurately reflect current hierarchy and provide one-tap return to parent routes.
- Challenges validate completion correctly and offer celebratory feedback without high-stress grading.

---

### Phase 7: My Discoveries Portfolio, Canvas Drawing & Settings

#### Purpose
Empower children to sketch their mental models, save their scientific discoveries, and configure personalized settings.

#### Tasks
1. Build the Interactive Drawing Tool (`components/engine/CanvasBoard.tsx`):
   - Touch-enabled canvas with pen, highlighter, eraser, and color palette.
   - Snapshot tool capturing the current state of a simulation.
   - Export to PNG/WebP Data URI.
2. Build the "My Discoveries" Portfolio (`/discoveries`):
   - Visual gallery of saved Discovery Cards.
   - Filter by subject and date.
   - Detail view with notes, drawing, and parameter snapshot.
3. Build the Client Storage Repository (`lib/storage/discovery-repository.ts`):
   - `IndexedDB` / `localStorage` wrapper for saving discoveries and learner progress.
4. Build the Learner Settings Page (`/settings`):
   - Avatar picker (geometric animal avatars).
   - Sound effects toggle (gentle acoustic chimes).
   - Accessibility toggles (Font size, High Contrast, Reduced Motion).
   - Local data reset button.

#### Dependencies
Phase 3, Phase 5, and Phase 6.

#### Expected Deliverables
- Touch-ready `<CanvasBoard />` component with stroke smoothing.
- Fully functional `/discoveries` portfolio.
- Working `/settings` page with immediate state application.

#### Acceptance Criteria
- Drawings render cleanly on touch screens without scroll interference (`touch-action: none`).
- Saved discoveries persist across browser refreshes and tab closures.
- Clearing local data in Settings wipes discoveries and restores default settings cleanly.

---

### Phase 8: Grown-ups Area & Parental Overview

#### Purpose
Provide parents and educators with pedagogical insight, offline conversation starters, and a secure progress review surface.

#### Tasks
1. Build the Grown-ups Informational Portal (`/grown-ups`):
   - Explanation of Lumi6's inquiry-first pedagogy.
   - "How to Talk With Your Child About Science & Math" discussion guide.
   - Data privacy and child safety manifesto.
2. Build the Gated Grown-ups Dashboard (`/grown-ups/dashboard`):
   - Simple math-based age gate / parental pin prompt.
   - Breadth Radar: Visual summary of subjects explored.
   - Curiosity log showing questions asked in Think Space.
   - Data export (JSON summary) and account deletion controls.

#### Dependencies
Phase 2, Phase 6, and Phase 7.

#### Expected Deliverables
- Public informational page at `/grown-ups`.
- Age-gated dashboard at `/grown-ups/dashboard`.

#### Acceptance Criteria
- Age-gate prevents accidental access by young learners without blocking adults.
- Dashboard accurately reflects discoveries saved in the child's local repository.

---

### Phase 9: Quality Assurance, Accessibility Audit & Launch Readiness

#### Purpose
Conduct rigorous verification across accessibility, responsive performance, cross-browser compatibility, and edge-case testing.

#### Tasks
1. Automated & Manual Accessibility Audit:
   - Run `axe-core` sweeps across every route.
   - Keyboard tab navigation testing across all controls and simulation canvases.
   - Screen reader validation (NVDA / VoiceOver).
2. Performance & Mobile Optimization:
   - Lighthouse audits targeting $\ge 90$ across all metrics.
   - Touch response optimization on low-power mobile devices.
   - Image and SVG asset minification.
3. End-to-End Automated Testing:
   - Full Playwright suites verifying the complete 9-step learning loop.
4. Project Documentation Finalization:
   - Finalize `README.md` with build and deployment instructions.

#### Dependencies
All preceding phases (1 through 8).

#### Expected Deliverables
- 0 accessibility violations in axe-core audits.
- Complete automated E2E test suite running in CI.
- Final production-ready codebase ready for deployment.

#### Acceptance Criteria
- Lighthouse score $\ge 90$ on Performance, Accessibility, Best Practices, and SEO.
- 100% of e2e tests passing in headless Chromium and WebKit.
- Seamless operation verified on iOS Safari, Android Chrome, and Desktop browsers.
