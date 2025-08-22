export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  bodyPart: BodyPartType;
  options: string[];
  answerToBodyPartType: Record<string, BodyPartStyle>;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
}

export interface QuizResult {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  bodyPartType?: BodyPartType;
  selectedVariation?: string;
}

export interface BodyPart {
  type: BodyPartType;
  bodyPartType: BodyPartType;
  variation: string;
  position: Position;
  color: string;
  size: Size;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameState {
  currentPhase: GamePhase;
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  unlockedBodyPartTypes: Record<BodyPartType, BodyPartStyle>;
  selectedVariations: Record<BodyPartType, string>;
  incorrectQuestions: Question[];
  quizResults: QuizResult[];
  isRetryMode: boolean;
  gameStartTime: number;
  totalTimeSpent: number;
}

export interface GameSettings {
  questionsPerQuiz: number;
  timeLimit?: number;
  difficulty: QuestionDifficulty;
  categories: QuestionCategory[];
  allowHints: boolean;
  allowRetry: boolean;
  enableCustomization: boolean;
}

export type BodyPartType = 'eyes' | 'ears' | 'nose' | 'mouth' | 'arms' | 'legs' | 'tail' | 'wings';
export type BodyPartStyle = 'round' | 'square' | 'triangle';
export type GamePhase = 'quiz' | 'selection' | 'results' | 'customization';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionCategory = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'word-problems';

export interface BodyPartVariations {
  round: string[];
  square: string[];
  triangle: string[];
}

export interface QuestionGenerator {
  generateQuestions(count: number, difficulty: QuestionDifficulty, categories: QuestionCategory[]): Question[];
}

export interface BodyPartRenderer {
  renderBodyPart(part: BodyPart): string;
  getAvailableVariations(bodyPartType: BodyPartType, style: BodyPartStyle): string[];
}

export interface GameStatistics {
  totalGamesPlayed: number;
  averageScore: number;
  bestScore: number;
  totalTimePlayed: number;
  favoriteBodyPartTypes: Record<BodyPartType, BodyPartStyle>;
  questionPerformance: Record<string, { correct: number; total: number }>;
}

export interface CustomizationOptions {
  colors: string[];
  sizes: Size[];
  positions: Position[];
  effects: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockDate?: Date;
  criteria: AchievementCriteria;
}

export interface AchievementCriteria {
  type: 'score' | 'time' | 'questions' | 'customization' | 'streak';
  value: number;
  condition: 'equals' | 'greater-than' | 'less-than' | 'contains';
} 