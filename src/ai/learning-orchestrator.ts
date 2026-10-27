/**
 * Lumi6 — Unified Learning Orchestrator
 * Mediates between user inquiries, external AI models, and the deterministic fallback engine.
 */

import { LUMI6_SYSTEM_INSTRUCTION } from './system-prompt';
import { isValidVisualActivity } from './visual-registry';
import { CONCEPT_CATALOG, classifyInquiry } from '../lib/think-first-engine';

export type OrchestratorIntent = 
  | 'think_first'
  | 'give_hint'
  | 'explain_fully'
  | 'show_example'
  | 'start_experiment'
  | 'generate_flashcards'
  | 'start_quiz'
  | 'reflect_on_discovery';

export interface OrchestratorRequest {
  query: string;
  conceptKey?: string;
  hintLevel?: number;
  prediction?: string;
  mode?: 'talk' | 'write';
  history?: { sender: 'child' | 'lumi'; text: string }[];
}

export interface OrchestratorResponse {
  intent: OrchestratorIntent;
  message: string;
  suggestedAction: 'predict' | 'experiment' | 'hint' | 'quiz' | 'flashcards' | 'reflect';
  requiresPrediction: boolean;
  predictionOptions?: string[] | null;
  visualActivity: 'shadow_distance' | 'prism_rainbow' | 'none';
  visualRationale?: string;
  conceptKey: string;
  provider: 'gemini' | 'deterministic_offline';
  timestamp: number;
}

/**
 * Scrubs common PII tokens (emails, phone numbers, addresses, names) from child prompts
 */
export function scrubPII(input: string): string {
  let cleaned = input;
  // Remove email patterns
  cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]');
  // Remove 7-11 digit phone patterns
  cleaned = cleaned.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[phone]');
  // Remove basic address triggers
  cleaned = cleaned.replace(/\b\d+\s+([a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+)\s(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr)\b/gi, '[address]');
  return cleaned;
}

/**
 * Validates the raw JSON output from the AI model
 */
export function validateAIOutput(raw: any, fallbackConceptKey: string): OrchestratorResponse | null {
  if (!raw || typeof raw !== 'object') return null;

  const validIntents: OrchestratorIntent[] = [
    'think_first', 'give_hint', 'explain_fully', 'show_example', 
    'start_experiment', 'generate_flashcards', 'start_quiz', 'reflect_on_discovery'
  ];

  if (typeof raw.message !== 'string' || !raw.message.trim()) return null;

  const intent: OrchestratorIntent = validIntents.includes(raw.intent) ? raw.intent : 'think_first';
  const visualActivity = isValidVisualActivity(raw.visualActivity) ? raw.visualActivity : 'none';

  return {
    intent,
    message: raw.message.trim(),
    suggestedAction: ['predict', 'experiment', 'hint', 'quiz', 'flashcards', 'reflect'].includes(raw.suggestedAction)
      ? raw.suggestedAction
      : 'predict',
    requiresPrediction: Boolean(raw.requiresPrediction),
    predictionOptions: Array.isArray(raw.predictionOptions) ? raw.predictionOptions.slice(0, 4) : null,
    visualActivity,
    visualRationale: typeof raw.visualRationale === 'string' ? raw.visualRationale : undefined,
    conceptKey: typeof raw.conceptKey === 'string' ? raw.conceptKey : fallbackConceptKey,
    provider: 'gemini',
    timestamp: Date.now()
  };
}

/**
 * Generates an offline deterministic fallback response when AI is unreachable or unconfigured
 */
export function generateDeterministicFallback(request: OrchestratorRequest): OrchestratorResponse {
  const concept = request.conceptKey && CONCEPT_CATALOG[request.conceptKey]
    ? CONCEPT_CATALOG[request.conceptKey]
    : classifyInquiry(request.query);

  const lower = request.query.toLowerCase();

  // 1. Direct explanation request
  if (lower.includes('explain') || lower.includes('tell me') || lower.includes('answer')) {
    return {
      intent: 'explain_fully',
      message: `${concept.scientificFact}\n\n💡 Real-world wonder: ${concept.realWorldAnalogy}`,
      suggestedAction: 'experiment',
      requiresPrediction: false,
      visualActivity: concept.key === 'shadows' ? 'shadow_distance' : 'prism_rainbow',
      visualRationale: 'Explore the live physical model to see how rays behave.',
      conceptKey: concept.key,
      provider: 'deterministic_offline',
      timestamp: Date.now()
    };
  }

  // 2. Child answered a prediction or tested a hypothesis
  if (request.prediction) {
    return {
      intent: 'start_experiment',
      message: `Fabulous hypothesis: "${request.prediction}"! Now test it in the workshop below. Move the slider and observe what changes!`,
      suggestedAction: 'experiment',
      requiresPrediction: false,
      visualActivity: concept.key === 'shadows' ? 'shadow_distance' : 'prism_rainbow',
      conceptKey: concept.key,
      provider: 'deterministic_offline',
      timestamp: Date.now()
    };
  }

  // 3. Initial Think-First mystery inquiry
  return {
    intent: 'think_first',
    message: `${concept.initialPrompt}\n\n${concept.predictionQuestion}`,
    suggestedAction: 'predict',
    requiresPrediction: true,
    predictionOptions: concept.predictionOptions,
    visualActivity: concept.key === 'shadows' ? 'shadow_distance' : 'prism_rainbow',
    visualRationale: `Observe the ${concept.title} simulation to test your hypothesis.`,
    conceptKey: concept.key,
    provider: 'deterministic_offline',
    timestamp: Date.now()
  };
}

export const DEFAULT_GEMINI_MODEL = 'gemini-3.8-flash';

/**
 * Master dispatch function: calls Gemini if API key is present; otherwise returns deterministic fallback
 */
export async function dispatchLearningInquiry(
  request: OrchestratorRequest,
  apiKey?: string,
  model: string = typeof process !== 'undefined' && process.env?.GEMINI_MODEL ? process.env.GEMINI_MODEL : DEFAULT_GEMINI_MODEL
): Promise<OrchestratorResponse> {
  const fallback = generateDeterministicFallback(request);

  if (!apiKey || apiKey.trim() === '') {
    return fallback;
  }

  try {
    const cleanQuery = scrubPII(request.query);
    const boundedHistory = (request.history || []).slice(-4);

    const promptPayload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: LUMI6_SYSTEM_INSTRUCTION },
            {
              text: JSON.stringify({
                learnerQuery: cleanQuery,
                activeConcept: request.conceptKey || 'general',
                learnerPrediction: request.prediction || null,
                interactionMode: request.mode || 'write',
                recentHistory: boundedHistory
              })
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.4,
        maxOutputTokens: 800
      }
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7-second timeout

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(promptPayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[Lumi6 AI Gateway] Gemini returned status ${res.status}. Falling back to deterministic engine.`);
      return fallback;
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return fallback;

    const parsedJson = JSON.parse(candidateText);
    const validated = validateAIOutput(parsedJson, fallback.conceptKey);
    return validated || fallback;
  } catch (err: any) {
    console.warn(`[Lumi6 AI Gateway] Request failed or timed out (${err?.message || err}). Falling back to deterministic engine.`);
    return fallback;
  }
}
