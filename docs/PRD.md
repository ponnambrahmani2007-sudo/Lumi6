# Lumi6 — Product Requirements Document (PRD)

> **Document Version:** 1.0.0  
> **Status:** Approved for Architectural Review  
> **Target Audience:** Product Engineering, UX/UI Design, Curriculum Design, QA  
> **Product Name:** Lumi6 — Think. Explore. Discover.  
> **Tagline:** Think. Explore. Discover.

---

## 1. Executive Summary & Product Vision

### 1.1 Vision Statement
**Lumi6** is a comprehensive, interactive learning platform designed specifically for children aged approximately **8 to 12 years old**. Its guiding ethos is: **Think. Explore. Discover.**

Lumi6 empowers children to construct deep conceptual understanding by asking questions, exploring visual models, testing hypotheses through experimentation, drawing their mental models, and synthesizing discoveries. 

Crucially, Lumi6 is **not** a high-stakes testing portal, a passive video repository, a single-topic simulator (such as a circuit builder), or an unconstrained AI chat interface. Instead, it is an integrated, multi-disciplinary cognitive playground with a unified pedagogical architecture across nine foundational subject domains.

### 1.2 Core Philosophy: Safe, Non-Judgmental Inquiry
- **Zero-Penalty Exploration:** Children should never fear making a "wrong" prediction or breaking a virtual system. Errors are treated as diagnostic stepping stones.
- **Agency Over Dogma:** Children formulate their own predictions before observing outcomes, transforming them from passive consumers into active investigators.
- **Assistance On-Demand:** Help is never withheld punitively, nor is the solution forced prematurely. A 6-tier Progressive Help Ladder supports children at their exact zone of proximal development.
- **Multimodal Understanding:** Learning happens across language, visual diagrams, kinetic manipulation, and creative expression.

---

## 2. Problem Statement & Value Proposition

### 2.1 The Problem
Traditional elementary and middle school educational technology often suffers from significant systemic flaws:
1. **Passive Consumption:** Video lectures and gamified digital worksheets prioritize memorization over first-principles comprehension. Children learn *what* happens without understanding *why*.
2. **Evaluation Anxiety:** Premature grading and buzzer sound effects trigger fear of failure, leading children to disengage or seek immediate hints to preserve scores.
3. **Cognitive Overload via Text-Heavy Explanations:** Complex scientific or mathematical ideas are frequently presented through walls of dense text, alienating visual and intuitive learners.
4. **Fragmented Tooling:** Parents and teachers must cobble together separate apps for coding, science experiments, math drills, and art, each with divergent user experiences, conflicting navigation paradigms, and inconsistent safety standards.
5. **Addictive Engagement Loops:** Many popular platforms employ exploitative mechanics (loss-aversion streaks, noisy countdown timers, casino-like animations) that induce stress rather than sustained curiosity.

### 2.2 The Lumi6 Solution
Lumi6 bridges this divide by providing an integrated learning ecosystem with:
- **Autonomous Inquiry ("Think Space"):** A friendly starting point where children type or tap natural questions (e.g., *"Why does a straw look bent in water?"* or *"How do birds stay in the air?"*) and are guided into visual exploration rather than handed dry answers.
- **Interactive Mental Models:** Interactive Canvas and SVG-based micro-worlds that respond in real time to touch, sliders, and parameter adjustments.
- **Predictive Pedagogy:** A lightweight hypothesis step before running simulations encourages deliberate reflection.
- **Integrated Creativity:** Built-in drawing and annotation tools enable children to sketch diagrams, record reflections, and build personal "Discovery Cards".
- **A Unified Design Language:** A child who learns about refraction in Science immediately feels at home manipulating fraction bars in Math or sequencing algorithms in Coding.

---

## 3. Target Audience & User Personas

### 3.1 Primary Audience: The Young Investigator (Ages 8–12)
- **Context:** Using touchscreen tablets (iPad, Android), Chromebooks, laptops, or smartphones.
- **Digital Literacy:** Varies from intuitive touchscreen navigation to emerging typing skills; requires forgiving touch targets, visual cues, and uncluttered layouts.
- **Cognitive Development:** Transitioning from concrete operational to formal operational thought (Piagetian stage). Capable of logical thought about concrete objects, developing the ability to formulate hypotheses.

#### Persona A: Maya (Age 9) — The Visual Explorer
- **Device:** Family iPad (touch-only, portrait and landscape).
- **Behavior:** Easily overwhelmed by long text blocks; loves dragging things, tapping buttons to see what explodes or lights up, and drawing.
- **Needs:** Clear visual cause-and-effect, minimal text, instant interactive feedback, speech-friendly or simple vocabularies.

