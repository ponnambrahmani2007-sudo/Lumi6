import { ProgressiveHint, HintLevel } from './types';

export class ProgressiveHintManager {
  private currentLevel: HintLevel = 1;
  private hints: ProgressiveHint[];

  constructor(hints: ProgressiveHint[]) {
    this.hints = hints;
  }

  public getCurrentHint(): ProgressiveHint {
    const found = this.hints.find(h => h.level === this.currentLevel);
    return found || this.hints[this.hints.length - 1];
  }

  public getHintByLevel(level: HintLevel): ProgressiveHint {
    const found = this.hints.find(h => h.level === level);
    return found || this.hints[this.hints.length - 1];
  }

  public canAdvance(): boolean {
    return this.currentLevel < 5;
  }

  public nextHint(): ProgressiveHint {
    if (this.currentLevel < 5) {
      this.currentLevel = (this.currentLevel + 1) as HintLevel;
    }
    return this.getCurrentHint();
  }

  public getFullExplanation(): ProgressiveHint {
    this.currentLevel = 5;
    return this.getCurrentHint();
  }

  public reset(): void {
    this.currentLevel = 1;
  }

  public getLevel(): HintLevel {
    return this.currentLevel;
  }
}
