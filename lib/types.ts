export type LearningLevel = "beginner" | "intermediate" | "advanced";

export interface TopicItem {
  id: string;
  title: string;
  description: string;
  level: LearningLevel;
  estimatedMinutes: number;
  featuredQuestion: string;
}

export interface SubjectItem {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  overview: string;
  sampleTopics: TopicItem[];
  sampleQuestions: {
    id: string;
    question: string;
    topic: string;
  }[];
}

export interface CuriosityQuestion {
  id: string;
  question: string;
  subjectSlug: string;
  subjectName: string;
  topic: string;
  iconName: string;
  accentColor: string;
  hintSnippet: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "companion";
  text: string;
  timestamp: string;
  type?: "text" | "hint" | "explanation" | "encouragement";
  actionSuggestion?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}