#### Persona B: Leo (Age 11) — The Analytical Inquirer
- **Device:** School Chromebook (keyboard + trackpad).
- **Behavior:** Asks deep questions (*"Why doesn't the moon fall into Earth?"*); gets bored with repetitive multiple-choice quizzes; enjoys debugging and logic puzzles.
- **Needs:** Freedom to test edge cases, deep "How It Works" explanations on demand, coding/logic extensions, and a personal journal of findings.

### 3.2 Secondary Audience: Parents and Educators ("Grown-ups")
- **Needs:** High-level visibility into subjects explored, transparency into the pedagogical method, zero marketing/ad tracking, reassurance regarding child data privacy, and discussion prompts to extend digital learning into offline family conversations.

#### Persona C: Sarah (Parent of Maya)
- **Goal:** Wants screen time that is genuinely enriching rather than dopamine-depleting.
- **Priorities:** Absolute privacy, no hidden paywalls or in-app ads, calm aesthetic, visibility into what Maya learned today.

---

## 4. Subject Coverage & Curriculum Architecture

Lumi6 spans nine core disciplines. Crucially, all nine disciplines share a single unified component system, layout grammar, and pedagogical engine.

```
                                  ┌────────────────────────┐
                                  │   Lumi6 Core Engine    │
                                  └───────────┬────────────┘
         ┌──────────────────┬─────────────────┼─────────────────┬──────────────────┐
         │                  │                 │                 │                  │
┌────────┴────────┐ ┌───────┴───────┐ ┌───────┴───────┐ ┌───────┴───────┐ ┌────────┴────────┐
│ Science/Physics │ │  Mathematics  │ │   Chemistry   │ │    Biology    │ │ Art & Creativity │
└─────────────────┘ └───────────────┘ └───────────────┘ └───────────────┘ └──────────────────┘
         │                  │                 │                 │                  │
┌────────┴────────┐ ┌───────┴───────┐ ┌───────┴───────┐ ┌───────┴───────┐                  │
│  Coding & Logic │ │ Earth/Environ │ │   Language    │ │  Engineering  │                  │
└─────────────────┘ └───────────────┘ └───────────────┘ └───────────────┘                  │
         └──────────────────┴─────────────────┴─────────────────┴──────────────────┘
```

### 4.1 Subject Catalog & Learning Domains

| Subject | Core Focus Areas | Example Interactive Explorations |
| :--- | :--- | :--- |
| **1. Science & Physics** | • Light, prisms, color spectrum, wavelength<br>• Electricity, current, closed/open circuits<br>• Magnetic poles, fields, electromagnetic induction<br>• Motion, friction, gravity, kinetic/potential energy<br>• Sound waves, pitch, amplitude, heat transfer, astronomy | • *The Rainbow Machine:* Refraction angle & dispersion<br>• *Circuit Spark:* Connecting batteries, switches, bulbs<br>• *Magnet Mayhem:* Iron filings & field line visualizer |
| **2. Mathematics** | • Numbers, place value, operations<br>• Fractions, equivalent parts, decimals<br>• Ratios, proportions, percentages<br>• Shapes, geometric transformations, angle measurement<br>• Pattern recognition, spatial reasoning | • *Pizza Fractionizer:* Proportional slicing & equivalence<br>• *Angle Architect:* Measuring angles with interactive protractor<br>• *Balance the Scales:* Visual algebraic thinking |
| **3. Chemistry** | • Atoms, protons/neutrons/electrons, periodic table<br>• Solids, liquids, gases, phase transitions<br>• Mixtures, solutions, solubility, separation techniques | • *States of Matter Kettle:* Heating molecules from ice to steam<br>• *Atom Builder:* Assembling helium and carbon particles |
| **4. Biology** | • Plant anatomy, photosynthesis, germination<br>• Animal adaptations, predator-prey dynamics<br>• Cells, organelles, microscopic scale<br>• Human body systems (circulatory, respiratory, skeletal)<br>• Ecosystems, food webs, life cycles | • *Photosynthesis Factory:* Sunlight, water, and CO₂ balancing<br>• *Beak & Seed Simulator:* Natural selection in action |
| **5. Art & Creativity** | • Color theory (primary, secondary, complementary, tint/shade)<br>• Composition, balance, perspective<br>• Pattern making, tessellations<br>• Visual storytelling and sequence drawing | • *Color Alchemy:* Additive (RGB) vs Subtractive (CMYK) mixing<br>• *Perspective Playground:* 1-point and 2-point horizon guides |
| **6. Coding & Logic** | • Sequential instructions, order of execution<br>• Algorithmic patterns and decomposition<br>• Loops, repeat blocks, conditions (`if`/`then`)<br>• Debugging broken scripts, logical puzzles | • *Robot Navigator:* Grid navigation with command cards<br>• *Loop the Loop:* Pattern generation with repeat commands |
| **7. Earth & Environment** | • Solar system, orbital mechanics, planetary scale<br>• Water cycle, cloud formation, weather systems<br>• Ocean currents, marine layers, salinity<br>• Ecosystem health, renewable energy, climate awareness | • *Orbit Explorer:* Gravitational slingshots around planets<br>• *Water Cycle Chamber:* Evaporation, condensation, rain simulator |
| **8. Language & Communication** | • Root words, prefixes, suffixes, vocabulary networks<br>• Sentence anatomy, grammar in context<br>• Story structure (beginning, climax, resolution)<br>• Rhetoric, expressive clarity, persuasive logic | • *Word Morph:* Combining roots to unlock meanings<br>• *Story Arc Builder:* Sequencing scenes into dramatic tension |
| **9. Engineering** | • Structural integrity, tension, compression<br>• Simple machines (levers, pulleys, inclined planes, gears)<br>• Design challenges (bridge building, earthquake survival)<br>• Real-world iterative problem-solving | • *Bridge Buster:* Testing load distribution across trusses<br>• *Gear Train:* Torque vs speed mechanical advantage |

