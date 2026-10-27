/**
 * Lumi6 — Think-First Learning System Type Definitions
 */

export type InteractionMode = 'talk' | 'write';

export type PedagogicalStep = 
  | 'QUESTION_RECEIVED'
  | 'PREDICTION_PROMPT'
  | 'EXPLORATION'
  | 'OBSERVATION'
  | 'HINT_SCAFFOLD'
  | 'EXPLANATION'
  | 'CHALLENGE_QUIZ'
  | 'FLASHCARDS';

export interface ChatMessage {
  id: string;
  sender: 'child' | 'lumi';
  text: string;
  timestamp: number;
  mode: InteractionMode;
  suggestedAction?: string;
  visualAttachment?: {
    type: 'prism-simulation' | 'shadow-simulation' | 'fraction-pizza' | 'practical-activity';
    title: string;
    description: string;
  };
  predictionOptions?: string[];
  requiresPrediction?: boolean;
  conceptKey?: string;
}

export type HintLevel = 1 | 2 | 3 | 4 | 5;

export interface ProgressiveHint {
  level: HintLevel;
  type: 'gentle_prompt' | 'observation' | 'concept' | 'similar_example' | 'full_explanation';
  title: string;
  content: string;
  exampleSnippet?: string;
}

export interface Flashcard {
  id: string;
  conceptKey: string;
  frontQuestion: string;
  backExplanation: string;
  illustrationKey?: string;
  userRating?: 'understand' | 'learning' | 're_explain';
  reviewCount: number;
}

export interface QuizQuestion {
  id: string;
  conceptKey: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    reasoningExplanation: string;
  }[];
  hint: string;
  setupDescription?: string;
}

export interface LearnerProgress {
  predictionsAttempted: number;
  explanationsUnderstood: number;
  conceptsRevisited: number;
  quizQuestionsCompleted: number;
  quizRetries: number;
  hintLevelsUsed: Record<HintLevel, number>;
  cardsMastered: number;
  cardsReviewing: number;
  exploredConcepts: string[];
  sessionStartedAt: number;
  lastActiveAt: number;
}
