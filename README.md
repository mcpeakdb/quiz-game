# 🧩 Monster Creation Quiz Game

A scalable, modern educational browser game built with **Vue 3**, **TypeScript**, and **Pinia** where players answer math questions to build and customize their own monster!

## 🚀 **New Scalable Architecture**

### **Tech Stack**
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development with full IntelliSense
- **Pinia** - Modern state management for Vue
- **Vite** - Lightning-fast build tool and dev server
- **CSS3** - Modern styling with animations and responsive design

### **Scalability Features**
- **Modular Components** - Reusable Vue components for each game phase
- **Type Safety** - Full TypeScript coverage with interfaces and types
- **State Management** - Centralized Pinia store with reactive state
- **Service Layer** - Scalable question generation with multiple categories
- **Achievement System** - Extensible achievement framework
- **Statistics Tracking** - Comprehensive game analytics
- **Settings Management** - Configurable game parameters

## 🎮 **How to Play**

1. **Answer Math Questions**: Solve problems across multiple categories (addition, subtraction, multiplication, division, word problems)
2. **Choose Body Parts**: Select from different styles (round, square, triangle, star, heart, diamond) for each body part
3. **Review Results**: See your score, statistics, and retry incorrect questions
4. **Customize Your Monster**: Drag body parts around and change their colors (perfect score required!)

## 🏗️ **Architecture Overview**

### **Core Components**
```
src/
├── components/           # Vue components
│   ├── QuizSection.vue      # Quiz interface
│   ├── BodyPartSelection.vue # Body part selection
│   ├── ResultsSection.vue    # Results display
│   ├── CustomizationSection.vue # Drag & drop customization
│   ├── MonsterRenderer.vue   # Monster visualization
│   └── DraggableBodyPart.vue # Draggable body parts
├── stores/              # Pinia state management
│   └── gameStore.ts        # Main game state
├── services/            # Business logic
│   └── QuestionGenerator.ts # Question generation service
├── types/               # TypeScript definitions
│   └── index.ts            # All type definitions
└── main.ts              # App entry point
```

### **State Management (Pinia)**
- **Game State**: Current phase, questions, score, progress
- **Quiz Results**: Answer tracking, performance analytics
- **Body Parts**: Selected styles and positions
- **Statistics**: Game history, achievements, performance metrics
- **Settings**: Configurable game parameters

### **Type Safety**
```typescript
interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  bodyPart: BodyPartType;
  options: string[];
  hint: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
}

type BodyPartType = 'eyes' | 'ears' | 'nose' | 'mouth' | 'arms' | 'legs' | 'tail' | 'wings';
type GamePhase = 'quiz' | 'selection' | 'results' | 'customization';
```

## 🎯 **Scalable Features**

### **Question Generation System**
- **Multiple Categories**: Addition, subtraction, multiplication, division, word problems
- **Difficulty Levels**: Easy, medium, hard with appropriate number ranges
- **Dynamic Generation**: Questions generated on-demand with unique IDs
- **Hint System**: Context-aware hints for each question type
- **Extensible**: Easy to add new question types and categories

### **Body Part System**
- **Multiple Styles**: Round, square, triangle, star, heart, diamond
- **Extensible Types**: Eyes, ears, nose, mouth, arms, legs, tail, wings
- **Color Masking**: CSS-based color customization for any body part
- **Drag & Drop**: Full drag and drop functionality with position tracking