---

## 5. Main Product Features & Functional Requirements

Lumi6 delivers 15 interconnected features spanning public orientation, student inquiry, interactive learning, discovery curation, and guardian visibility.

```
                                  ┌─────────────────────────────┐
                                  │      Public Experience      │
                                  │  - Homepage                 │
                                  │  - How It Works / Features  │
                                  │  - Explore Subjects         │
                                  │  - Privacy / Help           │
                                  └──────────────┬──────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
    ┌─────────────────────────────┐                             ┌─────────────────────────────┐
    │     Child Learning Hub      │                             │    Grown-ups Experience     │
    │  - Dashboard                │                             │  - Philosophy & Overview    │
    │  - Think Space (Inquiry)    │                             │  - Progress Review          │
    │  - Subject / Topic Pages    │                             │  - Offline Conversation     │
    │  - Interactive Activities   │                             │  - Account & Consent Mgmt   │
    │  - Practice Challenges      │                             └─────────────────────────────┘
    │  - My Discoveries Journal   │
    │  - Settings & Accessibility │
    └─────────────────────────────┘
```

### 5.1 Public Feature Specifications

#### F01: Public Homepage (`/`)
- **Purpose:** Welcomes children and guardians; establishes tone (calm, inspiring, curious); sets expectations that this is an active thinking platform.
- **Key Modules:**
  - *Hero Section:* Dynamic interactive banner demonstrating light or particle physics in miniature, clear tagline, and dual primary CTAs ("Start Exploring" for kids, "For Grown-ups" for parents).
  - *Inquiry Teaser:* "What are you curious about today?" with 4 clickable kid-friendly question pills.
  - *Visual Feature Highlights:* Three interactive mini-previews (Science, Math, Coding).
  - *Trust & Child Safety Banner:* Explicit pledge on zero ads, zero trackers, and privacy-first architecture.

#### F02: How It Works Page (`/how-it-works`)
- **Purpose:** Clearly breaks down the 9-step pedagogical loop for both kids and educators.
- **Key Modules:**
  - Interactive diagram illustrating: **Ask ➔ Predict ➔ Experiment ➔ Understand ➔ Apply**.
  - Demonstration of the 6-tier Progressive Help Ladder (interactive preview).
  - Testimonial/Philosophy quote on active learning vs passive memorization.

#### F03: Features Page (`/features`)
- **Purpose:** Comprehensive walkthrough of the platform's core capabilities.
- **Key Modules:**
  - Interactive Tool Demos (Canvas drawing, parameter sliders, virtual breadboards).
  - Cross-Curricular Architecture breakdown.
  - Accessibility showcase (screen reader support, high contrast, reduced motion).

#### F04: Explore Subjects Directory (`/explore`)
- **Purpose:** Central discovery hub categorizing all 9 subject areas, their available topics, and active challenges.
- **Key Modules:**
  - 9 visual Subject Cards with distinct thematic color accents and Lucide icons.
  - Search and filter bar (by subject, difficulty, estimated time, and learning style).
  - "Surprise Me" button launching a random bite-sized concept exploration.

