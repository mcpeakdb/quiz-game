<template>
  <div class="app-container">
    <header>
      <h1>🧩 Creature Creation Challenge</h1>
      <p>Answer math questions to create your creature!</p>
    </header>

    <div class="main-content" :class="{ 'full-width': currentPhase === 'customization' || currentPhase === 'results' }">
      <!-- Left Side - Quiz Content -->
      <div class="quiz-content">
        <!-- Loading State -->
        <div v-if="!currentQuestionData && currentPhase === 'quiz'" class="section active">
          <h2>Loading questions...</h2>
          <p>Please wait while we prepare your quiz.</p>
          <button @click="startNewGame" class="btn primary">Retry Loading</button>
        </div>

        <!-- Quiz Section -->
        <QuizSection 
          v-else-if="currentPhase === 'quiz' && currentQuestionData"
          :question="currentQuestionData"
          :progress="progress"
          :current-question-index="currentQuestionIndex"
          :total-questions="totalQuestions"
          @answer="handleAnswer"
          @select="handleBodyPartSelection"
          @continue="continueToNextQuestion"
        />

        <!-- Results Section -->
        <ResultsSection 
          v-if="currentPhase === 'results'"
          :score="score"
          :total-questions="totalQuestions"
          :incorrect-questions="incorrectQuestions"
          :unlocked-body-part-types="unlockedBodyPartTypes"
          :selected-variations="selectedVariations"
          :can-customize="canCustomize"
          :questions="questions"
          :quiz-results="quizResults"
          @retry="startRetryMode"
          @customize="startCustomization"
          @restart="resetGame"
        />

        <!-- Customization Section -->
        <CustomizationSection 
          v-if="currentPhase === 'customization'"
          :unlocked-body-part-types="unlockedBodyPartTypes"
          :selected-variations="selectedVariations"
          @restart="resetGame"
        />
      </div>

      <!-- Right Side - Creature Display -->
      <div class="creature-display" v-if="currentPhase !== 'customization' && currentPhase !== 'results'">
        <h3>Your Creature</h3>
        <div class="creature-container">
          <CreatureRenderer :unlocked-body-part-types="completedBodyParts" :selected-variations="selectedVariations" />
        </div>
        <div class="creature-info">
          <p v-if="Object.keys(completedBodyParts).length === 0">
            Answer questions to build your creature!
          </p>
          <div v-else class="body-parts-list">
            <h4>Body Parts:</h4>
            <ul>
              <li v-for="(type, partType) in completedBodyParts" :key="partType">
                {{ partType.charAt(0).toUpperCase() + partType.slice(1) }}: {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                <span v-if="selectedVariations[partType]" class="variation">
                  ({{ selectedVariations[partType] }})
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useGameStore } from './stores/gameStore'
import QuizSection from './components/QuizSection.vue'
import ResultsSection from './components/ResultsSection.vue'
import CustomizationSection from './components/CustomizationSection.vue'
import CreatureRenderer from './components/CreatureRenderer.vue'
import type { BodyPartType, BodyPartStyle } from './types'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()

// Use storeToRefs for reactive values
const {
  currentPhase,
  currentQuestionIndex,
  score,
  totalQuestions,
  currentQuestionData,
  progress,
  incorrectQuestions,
  canCustomize,
  questions,
  unlockedBodyPartTypes,
  selectedVariations,
  quizResults
} = storeToRefs(gameStore)

// Computed property for fully selected body parts
const completedBodyParts = computed(() => {
  const completed: Record<BodyPartType, BodyPartStyle> = {} as Record<BodyPartType, BodyPartStyle>
  
  for (const [bodyPart, bodyPartType] of Object.entries(unlockedBodyPartTypes.value)) {
    if (selectedVariations.value[bodyPart as BodyPartType]) {
      completed[bodyPart as BodyPartType] = bodyPartType
    }
  }
  
  return completed
})

// Direct access for methods
const {
  startNewGame,
  answerQuestion,
  selectVariation,
  nextQuestion,
  startRetryMode,
  startCustomization,
  resetGame,
  setPhase
} = gameStore

// Handle quiz answer
const handleAnswer = (answer: string) => {
  answerQuestion(answer)
}

// Handle body part selection
const handleBodyPartSelection = (bodyPartType: BodyPartType, variation: string) => {
  selectVariation(bodyPartType, variation)
}

// Continue to next question
const continueToNextQuestion = () => {
  nextQuestion()
}

// Initialize game on mount
onMounted(() => {
  startNewGame()
})
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  margin-top: 30px;
}

.main-content.full-width {
  grid-template-columns: 1fr;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.quiz-content {
  min-height: 500px;
}

.creature-display {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  height: fit-content;
  position: sticky;
  top: 20px;
}

.creature-display h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.creature-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.creature-info {
  text-align: center;
}

.body-parts-list {
  text-align: left;
}

.body-parts-list h4 {
  margin-bottom: 10px;
  color: #4CAF50;
}

.body-parts-list ul {
  list-style: none;
  padding: 0;
}

.body-parts-list li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.variation {
  color: #666;
  font-style: italic;
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .creature-display {
    position: static;
    order: -1;
  }
}
</style> 