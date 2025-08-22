<template>
  <div class="section active">
    <h2>Customize Your Creature!</h2>
    <div class="customization-controls">
      <div class="color-picker">
        <label for="color-selector">Choose Color:</label>
        <input 
          type="color" 
          id="color-selector" 
          v-model="selectedColor"
          @change="changeBodyPartColor"
        >
      </div>
      <div class="body-part-selector">
        <label for="part-selector">Select Body Part:</label>
        <select 
          id="part-selector" 
          v-model="selectedPart"
          @change="selectBodyPartForCustomization"
        >
          <option 
            v-for="(type, partType) in unlockedBodyPartTypes" 
            :key="partType"
            :value="partType"
          >
            {{ partType.charAt(0).toUpperCase() + partType.slice(1) }} ({{ type }})
          </option>
        </select>
      </div>
    </div>
    
    <div class="creature-workspace">
      <div id="customizable-creature">
        <DraggableBodyPart
          v-for="(type, partType) in unlockedBodyPartTypes"
          :key="partType"
          :part-type="partType"
          :body-part-type="type"
          :variation="selectedVariations[partType] || ''"
          :color="bodyPartColors[partType] || '#ff6b6b'"
          @color-change="updateBodyPartColor"
        />
      </div>
    </div>
    
    <button class="btn primary" @click="$emit('restart')">
      Start New Quiz
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { BodyPartType, BodyPartStyle } from '../types'
import DraggableBodyPart from './DraggableBodyPart.vue'

interface Props {
  unlockedBodyPartTypes: Record<BodyPartType, BodyPartStyle>
  selectedVariations: Record<BodyPartType, string>
}

interface Emits {
  (e: 'restart'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedColor = ref('#ff6b6b')
const selectedPart = ref<BodyPartType | ''>('')
const bodyPartColors = reactive<Record<BodyPartType, string>>({} as Record<BodyPartType, string>)

const changeBodyPartColor = () => {
  if (selectedPart.value) {
    bodyPartColors[selectedPart.value] = selectedColor.value
  }
}

const selectBodyPartForCustomization = () => {
  if (selectedPart.value && bodyPartColors[selectedPart.value]) {
    selectedColor.value = bodyPartColors[selectedPart.value]
  }
}

const updateBodyPartColor = (partType: BodyPartType, color: string) => {
  bodyPartColors[partType] = color
}
</script>

<style scoped>
/* Component-specific styles */
</style> 