#### F05: Privacy & Safety Transparency Page (`/privacy`)
- **Purpose:** Transparent, plain-English explanation of data handling for parents and children.
- **Key Modules:**
  - "Child Friendly Summary" written at a 4th-grade reading level.
  - Detailed technical disclosures: Zero behavioral tracking, minimal data storage, secure client-side options.

#### F06: Help & FAQ Page (`/help`)
- **Purpose:** Troubleshooting and self-serve guidance for young learners and parents.
- **Key Modules:**
  - Interactive "How to use tools" visual guide (how to draw, how to reset an experiment, how to request hints).
  - Frequently Asked Questions categorized by Kids vs Parents.

---

### 5.2 Child Learning Surface Specifications

#### F07: Child Learning Dashboard (`/dashboard`)
- **Purpose:** The personalized, judgment-free home base for the learner.
- **Key Modules:**
  - *Friendly Greeting:* Morning/Afternoon personalized banner with avatar (no real names or photos required).
  - *Continue Exploring:* Resumes the child's last active investigation with an instant preview.
  - *Today's Curiosity Spark:* One engaging, non-punitive prompt to spark lateral thinking.
  - *My Recent Discoveries Strip:* Quick carousel of saved experiment cards and sketches.
  - *Subject Shortcuts:* Direct access to the 9 curriculum paths.

#### F08: Think Space (`/think`)
- **Purpose:** The open-ended inquiry engine of Lumi6.
- **Key Modules:**
  - *Inquiry Input:* Large, welcoming text bar with voice-dictation readiness and prompt suggestions.
  - *Question Categorizer:* Automatically maps free-form questions (e.g. *"Why is the sky blue?"*) to curated learning paths (Science ➔ Light ➔ Scattering).
  - *Curiosity Tree:* Visual mind-map showing related questions that branching out from the child's inquiry.

#### F09: Subject & Topic Detail Pages (`/subjects/[subject]`, `/topics/[topic]`)
- **Purpose:** Structured learning paths within a chosen discipline.
- **Key Modules:**
  - Breadcrumb navigation (`Explore > Science > Light & Optics`).
  - Topic overview card with clear conceptual goals.
  - Activity roadmap showing: Concept Investigations, Interactive Playgrounds, Creative Challenges, and Deep Dives.

#### F10: Interactive Activity Engine (`/learn/[activity]`)
- **Purpose:** The core interactive sandbox where conceptual understanding is built.
- **Key Modules:**
  - Stage Header: Activity title, estimated time, step indicator (e.g., Step 2 of 4).
  - Prediction Panel: Multi-choice or drag-and-drop hypothesis submission.
  - Interactive Canvas / SVG Viewport: The responsive simulation container.
  - Direct Manipulation Controls: Sliders, toggles, color pickers, draggable elements.
  - Observation Feedback: Dynamic labels that update as parameters shift.
  - Navigation Footer: "Back", "Request Hint", "Reset Activity", and "Proceed to Reflection".

#### F11: Progressive Help Ladder System (Integrated across `/learn/*`)
- **Purpose:** Scaffolds learning without short-circuiting critical thinking.
- **Mechanism:** A 6-stage escalation button that always reveals help upon request:
  1. *Gentle Hint:* Prompts the child to notice a specific area of the screen.
  2. *Highlight Detail:* Animates or circles the relevant interactive control.
  3. *Stronger Clue:* Offers a conceptual question pointing toward the mechanism.
  4. *Similar Example:* Shows an everyday analogy (e.g., pencil in a water glass).
  5. *Guided Solution:* Step-by-step instructions on what to adjust.
  6. *Complete Explanation:* Full pedagogical explanation with diagrams and "Why it works".

#### F12: Drawing & Visual Exploration Tool (Embedded & Standalone)
- **Purpose:** Enables children to visually diagram their thoughts, annotate simulation snapshots, and express artistic ideas.
- **Key Modules:**
  - Drawing Canvas: Touch-enabled freehand pen, highlighter, eraser, line, and shape tools.
  - Kid-Safe Palette: 12 harmonious colors matching the design system.
  - Stamp & Label Tool: Pre-made scientific symbols (arrows, light rays, batteries, gears).
  - Export to Discovery: Saves drawings directly to "My Discoveries".

