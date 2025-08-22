import type { Question, QuestionDifficulty, QuestionCategory, BodyPartType, BodyPartStyle } from '../types';

export class QuestionGeneratorService {
  private static instance: QuestionGeneratorService;
  
  private constructor() {}
  
  static getInstance(): QuestionGeneratorService {
    if (!QuestionGeneratorService.instance) {
      QuestionGeneratorService.instance = new QuestionGeneratorService();
    }
    return QuestionGeneratorService.instance;
  }

  generateQuestions(
    count: number, 
    difficulty: QuestionDifficulty, 
    categories: QuestionCategory[]
  ): Question[] {
    const questions: Question[] = [];
    const bodyPartTypes: Array<{ bodyPart: BodyPartType; type: BodyPartStyle }> = [
      { bodyPart: 'eyes', type: 'round' },
      { bodyPart: 'ears', type: 'square' },
      { bodyPart: 'nose', type: 'triangle' },
      { bodyPart: 'mouth', type: 'round' },
      { bodyPart: 'arms', type: 'square' },
      { bodyPart: 'legs', type: 'triangle' },
      { bodyPart: 'tail', type: 'round' },
      { bodyPart: 'wings', type: 'square' }
    ];

    for (let i = 0; i < count; i++) {
      const category = categories[i % categories.length];
      const bodyPartData = bodyPartTypes[i % bodyPartTypes.length];
      
      const question = this.generateQuestionByCategory(category, difficulty, bodyPartData.bodyPart);
      questions.push(question);
    }

    return this.shuffleArray(questions);
  }

  // Get the body part type mapping for the current game
  getBodyPartTypeMapping(): Record<BodyPartType, BodyPartStyle> {
    const bodyPartTypes: Array<{ bodyPart: BodyPartType; type: BodyPartStyle }> = [
      { bodyPart: 'eyes', type: 'round' },
      { bodyPart: 'ears', type: 'square' },
      { bodyPart: 'nose', type: 'triangle' },
      { bodyPart: 'mouth', type: 'round' },
      { bodyPart: 'arms', type: 'square' },
      { bodyPart: 'legs', type: 'triangle' },
      { bodyPart: 'tail', type: 'round' },
      { bodyPart: 'wings', type: 'square' }
    ];

    const mapping: Record<BodyPartType, BodyPartStyle> = {} as Record<BodyPartType, BodyPartStyle>;
    bodyPartTypes.forEach(({ bodyPart, type }) => {
      mapping[bodyPart] = type;
    });

    return mapping;
  }

  // Get available variations for a specific body part type
  getBodyPartVariations(bodyPart: BodyPartType, type: BodyPartStyle): string[] {
    const variations: Record<BodyPartStyle, string[]> = {
      round: ['round-1', 'round-2', 'round-3'],
      square: ['square-1', 'square-2', 'square-3'],
      triangle: ['triangle-1', 'triangle-2', 'triangle-3']
    };

    return variations[type] || [];
  }

  private generateQuestionByCategory(
    category: QuestionCategory, 
    difficulty: QuestionDifficulty, 
    bodyPart: string
  ): Question {
    switch (category) {
      case 'addition':
        return this.generateAdditionQuestion(difficulty, bodyPart);
      case 'subtraction':
        return this.generateSubtractionQuestion(difficulty, bodyPart);
      case 'multiplication':
        return this.generateMultiplicationQuestion(difficulty, bodyPart);
      case 'division':
        return this.generateDivisionQuestion(difficulty, bodyPart);
      case 'word-problems':
        return this.generateWordProblem(difficulty, bodyPart);
      default:
        return this.generateAdditionQuestion(difficulty, bodyPart);
    }
  }

  private generateAdditionQuestion(difficulty: QuestionDifficulty, bodyPart: string): Question {
    const { a, b, answer } = this.getNumbersByDifficulty(difficulty, 'addition');
    const options = this.generateThreeOptions(answer, difficulty);
    
    return {
      id: `add_${Date.now()}_${Math.random()}`,
      question: `What is ${a} + ${b}?`,
      correctAnswer: answer.toString(),
      bodyPart: bodyPart as any,
      options: options,
      answerToBodyPartType: this.mapAnswersToBodyPartTypes(options, bodyPart as any),
      difficulty,
      category: 'addition'
    };
  }

  private generateSubtractionQuestion(difficulty: QuestionDifficulty, bodyPart: string): Question {
    const { a, b, answer } = this.getNumbersByDifficulty(difficulty, 'subtraction');
    const options = this.generateThreeOptions(answer, difficulty);
    
    return {
      id: `sub_${Date.now()}_${Math.random()}`,
      question: `What is ${a} - ${b}?`,
      correctAnswer: answer.toString(),
      bodyPart: bodyPart as any,
      options: options,
      answerToBodyPartType: this.mapAnswersToBodyPartTypes(options, bodyPart as any),
      difficulty,
      category: 'subtraction'
    };
  }

  private generateMultiplicationQuestion(difficulty: QuestionDifficulty, bodyPart: string): Question {
    const { a, b, answer } = this.getNumbersByDifficulty(difficulty, 'multiplication');
    const options = this.generateThreeOptions(answer, difficulty);
    
    return {
      id: `mul_${Date.now()}_${Math.random()}`,
      question: `What is ${a} × ${b}?`,
      correctAnswer: answer.toString(),
      bodyPart: bodyPart as any,
      options: options,
      answerToBodyPartType: this.mapAnswersToBodyPartTypes(options, bodyPart as any),
      difficulty,
      category: 'multiplication'
    };
  }

