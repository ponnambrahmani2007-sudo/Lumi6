import { LearnerProgress } from './types';

const STORAGE_KEY = 'lumi6_learner_progress_v1';

export const INITIAL_PROGRESS: LearnerProgress = {
  predictionsAttempted: 0,
  explanationsUnderstood: 0,
  conceptsRevisited: 0,
  quizQuestionsCompleted: 0,
  quizRetries: 0,
  hintLevelsUsed: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  cardsMastered: 0,
  cardsReviewing: 0,
  exploredConcepts: [],
  sessionStartedAt: Date.now(),
  lastActiveAt: Date.now()
};

export class LocalStorageRepository {
  public static loadProgress(): LearnerProgress {
    if (typeof window === 'undefined') {
      return { ...INITIAL_PROGRESS };
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback silently if storage unavailable
    }
    return { ...INITIAL_PROGRESS };
  }

  public static saveProgress(progress: LearnerProgress): void {
    if (typeof window === 'undefined') return;
    try {
      progress.lastActiveAt = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Handle storage quota exceeded gracefully
    }
  }

  public static recordPrediction(conceptKey: string): LearnerProgress {
    const current = this.loadProgress();
    current.predictionsAttempted += 1;
    if (!current.exploredConcepts.includes(conceptKey)) {
      current.exploredConcepts.push(conceptKey);
    }
    this.saveProgress(current);
    return current;
  }

  public static recordExplanationUnderstood(conceptKey: string): LearnerProgress {
    const current = this.loadProgress();
    current.explanationsUnderstood += 1;
    if (!current.exploredConcepts.includes(conceptKey)) {
      current.exploredConcepts.push(conceptKey);
    } else {
      current.conceptsRevisited += 1;
    }
    this.saveProgress(current);
    return current;
  }

  public static recordHintUsed(level: 1 | 2 | 3 | 4 | 5): LearnerProgress {
    const current = this.loadProgress();
    current.hintLevelsUsed[level] = (current.hintLevelsUsed[level] || 0) + 1;
    this.saveProgress(current);
    return current;
  }

  public static recordQuizAttempt(isCorrect: boolean, isRetry: boolean): LearnerProgress {
    const current = this.loadProgress();
    if (isCorrect) {
      current.quizQuestionsCompleted += 1;
    }
    if (isRetry) {
      current.quizRetries += 1;
    }
    this.saveProgress(current);
    return current;
  }

  public static recordCardReview(rating: 'understand' | 'learning' | 're_explain'): LearnerProgress {
    const current = this.loadProgress();
    if (rating === 'understand') {
      current.cardsMastered += 1;
    } else {
      current.cardsReviewing += 1;
    }
    this.saveProgress(current);
    return current;
  }

  public static clear(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Graceful error handling
    }
  }
}
