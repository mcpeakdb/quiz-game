<template>
  <div class="section active">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      <span class="progress-text">Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}</span>
    </div>
    
    <div class="question-container" v-if="question">
      <h2 id="question-text">{{ question.question }}</h2>
      <div class="body-part-info">
        <span id="body-part-label">{{ question.bodyPart.charAt(0).toUpperCase() + question.bodyPart.slice(1) }}</span>
      </div>
      
      <div class="options-container" v-if="!showSelection">
        <button 
          v-for="option in question.options" 
          :key="option"
          class="option-btn"
          :class="{ selected: selectedAnswer === option }"
          @click="handleAnswer(option)"
        >
          {{ option }}
        </button>
      </div>
      
      <div v-if="selectedAnswer && !showSelection" class="continue-section">
        <p class="selected-answer">You selected: <strong>{{ selectedAnswer }}</strong></p>
        <p class="change-hint">You can change your answer before continuing</p>
        <button class="continue-btn" @click="showSelectionChoices">
          Continue to Selection
        </button>
      </div>
      
      <!-- Selection section -->
      <div v-if="showSelection && bodyPartType" class="selection-section">
        <p class="selected-answer">You selected: <strong>{{ selectedAnswer }}</strong></p>
        <p class="type-info">You unlocked <strong>{{ bodyPartType }}</strong> {{ question.bodyPart }}!</p>
        
        <div class="body-parts-grid">
          <div 
            v-for="variation in availableVariations" 
            :key="variation"
            class="body-part-option"
            :class="{ selected: selectedVariation === variation }"
            @click="selectVariation(variation)"
          >
            <div class="preview-container">
              <BodyPart 
                :body-part="question.bodyPart"
                :type="bodyPartType"
                :variation="variation"
              />
            </div>
            <span>{{ variation.charAt(0).toUpperCase() + variation.slice(1) }} {{ bodyPartType }} {{ question.bodyPart.charAt(0).toUpperCase() + question.bodyPart.slice(1) }}</span>
          </div>
        </div>
        
        <div v-if="selectedVariation" class="continue-section">
          <p class="selected-variation">You selected: <strong>{{ selectedVariation }}</strong></p>
          <button class="continue-btn" @click="continueToNext">
            Continue to Next Question
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { QuestionGeneratorService } from '../services/QuestionGenerator'
import type { Question, BodyPartType, BodyPartStyle } from '../types'
import BodyPart from './BodyPart.vue'

interface Props {
  question: Question | null
  progress: number
  currentQuestionIndex: number
  totalQuestions: number
}

interface Emits {
  (e: 'answer', answer: string): void
  (e: 'select', bodyPart: BodyPartType, variation: string): void
  (e: 'continue'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const gameStore = useGameStore()

const selectedAnswer = ref<string | null>(null)
const showSelection = ref(false)
const selectedVariation = ref<string | null>(null)

// Reset state when question changes
watch(() => props.question, () => {
  selectedAnswer.value = null
  showSelection.value = false
  selectedVariation.value = null
})

const bodyPartType = computed(() => {
  if (!props.question || !selectedAnswer.value) return null
  return props.question.answerToBodyPartType[selectedAnswer.value]
})

const availableVariations = computed(() => {
  if (!bodyPartType.value || !props.question) return []
  const questionGenerator = QuestionGeneratorService.getInstance()
  return questionGenerator.getBodyPartVariations(props.question.bodyPart, bodyPartType.value)
})

const handleAnswer = (answer: string) => {
  if (!props.question) return
  
  selectedAnswer.value = answer
  emit('answer', answer)
}

const showSelectionChoices = () => {
  showSelection.value = true
}

const selectVariation = (variation: string) => {
  selectedVariation.value = variation
  if (props.question) {
    emit('select', props.question.bodyPart, variation)
  }
}

const continueToNext = () => {
  emit('continue')
}
</script>

<style scoped>
.continue-section {
  margin-top: 10px;
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px solid #4CAF50;
}

.selected-answer {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 10px;
}

.change-hint {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
  font-style: italic;
}

.continue-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.option-btn.selected {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border-color: #4CAF50;
  transform: scale(1.05);
}

.type-info {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.body-parts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.body-part-option {
  text-align: center;
  padding: 20px;
  border: 3px solid #ddd;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.body-part-option:hover {
  border-color: #4CAF50;
  background: #f1f8e9;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.body-part-option.selected {
  border-color: #4CAF50;
  background: #4CAF50;
  color: white;
}

.preview-container {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  background: #333;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Override BodyPart positioning for preview container */
.preview-container :deep(.creature-body-part) {
  position: relative !important;
  left: auto !important;
  top: auto !important;
  transform: none !important;
  width: 40px !important;
  height: 40px !important;
}

.selected-variation {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 15px;
}

/* When options are visible, add more space */
.options-container + .continue-section {
  margin-top: 30px;
}
</style> 