#### F13: Practice Challenges (`/challenges`)
- **Purpose:** Transfers learned concepts to novel, unfamiliar problem scenarios.
- **Key Modules:**
  - "What happens if..." sandbox scenarios.
  - Low-friction puzzle formats (order sequencing, circuit debugging, fraction balancing).
  - Instant positive reinforcement and reflective retrospectives.

#### F14: My Discoveries Journal (`/discoveries`)
- **Purpose:** A personal, proud portfolio of the child's cognitive journey.
- **Key Modules:**
  - Digital Index Cards representing completed activities, saved drawings, and written observations.
  - Filterable by Subject and Date.
  - Printable / Shareable "Discovery Summary" for showing parents and teachers.

#### F15: Settings & Personalization (`/settings`)
- **Purpose:** Gives the child control over their sensory and navigational experience.
- **Key Modules:**
  - Avatar Selector (collection of friendly geometric creatures; no webcam uploads).
  - Sound effects toggle (gentle acoustic chimes; mute by default or opt-in).
  - Display options: Font size scaling, High Contrast Mode, Reduced Motion toggle.
  - Data management: Local cache reset, export discoveries to JSON/PDF.

---

### 5.3 Grown-ups Surface Specifications

#### F16: Grown-ups Philosophy & Onboarding (`/grown-ups`)
- **Purpose:** Explains the science of active inquiry to parents and educators.
- **Key Modules:**
  - The Lumi6 Pedagogical Whitepaper summary.
  - Conversation starters: How to ask your child about their discoveries without interrogating them.

#### F17: Grown-ups Dashboard (`/grown-ups/dashboard`)
- **Purpose:** Secure, authenticable portal for guardians to observe learning patterns.
- **Key Modules:**
  - Conceptual Breadth Radar: Visual map showing engagement across all 9 subjects.
  - Curiosity Log: Questions their child asked in the Think Space.
  - Parental Controls: Screen time advisory alerts, reset PIN, account data deletion.

---

## 6. End-to-End Learning Experience & Pedagogical Framework

### 6.1 The 9-Step Learning Loop
Every core activity on Lumi6 implements a reusable pedagogical state machine:

```
 ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
 │ 1. Inquiry /  │ ───► │ 2. Direction  │ ───► │ 3. Real-World │
 │    Question   │      │    Mapping    │      │    Context    │
 └───────────────┘      └───────────────┘      └───────┬───────┘
                                                       │
 ┌───────────────┐      ┌───────────────┐              ▼
 │ 6. Guided     │ ◄─── │ 5. Direct     │ ◄─── ┌───────────────┐
 │   Observation │      │  Manipulation │      │ 4. Prediction │
 └───────┬───────┘      └───────────────┘      │   (Hypothesis)│
         │                                     └───────────────┘
         ▼
 ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
 │ 7. Scaffolded │ ───► │ 8. Challenge  │ ───► │ 9. Discovery  │
 │  Help Ladder  │      │  Application  │      │    Journal    │
 └───────────────┘      └───────────────┘      └───────────────┘
```

1. **Step 1: Inquiry Formulation:** The child initiates an inquiry through free-text input, voice input, or selecting a recommended curiosity spark.
2. **Step 2: Direction Identification:** Lumi6 maps the question to an interactive module and defines clear learning objectives.
3. **Step 3: Phenomenon Introduction:** The child is presented with a real-world scenario or tangible mystery (e.g., *"Why does white sunlight turn into a rainbow through glass?"*).
4. **Step 4: Active Prediction (Hypothesis):** Before touching the experiment, the child selects or sketches their prediction. Predictions are never graded as "wrong"—they are logged as hypotheses to test.
5. **Step 5: Direct Interactive Experimentation:** The child manipulates variables (angles, resistances, slice counts, loops) in a responsive canvas.
6. **Step 6: Guided Observation:** The platform draws attention to changes in state through dynamic labels, subtle callouts, and side-by-side comparisons.
7. **Step 7: Adaptive Scaffolded Assistance:** If the child is curious or stuck, they step through the 6-tier Progressive Help Ladder at their own pace.
8. **Step 8: Transfer Challenge:** The child tests their new mental model against an altered scenario (e.g., *"What happens if the prism is immersed in water instead of air?"*).
9. **Step 9: Synthesis & Discovery Capture:** The child saves their experimental setup, personal notes, and drawings to "My Discoveries".

### 6.2 The 6-Tier Progressive Help Ladder