### **Achievement System**
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  criteria: AchievementCriteria;
}
```

### **Statistics Tracking**
- **Game Performance**: Score tracking, time spent, accuracy rates
- **Question Analytics**: Performance per question type and difficulty
- **Player Preferences**: Favorite body parts and styles
- **Progress Tracking**: Long-term learning progress

## 🛠️ **Development Setup**

### **Prerequisites**
- Node.js 16+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd monster-quiz-game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

### **Development Scripts**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production with TypeScript compilation
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking

## 🔧 **Customization & Extension**

### **Adding New Question Types**
```typescript
// In QuestionGenerator.ts
private generateNewQuestionType(difficulty: QuestionDifficulty, bodyPart: string): Question {
  return {
    id: `new_${Date.now()}_${Math.random()}`,
    question: "Your custom question?",
    correctAnswer: "answer",
    bodyPart: bodyPart as any,
    options: ["option1", "option2", "option3", "option4"],
    hint: "Custom hint",
    difficulty,
    category: 'custom-category'
  };
}
```

### **Adding New Body Parts**
1. **Update Types**: Add to `BodyPartType` union
2. **Add Styles**: Extend `BodyPartStyle` options
3. **Update Renderer**: Add positioning logic in `MonsterRenderer.vue`
4. **Add Previews**: Create CSS for new body part styles

### **Adding New Achievements**
```typescript
// In gameStore.ts
const newAchievement: Achievement = {
  id: 'custom_achievement',
  name: 'Custom Achievement',
  description: 'Achievement description',
  icon: '🏆',
  unlocked: false,
  criteria: { type: 'score', value: 100, condition: 'greater-than' }
};
```

### **Customizing Game Settings**
```typescript
// In gameStore.ts
const customSettings: GameSettings = {
  questionsPerQuiz: 5,
  timeLimit: 300, // 5 minutes
  difficulty: 'medium',
  categories: ['addition', 'multiplication'],
  allowHints: true,
  allowRetry: true,
  enableCustomization: true
};
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: #4CAF50 (Green)
- **Secondary**: #2196F3 (Blue)
- **Accent**: #ff6b6b (Coral)
- **Background**: Linear gradient (#667eea to #764ba2)

### **Typography**
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headings**: 2.5rem with text shadows
- **Body Text**: 1.1rem with good contrast

### **Animations**
- **Fade In**: Smooth section transitions
- **Hover Effects**: Scale and shadow transforms
- **Drag Feedback**: Visual feedback during drag operations
- **Progress Bars**: Animated progress indicators

## 📱 **Responsive Design**

### **Breakpoints**
- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adjusted grid)
- **Mobile**: < 768px (Single column layout)

### **Touch Support**
- **Drag & Drop**: Works on touch devices
- **Button Sizing**: Minimum 44px touch targets
- **Gesture Support**: Pinch to zoom, swipe gestures

## 🚀 **Performance Optimizations**

### **Vue 3 Features**
- **Composition API**: Better tree-shaking and performance
- **Reactive System**: Efficient reactivity with Proxy
- **Fragment Support**: Multiple root elements
- **Teleport**: Modal and overlay management

### **Build Optimizations**
- **Vite**: Lightning-fast HMR and build times
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Automatic route-based splitting
- **TypeScript**: Compile-time optimizations

## 🔮 **Future Enhancements**

### **Planned Features**
- **Multiplayer Mode**: Real-time monster battles
- **Save/Load System**: Persistent monster creations
- **Sound Effects**: Audio feedback and background music
- **Advanced Customization**: More body parts, effects, animations
- **Leaderboards**: Global and local high scores
- **Progressive Web App**: Offline support and app-like experience

### **Technical Improvements**
- **Unit Testing**: Jest + Vue Test Utils
- **E2E Testing**: Playwright or Cypress
- **Internationalization**: Multi-language support
- **Accessibility**: WCAG 2.1 compliance
- **Performance Monitoring**: Real user metrics

## 📊 **Analytics & Insights**

### **Tracked Metrics**
- **Game Completion Rate**: How many players finish quizzes
- **Question Performance**: Which questions are hardest
- **Body Part Preferences**: Most popular styles
- **Time Spent**: Engagement duration per session
- **Retry Patterns**: Learning behavior analysis

### **Data Privacy**
- **Local Storage**: Game progress and settings
- **No External Tracking**: Privacy-first approach
- **Optional Analytics**: Opt-in performance monitoring

## 🤝 **Contributing**

### **Development Guidelines**
1. **TypeScript First**: All new code must be typed
2. **Component Structure**: Follow Vue 3 Composition API patterns
3. **State Management**: Use Pinia for all state changes
4. **Testing**: Write tests for new features
5. **Documentation**: Update README for new features

### **Code Style**
- **ESLint**: Consistent code formatting
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **Vue**: Official Vue style guide compliance

## 📄 **License**

MIT License - See LICENSE file for details

---

**Built with ❤️ using Vue 3, TypeScript, and modern web technologies**

*Transform your learning experience with this scalable, educational monster creation game!* 