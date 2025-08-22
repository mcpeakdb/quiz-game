<template>
  <div class="section active">
    <h2>Quiz Complete!</h2>
    
    <!-- Perfect Score Message -->
    <div v-if="score === totalQuestions" class="perfect-score-section">
      <div class="congratulations">
        <h3>🎉 Congratulations! 🎉</h3>
        <p class="perfect-message">You got all the questions right!</p>
        <p class="perfect-subtitle">Your creature is perfect as it is!</p>
      </div>
      
      <div class="creature-display">
        <h3>Your Perfect Creature</h3>
        <div class="creature-container">
          <CreatureRenderer 
            :unlocked-body-part-types="unlockedBodyPartTypes" 
            :selected-variations="selectedVariations" 
          />
        </div>
        <p class="creature-label">Your amazing creation!</p>
      </div>
    </div>
    
    <!-- Imperfect Score - Show Comparison -->
    <div v-else class="creature-comparison">
      <div class="creature-display">
        <h3>Your Creature</h3>
        <div class="creature-container">
          <CreatureRenderer 
            :unlocked-body-part-types="unlockedBodyPartTypes" 
            :selected-variations="selectedVariations" 
          />
        </div>
        <p class="creature-label">Your unique creation!</p>
      </div>
      
      <div class="creature-display">
        <h3>Perfect Creature</h3>
        <div class="creature-container">
          <CreatureRenderer 
            :unlocked-body-part-types="correctBodyPartTypes" 
            :selected-variations="correctVariations"
            :incorrect-parts="incorrectBodyParts"
          />
        </div>
        <p class="creature-label">What it could look like with all correct answers!</p>
      </div>
    </div>
    
    <div class="action-buttons">
      <button 
        v-if="incorrectQuestions.length > 0"
        class="btn primary" 
        @click="$emit('retry')"
      >
        Practice More Questions
      </button>
      <button 
        v-if="score === totalQuestions"
        class="btn secondary" 
        @click="$emit('customize')"
      >
        Customize Creature
      </button>
      <button class="btn primary" @click="$emit('restart')">
        Start New Quiz
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CreatureRenderer from './CreatureRenderer.vue'
import type { Question, BodyPartType, BodyPartStyle } from '../types'

interface Props {
  score: number
  totalQuestions: number
  incorrectQuestions: Question[]
  unlockedBodyPartTypes: Record<BodyPartType, BodyPartStyle>
  selectedVariations: Record<BodyPartType, string>
  canCustomize: boolean
  questions: Question[]
  quizResults: Array<{
    questionId: string
    selectedAnswer: string
    isCorrect: boolean
    timeSpent: number
  }>
}

interface Emits {
  (e: 'retry'): void
  (e: 'customize'): void
  (e: 'restart'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

// Generate the "perfect" creature based on player's actual performance
const correctBodyPartTypes = computed(() => {
  const correctTypes: Record<BodyPartType, BodyPartStyle> = {} as Record<BodyPartType, BodyPartStyle>
  
  props.questions.forEach(question => {
    // Find the quiz result for this question
    const result = props.quizResults.find(r => r.questionId === question.id)
    
    if (result) {
      if (result.isCorrect) {
        // Player got it right, use their actual choice
        const bodyPartType = question.answerToBodyPartType[result.selectedAnswer]
        correctTypes[question.bodyPart] = bodyPartType
      } else {
        // Player got it wrong, use the correct answer
        const correctAnswer = question.correctAnswer
        const bodyPartType = question.answerToBodyPartType[correctAnswer]
        correctTypes[question.bodyPart] = bodyPartType
      }
    }
  })
  
  return correctTypes
})

// Generate variations for the correct creature
const correctVariations = computed(() => {
  const variations: Record<BodyPartType, string> = {} as Record<BodyPartType, string>
  
  props.questions.forEach(question => {
    const result = props.quizResults.find(r => r.questionId === question.id)
    
    if (result) {
      if (result.isCorrect) {
        // Player got it right, use their actual variation if they selected one
        const playerVariation = props.selectedVariations[question.bodyPart]
        if (playerVariation) {
          variations[question.bodyPart] = playerVariation
        } else {
          // Fallback to first variation
          const bodyPartType = question.answerToBodyPartType[result.selectedAnswer]
          variations[question.bodyPart] = `${bodyPartType}-1`
        }
      } else {
        // Player got it wrong, use first variation of correct type
        const correctAnswer = question.correctAnswer
        const bodyPartType = question.answerToBodyPartType[correctAnswer]
        variations[question.bodyPart] = `${bodyPartType}-1`
      }
    }
  })
  
  return variations
})

// Identify which body parts were incorrect (for red highlighting)
const incorrectBodyParts = computed(() => {
  const incorrect: BodyPartType[] = []
  
  props.questions.forEach(question => {
    const result = props.quizResults.find(r => r.questionId === question.id)
    
    if (result && !result.isCorrect) {
      incorrect.push(question.bodyPart)
    }
  })
  
  return incorrect
})
</script>

<style scoped>
.perfect-score-section {
  text-align: center;
  margin: 30px 0;
}

.congratulations {
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
}

.congratulations h3 {
  font-size: 2em;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.perfect-message {
  font-size: 1.4em;
  margin-bottom: 10px;
  font-weight: bold;
}

.perfect-subtitle {
  font-size: 1.1em;
  opacity: 0.9;
}

.creature-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
}

.creature-display {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.creature-display h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.3em;
}

.creature-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  min-height: 200px;
  align-items: center;
}

.creature-label {
  color: #666;
  font-size: 0.9em;
  font-style: italic;
  margin: 0;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.btn.primary:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px);
}

.btn.secondary {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
}

.btn.secondary:hover {
  background: linear-gradient(135deg, #1976D2, #1565C0);
  transform: translateY(-2px);
}

/* Responsive design */
@media (max-width: 768px) {
  .creature-comparison {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .congratulations h3 {
    font-size: 1.5em;
  }
  
  .perfect-message {
    font-size: 1.2em;
  }
}
</style> 