| Tier | Level Name | What the Child Experiences | Pedagogical Purpose |
| :---: | :--- | :--- | :--- |
| **1** | **Gentle Hint** | *"Look closely at where the light beam enters the glass."* | Directs visual attention without giving away mechanics. |
| **2** | **Highlight Detail** | A pulsing lavender ring highlights the prism rotation handle. | Reduces interface friction and clarifies interactive elements. |
| **3** | **Stronger Clue** | *"Does red light bend more or less than violet light?"* | Prompts comparative reasoning about the specific variable. |
| **4** | **Similar Example** | A miniature graphic showing a straw appearing bent in water. | Connects abstract laboratory models to familiar everyday experiences. |
| **5** | **Guided Solution** | Step 1: Turn the angle slider to 45°. Step 2: Observe the red ray. | Provides concrete scaffolding for learners experiencing frustration. |
| **6** | **Complete Explanation** | A comprehensive visual narrative explaining Snell's law and refractive index in kid-friendly language. | Satisfies deep curiosity and guarantees no child is left behind. |

---

## 7. Website Routes & Navigation Architecture

### 7.1 Complete Route Hierarchy

```
/ (Root)
│
├── Public Information
│   ├── /how-it-works            (Pedagogical model, help ladder explanation)
│   ├── /features                (Tool demos, interactive capabilities)
│   ├── /explore                 (Subject catalog, topic browsing)
│   ├── /privacy                 (Child safety, plain-English privacy policy)
│   └── /help                    (FAQ, navigation tutorials, contact)
│
├── Child Learning Experience
│   ├── /dashboard               (Personalized learner home, recent work)
│   ├── /think                   (Free-form inquiry & curiosity engine)
│   ├── /subjects/[subject]      (Subject overview, e.g. /subjects/science)
│   ├── /topics/[topic]          (Topic overview, e.g. /topics/light-and-optics)
│   ├── /learn/[activity]        (Interactive 9-step activity runner)
│   ├── /discoveries             (Saved portfolio, cards, notes, drawings)
│   ├── /challenges              (Practice challenges, puzzle library)
│   └── /settings                (Accessibility, avatar, sound, local data)
│
└── Grown-ups Portal
    ├── /grown-ups               (Educational philosophy, offline discussion tips)
    └── /grown-ups/dashboard     (Secure learning overview, consent controls)
```

### 7.2 Navigation Rules & Transitions
- **Child Mode Persistence:** Navigating within `/dashboard`, `/think`, `/subjects`, `/topics`, `/learn`, `/discoveries`, and `/challenges` retains a consistent, friendly child navigation bar.
- **Emergency Exit to Safety:** Any child route includes an instant, prominent home button ("Take me back to Dashboard").
- **Grown-ups Separation:** Routes under `/grown-ups/dashboard` are isolated behind an age-gate / adult authentication barrier to prevent children from inadvertently altering administrative or telemetry settings.
- **Breadcrumb Navigation:** High-contrast breadcrumbs on all topic and activity pages allow immediate one-click return to higher hierarchy levels (`Dashboard > Science > Light > Rainbow Machine`).

---

## 8. Design System & User Experience Guidelines

### 8.1 Visual Tone & Emotional Tenor
Lumi6 balances **curiosity, calm, friendliness, creativity, and trust**. It deliberately rejects the hyper-stimulated, sensory-overloaded aesthetic of conventional mobile games (avoiding flashing banners, neon casino reels, and shrill sound effects) in favor of a thoughtful, focused digital workshop.

### 8.2 Color System & Palette Tokens

| Token Role | Tailwind Class / Variable | Hex Value | Application |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `bg-brand-lavender` | `#7C65C1` | Key actions, logo, primary brand highlights |
| **Surface Lavender** | `bg-brand-lavender-subtle` | `#F2F0FA` | Cards, hero containers, soft highlights |
| **Mint Accent** | `bg-brand-mint` | `#2DD4BF` | Positive discovery states, successes, biology cues |
| **Mint Dark** | `text-brand-mint-dark` | `#0D9488` | High-contrast mint text, accessible button text |
| **Warm Yellow** | `bg-brand-yellow` | `#FDE047` | Curiosity sparks, warning-free tips, stars/insights |
| **Amber Accent** | `text-brand-amber` | `#D97706` | High-contrast yellow/amber badges and icons |
| **Neutral Canvas** | `bg-surface-neutral` | `#FAFAFC` | Page background, calming off-white space |
| **Card Surface** | `bg-surface-card` | `#FFFFFF` | Rounded component cards, elevation panels |
| **Text Primary** | `text-ink-primary` | `#1E1B4B` | High-contrast deep slate/indigo for headers & body |
| **Text Muted** | `text-ink-muted` | `#475569` | Secondary captions, metadata, breadcrumbs |
| **Border Soft** | `border-subtle` | `#E2E8F0` | Non-intrusive card outlines (1.5px to 2px) |

