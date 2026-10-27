# Lumi6 — Server-Side AI Integration & Setup Guide

> **Document Version:** 1.0.0  
> **Target Audience:** Developers, DevOps, System Administrators  
> **Product:** Lumi6 — Think. Explore. Discover.

---

## 1. Overview & Architecture

Lumi6 integrates a secure, server-side AI gateway that powers **adaptive, open-ended question answering** while strictly preserving the platform's core **Think-First pedagogical principles**.

### Key Architectural Tenets:
1. **Server-Side Credential Isolation:** All API keys reside exclusively in server environment variables. Zero credentials are ever exposed to the client browser or bundled in frontend JavaScript.
2. **Pedagogical Guardrails:** All AI requests enforce version-controlled system instructions (`src/ai/system-prompt.ts`) ensuring age-appropriate (ages 8–12), non-judgmental, prediction-first dialogue.
3. **Controlled Visual Registry:** The AI cannot generate arbitrary HTML, JavaScript, or code. It returns structured visual identifiers (`shadow_distance`, `prism_rainbow`, `none`) validated against a trusted client component registry.
4. **Resilient Offline Fallback:** If no API key is provided, or if the external AI service suffers latency, timeouts, or errors, the platform immediately and transparently delegates to Lumi6's curated deterministic engine. The child never experiences a crash or broken screen.

---

## 2. Supported AI Providers

### Primary Provider: Google DeepMind Gemini
- **Default Model:** `gemini-3.8-flash` (configurable via `GEMINI_MODEL` environment variable)
- **Supported Alternatives:** `gemini-2.0-flash` or custom enterprise endpoints.
- **Rationale:** High speed, low latency, cost-effective for educational workloads, superior multimodal understanding, and native support for structured JSON schemas.
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent`
- **Authentication:** Transmitted via the secure `x-goog-api-key` HTTP header, ensuring no private credentials appear in URL query strings or server access logs.

### Secondary / Development Provider: Local Deterministic Engine
- Operates automatically when `GEMINI_API_KEY` is omitted.
- Provides 100% functionality for curriculum concepts (Shadows & Light, Prisms & Rainbows, Fractions, etc.).

---

## 3. Step-by-Step Setup Guide

### Step 1: Obtain a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** and create a key in a new or existing Google Cloud project.
4. Copy the API key string.

### Step 2: Configure Environment Variables
1. In the root directory of the Lumi6 project, create a file named `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and paste your API key and optional model override:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   GEMINI_MODEL=gemini-3.8-flash
   PORT=3000
   NODE_ENV=development
   ```
3. Verify that `.env.local` is listed in `.gitignore` (already configured by default).

### Step 3: Start the Lumi6 Server
Run the lightweight backend server:
```bash
node server.js
```
The server will output:
```
==================================================
   Lumi6 Server running on http://localhost:3000
   Mode: LIVE AI ENABLED (Provider: Google Gemini)
==================================================
```
*(If no key is set, it will display: `Mode: OFFLINE DETERMINISTIC (No API key detected)`)*

### Step 4: Verify Health & Inquiry Endpoints
Check server status in your browser or terminal:
- **Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Interactive App:** [http://localhost:3000](http://localhost:3000)

---

## 4. Security & Child Privacy Safeguards

### 4.1 Server-Side PII Scrubbing
Before any prompt is dispatched to an external AI model, `server.js` passes the child's inquiry through an automated PII redactor:
- Removes full names, email addresses, phone numbers, postal addresses, and school identifiers.
- Replaces personal identifiers with generic tokens (`[a young learner]`).

### 4.2 Rate Limiting & Payload Limits
- Maximum payload size is restricted to 16 KB to prevent memory exhaustion attacks.
- In-memory rate limiting caps requests to 30 requests per minute per IP address.

### 4.3 Structured JSON Schema Validation
All model outputs are strictly validated before being relayed to the frontend:
- Verified fields: `intent`, `message`, `suggestedAction`, `predictionOptions`, `visualActivity`, `conceptKey`.
- Any malformed or unparseable AI output triggers an immediate fallback to a safe deterministic educational response.

---

## 5. Offline & Development Mode

Lumi6 guarantees that the entire learning environment remains 100% operational without an internet connection or API key:
- Interactive simulations (Canvas Ray-Tracing & Spectrum Dispersion) run locally in the browser at 60 FPS.
- Flashcards and Thinking Quizzes function with instant local scoring.
- The 5-level Progressive Hint Ladder operates without remote dependencies.
- Talk Mode utilizes the browser's built-in Web Speech API.
