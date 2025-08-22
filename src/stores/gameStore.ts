import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { 
  GameState, 
  GamePhase, 
  Question, 
  QuizResult, 
  BodyPartType, 
  BodyPartStyle,
  GameSettings,
  GameStatistics,
  Achievement
} from '../types';
import { QuestionGeneratorService } from '../services/QuestionGenerator';

export const useGameStore = defineStore('game', () => {
  // State
  const currentPhase = ref<GamePhase>('quiz');
  const currentQuestionIndex = ref(0);
  const score = ref(0);
  const totalQuestions = ref(0);
  const unlockedBodyPartTypes = ref<Record<BodyPartType, BodyPartStyle>>({} as Record<BodyPartType, BodyPartStyle>);
  const selectedVariations = ref<Record<BodyPartType, string>>({} as Record<BodyPartType, string>);
  const incorrectQuestions = ref<Question[]>([]);
  const quizResults = ref<QuizResult[]>([]);
  const isRetryMode = ref(false);
  const gameStartTime = ref(0);
  const totalTimeSpent = ref(0);
  const questions = ref<Question[]>([]);
  const currentQuestion = ref<Question | null>(null);
  const gameSettings = ref<GameSettings>({
    questionsPerQuiz: 3,
    timeLimit: undefined,
    difficulty: 'easy',
    categories: ['addition'],
    allowHints: true,
    allowRetry: true,
    enableCustomization: true
  });
  const statistics = ref<GameStatistics>({
    totalGamesPlayed: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimePlayed: 0,
    favoriteBodyPartTypes: {} as Record<BodyPartType, BodyPartStyle>,
    questionPerformance: {}
  });
  const achievements = ref<Achievement[]>([]);

  // Computed
  const progress = computed(() => {
    return questions.value.length > 0 ? ((currentQuestionIndex.value + 1) / questions.value.length) * 100 : 0;
  });

  const isPerfectScore = computed(() => {
    return score.value === totalQuestions.value && totalQuestions.value > 0;
  });

  const canCustomize = computed(() => {
    return isPerfectScore.value && gameSettings.value.enableCustomization;
  });

  const currentQuestionData = computed(() => {
    return questions.value[currentQuestionIndex.value] || null;
  });

  const gameState = computed((): GameState => ({
    currentPhase: currentPhase.value,
    currentQuestionIndex: currentQuestionIndex.value,
    score: score.value,
    totalQuestions: totalQuestions.value,
    unlockedBodyPartTypes: unlockedBodyPartTypes.value,
    selectedVariations: selectedVariations.value,
    incorrectQuestions: incorrectQuestions.value,
    quizResults: quizResults.value,
    isRetryMode: isRetryMode.value,
    gameStartTime: gameStartTime.value,
    totalTimeSpent: totalTimeSpent.value
  }));

  // Actions
  const startNewGame = () => {
    const questionGenerator = QuestionGeneratorService.getInstance();
    
    try {
      questions.value = questionGenerator.generateQuestions(
        gameSettings.value.questionsPerQuiz,
        gameSettings.value.difficulty,
        gameSettings.value.categories
      );
      
      // Fallback if no questions generated
      if (questions.value.length === 0) {
        console.warn('No questions generated, using fallback');
        questions.value = [{
          id: 'fallback_1',
          question: 'What is 5 + 3?',
          correctAnswer: '8',
          bodyPart: 'eyes',
          options: ['7', '8', '9'],
          answerToBodyPartType: { '7': 'square', '8': 'round', '9': 'triangle' },
          difficulty: 'easy',
          category: 'addition'
        }];
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback question
      questions.value = [{
        id: 'fallback_1',
        question: 'What is 5 + 3?',
        correctAnswer: '8',
        bodyPart: 'eyes',
        options: ['7', '8', '9'],
        answerToBodyPartType: { '7': 'square', '8': 'round', '9': 'triangle' },
        difficulty: 'easy',
        category: 'addition'
      }];
    }
    
    currentQuestionIndex.value = 0;
    score.value = 0;
    totalQuestions.value = questions.value.length;
    unlockedBodyPartTypes.value = {} as Record<BodyPartType, BodyPartStyle>;
    selectedVariations.value = {} as Record<BodyPartType, string>;
    incorrectQuestions.value = [];
    quizResults.value = [];
    isRetryMode.value = false;
    gameStartTime.value = Date.now();
    currentPhase.value = 'quiz';
    
    statistics.value.totalGamesPlayed++;
  };

  const answerQuestion = (selectedAnswer: string) => {
    if (!currentQuestionData.value) return;

    const question = currentQuestionData.value;
    const isCorrect = selectedAnswer === question.correctAnswer;
    const timeSpent = Date.now() - gameStartTime.value;

    const result: QuizResult = {
      questionId: question.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    quizResults.value.push(result);

    // Always unlock a body part type based on the selected answer
    const bodyPartType = question.answerToBodyPartType[selectedAnswer];
    unlockedBodyPartTypes.value[question.bodyPart] = bodyPartType;

    if (isCorrect) {
      score.value++;
    } else {
      incorrectQuestions.value.push(question);
    }

    // Update statistics
    updateQuestionPerformance(question.id, isCorrect);
  };

  const selectVariation = (bodyPartType: BodyPartType, variation: string) => {
    selectedVariations.value[bodyPartType] = variation;
    
    // Update statistics
    if (unlockedBodyPartTypes.value[bodyPartType]) {
      statistics.value.favoriteBodyPartTypes[bodyPartType] = unlockedBodyPartTypes.value[bodyPartType];
    }
  };

  const nextQuestion = () => {
    currentQuestionIndex.value++;
    
    if (currentQuestionIndex.value >= questions.value.length) {
      if (isRetryMode.value) {
        finishRetryMode();
      } else {
        currentPhase.value = 'results';
      }
    } else {
      // If there are more questions, go back to quiz phase
      currentPhase.value = 'quiz';
    }
  };

  const startRetryMode = () => {
    isRetryMode.value = true;
    questions.value = [...incorrectQuestions.value];
    currentQuestionIndex.value = 0;
    score.value = 0;
    totalQuestions.value = questions.value.length;
    incorrectQuestions.value = [];
    quizResults.value = [];
    currentPhase.value = 'quiz';
    gameStartTime.value = Date.now();
  };

  const finishRetryMode = () => {
    isRetryMode.value = false;
    currentPhase.value = 'results';
    updateStatistics();
  };

  const startCustomization = () => {
    if (canCustomize.value) {
      currentPhase.value = 'customization';
    }
  };

  const setPhase = (phase: GamePhase) => {
    currentPhase.value = phase;
  };

  const updateGameSettings = (settings: Partial<GameSettings>) => {
    gameSettings.value = { ...gameSettings.value, ...settings };
  };

  const updateQuestionPerformance = (questionId: string, isCorrect: boolean) => {
    if (!statistics.value.questionPerformance[questionId]) {
      statistics.value.questionPerformance[questionId] = { correct: 0, total: 0 };
    }
    
    const performance = statistics.value.questionPerformance[questionId];
    performance.total++;
    if (isCorrect) {
      performance.correct++;
    }
  };

  const updateStatistics = () => {
    const currentScore = score.value;
    const currentTime = Date.now() - gameStartTime.value;
    
    // Update best score
    if (currentScore > statistics.value.bestScore) {
      statistics.value.bestScore = currentScore;
    }
    
    // Update average score
    const totalGames = statistics.value.totalGamesPlayed;
    const currentAverage = statistics.value.averageScore;
    statistics.value.averageScore = ((currentAverage * (totalGames - 1)) + currentScore) / totalGames;
    
    // Update total time played
    statistics.value.totalTimePlayed += currentTime;
    
    // Check for achievements
    checkAchievements();
  };

  const checkAchievements = () => {
    // Example achievements
    const newAchievements: Achievement[] = [];
    
    if (statistics.value.totalGamesPlayed >= 5) {
      newAchievements.push({
        id: 'first_5_games',
        name: 'Getting Started',
        description: 'Played 5 games',
        icon: '🎮',
        unlocked: true,
        unlockDate: new Date(),
        criteria: { type: 'questions', value: 5, condition: 'greater-than' }
      });
    }
    
    if (statistics.value.bestScore >= 10) {
      newAchievements.push({
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Got a perfect score',
        icon: '🏆',
        unlocked: true,
        unlockDate: new Date(),
        criteria: { type: 'score', value: 10, condition: 'greater-than' }
      });
    }
    
    achievements.value.push(...newAchievements);
  };

  const resetGame = () => {
    startNewGame();
  };

  return {
    // State
    currentPhase,
    currentQuestionIndex,
    score,
    totalQuestions,
    unlockedBodyPartTypes,
    selectedVariations,
    incorrectQuestions,
    quizResults,
    isRetryMode,
    gameStartTime,
    totalTimeSpent,
    questions,
    currentQuestion,
    gameSettings,
    statistics,
    achievements,
    
    // Computed
    progress,
    isPerfectScore,
    canCustomize,
    currentQuestionData,
    gameState,
    
    // Actions
    startNewGame,
    answerQuestion,
    selectVariation,
    nextQuestion,
    startRetryMode,
    finishRetryMode,
    startCustomization,
    setPhase,
    updateGameSettings,
    updateStatistics,
    resetGame
  };
}); 