### 8.3 Typography & Readability
- **Primary Body Font:** Friendly, highly legible sans-serif with distinct letterforms (e.g., `Plus Jakarta Sans`, `Inter`, or `Nunito`). High x-height ensures easy scanning for early readers.
- **Display / Header Font:** Warm, rounded, inviting geometric font (e.g., `Plus Jakarta Sans` Bold or `Outfit`).
- **Font Sizes:** Minimum body text size of 16px on mobile (1rem) and 18px on desktop (1.125rem). Line height at least 1.6 for comfortable reading.
- **Hierarchy:**
  - `H1` (Page Headers): 2.25rem - 2.75rem, tracking-tight, font-extrabold
  - `H2` (Section Titles): 1.75rem - 2.0rem, font-bold
  - `H3` (Card Titles): 1.25rem - 1.5rem, font-semibold
  - `Body`: 1.0rem - 1.125rem, font-normal
  - `Caption`: 0.875rem, font-medium

### 8.4 Iconography & Imagery
- **Icon Library:** `lucide-react` with 2px stroke width, rounded caps, and warm color fills.
- **Card Aesthetics:** Generously rounded corners (`rounded-2xl` / `rounded-3xl`), soft ambient shadows (`shadow-sm` transitioning to `shadow-md` on hover/focus), 2px border strokes for tactile presence.

### 8.5 Responsive Layout & Interaction Guidelines
- **Mobile-First Touch Architecture:**
  - Minimum touch target size: **48 × 48 px** for all buttons, sliders, and controls.
  - Spacing between adjacent interactive targets: Minimum 12px to prevent accidental taps by developing motor skills.
  - Generous padding on touch containers (minimum 16px horizontal margin on mobile screens).
- **Cross-Form-Factor Breakpoints:**
  - Mobile: `< 640px` (single-column stacked layout, sticky bottom action bar for activity controls).
  - Tablet: `640px - 1024px` (adaptive 2-column layout: visual simulation left/top, control & observation panel right/bottom).
  - Desktop: `> 1024px` (side-by-side workspace: interactive canvas 65% width, progressive help & observation 35% width).

### 8.6 Accessibility & Inclusive Design (WCAG 2.1 AA)
- **Contrast Ratios:** All text elements adhere to a minimum 4.5:1 contrast ratio against their background; large text adheres to 3:1.
- **Visible Focus Rings:** Unambiguous 3px lavender/indigo focus rings (`focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:outline-none`) for keyboard and switch-access navigation.
- **Reduced Motion:** Full compliance with `prefers-reduced-motion: reduce`. Animations and physics simulations provide static or stepped alternatives without jarring camera pans or particle bursts.
- **Screen Reader Readiness:** Semantic HTML5 (`<main>`, `<article>`, `<nav>`, `<aside>`), descriptive `aria-label` tags on all simulation controls, and live regions (`aria-live="polite"`) for real-time experimental state updates.

---

## 9. Child Safety, Privacy & Ethical Guardrails

### 9.1 Data Minimization
- **No PII Mandate:** Children can use the full learning engine, draw, and save discoveries without submitting a real name, email, phone number, address, school name, or photograph.
- **Anonymous Session Architecture:** The child selects a fun geometric avatar (e.g., "Curious Fox", "Nova Star") and a friendly screen moniker stored locally or anonymously in cryptographically hashed session tokens.
- **Zero Third-Party Trackers:** No Google Analytics, Meta Pixel, TikTok Pixels, ad-network SDKs, or third-party behavioral profiling scripts are permitted within the codebase.

### 9.2 Safe AI Integration Architecture (Future Server-Side Gateway)
- **Zero Direct-to-Client LLM Connections:** The client application will never communicate directly with external AI endpoints.
- **Server-Side Pedagogy Proxy:** All inquiries routed to future AI endpoints pass through a secured server-side API handler that:
  1. Strips any accidentally submitted PII (names, phone numbers, locations).
  2. Injects strict pedagogical system prompts (enforcing an encouraging, supportive, age-appropriate 8–12 reading level).
  3. Rejects adult, dangerous, violent, or inappropriate topics with gentle redirection (*"That's outside my workshop! Let's explore how rockets fly or how magnets work instead."*).
  4. Formats responses into structured JSON containing visual hints, analogies, and questions rather than unstructured text dumps.