  private generateDivisionQuestion(difficulty: QuestionDifficulty, bodyPart: string): Question {
    const { a, b, answer } = this.getNumbersByDifficulty(difficulty, 'division');
    const options = this.generateThreeOptions(answer, difficulty);
    
    return {
      id: `div_${Date.now()}_${Math.random()}`,
      question: `What is ${a} ÷ ${b}?`,
      correctAnswer: answer.toString(),
      bodyPart: bodyPart as any,
      options: options,
      answerToBodyPartType: this.mapAnswersToBodyPartTypes(options, bodyPart as any),
      difficulty,
      category: 'division'
    };
  }

  private generateWordProblem(difficulty: QuestionDifficulty, bodyPart: string): Question {
    const problems = this.getWordProblemsByDifficulty(difficulty);
    const problem = problems[Math.floor(Math.random() * problems.length)];
    const options = this.generateThreeOptions(problem.answer, difficulty);
    
    return {
      id: `word_${Date.now()}_${Math.random()}`,
      question: problem.question,
      correctAnswer: problem.answer.toString(),
      bodyPart: bodyPart as any,
      options: options,
      answerToBodyPartType: this.mapAnswersToBodyPartTypes(options, bodyPart as any),
      difficulty,
      category: 'word-problems'
    };
  }

  private getNumbersByDifficulty(difficulty: QuestionDifficulty, operation: string) {
    switch (difficulty) {
      case 'easy':
        if (operation === 'addition' || operation === 'subtraction') {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return { a, b, answer: operation === 'addition' ? a + b : Math.max(a, b) - Math.min(a, b) };
        } else {
          const a = Math.floor(Math.random() * 5) + 1;
          const b = Math.floor(Math.random() * 5) + 1;
          return { a, b, answer: operation === 'multiplication' ? a * b : a };
        }
      case 'medium':
        if (operation === 'addition' || operation === 'subtraction') {
          const a = Math.floor(Math.random() * 50) + 10;
          const b = Math.floor(Math.random() * 50) + 10;
          return { a, b, answer: operation === 'addition' ? a + b : Math.max(a, b) - Math.min(a, b) };
        } else {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return { a, b, answer: operation === 'multiplication' ? a * b : a };
        }
      case 'hard':
        if (operation === 'addition' || operation === 'subtraction') {
          const a = Math.floor(Math.random() * 100) + 50;
          const b = Math.floor(Math.random() * 100) + 50;
          return { a, b, answer: operation === 'addition' ? a + b : Math.max(a, b) - Math.min(a, b) };
        } else {
          const a = Math.floor(Math.random() * 15) + 5;
          const b = Math.floor(Math.random() * 15) + 5;
          return { a, b, answer: operation === 'multiplication' ? a * b : a };
        }
      default:
        return { a: 5, b: 3, answer: 8 };
    }
  }

  private generateThreeOptions(correctAnswer: number, difficulty: QuestionDifficulty): string[] {
    const options = [correctAnswer.toString()];
    const range = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 10;
    
    while (options.length < 3) {
      const wrongAnswer = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * range) + 1;
      if (wrongAnswer > 0 && !options.includes(wrongAnswer.toString())) {
        options.push(wrongAnswer.toString());
      }
    }
    
    return this.shuffleArray(options);
  }

  private getWordProblemsByDifficulty(difficulty: QuestionDifficulty) {
    switch (difficulty) {
      case 'easy':
        return [
          { question: "If you have 3 apples and get 2 more, how many do you have?", answer: 5, hint: "Count the apples you start with, then add the new ones!" },
          { question: "There are 4 birds on a tree and 3 more fly in. How many birds are there now?", answer: 7, hint: "Add the birds that were there to the ones that flew in!" }
        ];
      case 'medium':
        return [
          { question: "A store has 25 books and sells 8. How many books are left?", answer: 17, hint: "Start with the total books and subtract the ones sold!" },
          { question: "If each box has 6 toys and you have 4 boxes, how many toys do you have?", answer: 24, hint: "Multiply the number of toys per box by the number of boxes!" }
        ];
      case 'hard':
        return [
          { question: "A train travels 120 miles in 3 hours. How many miles does it travel per hour?", answer: 40, hint: "Divide the total distance by the time taken!" },
          { question: "If you save $15 each week for 8 weeks, how much money will you have?", answer: 120, hint: "Multiply the amount saved per week by the number of weeks!" }
        ];
      default:
        return [{ question: "What is 5 + 3?", answer: 8, hint: "Count on your fingers!" }];
    }
  }

  private mapAnswersToBodyPartTypes(options: string[], bodyPart: BodyPartType): Record<string, BodyPartStyle> {
    const bodyPartTypes: BodyPartStyle[] = ['round', 'square', 'triangle'];
    const mapping: Record<string, BodyPartStyle> = {};
    
    options.forEach((option, index) => {
      mapping[option] = bodyPartTypes[index % 3];
    });
    
    return mapping;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
} 