### 9.3 Ethical Engagement (Anti-Dark-Patterns)
- **No Guilt-Inducing Streaks:** No loss-of-progress warnings (*"You'll lose your 5-day streak!"*).
- **No Artificial Urgency:** No countdown clocks forcing children to answer before time expires.
- **No Pay-to-Win or In-Game Currencies:** Learning achievements are intrinsic—represented by saved sketches, conceptual discovery badges, and unlocked exploration paths.
- **Parental Oversight:** Parents can inspect, export, or delete any cached learning data at any time through the Grown-ups dashboard.

---

## 10. Non-Functional Requirements (NFRs)

### 10.1 Performance
- **First Contentful Paint (FCP):** `< 1.2s` on standard 4G mobile connections.
- **Largest Contentful Paint (LCP):** `< 2.0s`.
- **Cumulative Layout Shift (CLS):** `< 0.05`.
- **Interaction to Next Paint (INP):** `< 100ms` for simulation controls and canvas interactions.
- **Simulation Frame Rate:** Interactive canvas simulations must maintain a stable 60 FPS on mid-tier mobile hardware.

### 10.2 Reliability & Offline Resilience
- **Offline Tolerance:** Core activities and cached content must function without network connectivity once loaded via service worker / offline storage.
- **Local Persistence:** Discoveries, settings, and progress must persist in `IndexedDB` / `localStorage` with zero data loss during unexpected browser refresh or tab closure.

### 10.3 Cross-Browser & Device Compatibility
- Modern WebKit (iOS Safari 15+), Chromium (Chrome 90+, Edge 90+, Chromebooks), and Gecko (Firefox 90+).
- Support for touch, stylus (Apple Pencil / active pens), mouse, trackpad, and keyboard inputs.

---

## 11. MVP Release Scope & Acceptance Criteria

### 11.1 First Release Deliverables
The initial implementation must deliver a rock-solid, production-ready baseline:
1. Complete responsive marketing and informational shell (`/`, `/how-it-works`, `/features`, `/explore`, `/privacy`, `/help`, `/grown-ups`).
2. Child Learning Dashboard (`/dashboard`) with greeting, activity resume, and curiosity sparks.
3. Interactive Think Space (`/think`) with inquiry input and discovery direction suggestions.
4. Core Learning Engine (`/learn/[activity]`) supporting the 9-step learning loop and 6-tier Progressive Help Ladder.
5. Three Complete Flagship Interactive Activities spanning distinct disciplines:
   - **Activity 1 (Science/Physics):** *The Rainbow Machine (Light, Refraction & Prisms)*
   - **Activity 2 (Mathematics):** *Visual Fractions & Pizza Slices (Proportions & Equivalence)*
   - **Activity 3 (Coding & Logic):** *Robot Navigator (Sequencing, Repeat Loops & Debugging)*
6. Built-in Canvas Drawing & Annotation tool integrated into activities and "My Discoveries".
7. "My Discoveries" Portfolio (`/discoveries`) storing saved cards, drawings, and reflections.
8. Settings page (`/settings`) with avatar selector, accessibility toggles, and data controls.
9. Comprehensive test suite and developer documentation.

### 11.2 Measurable Acceptance Criteria

| Criteria ID | Category | Acceptance Criteria |
| :--- | :--- | :--- |
| **AC-01** | **Pedagogy** | Every activity provides a non-punitive prediction step before running the simulation. |
| **AC-02** | **Assistance** | The Progressive Help Ladder unlocks across all 6 tiers on demand without blocking or grading the child. |
| **AC-03** | **Responsiveness** | All pages and interactive canvases resize smoothly between 360px (mobile) and 1920px (desktop) without horizontal scroll or truncated controls. |
| **AC-04** | **Touch Ergonomics** | Touch targets on mobile measure at least 48 × 48px with appropriate tap clearance. |
| **AC-05** | **Accessibility** | 100% of interactive buttons and sliders are operable via keyboard tab navigation with visible focus indicators. Zero critical axe-core accessibility errors. |
| **AC-06** | **Privacy** | Zero network calls to external advertising or tracking endpoints. Core learning operational without requiring child personal info. |
| **AC-07** | **Performance** | Google Lighthouse score of $\ge 90$ across Performance, Accessibility, Best Practices, and SEO. |
| **AC-08** | **Drawing** | Drawing tool provides smooth pointer tracking on touch and mouse devices with undo, clear, color selection, and export functions. |
