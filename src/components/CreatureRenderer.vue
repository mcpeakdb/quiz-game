<template>
  <div class="creature-container">
    <!-- Creature body -->
    <div class="creature-body"></div>
    
    <!-- Body parts -->
    <BodyPart 
      v-for="(type, partType) in unlockedBodyPartTypes" 
      :key="partType"
      :body-part="partType"
      :type="type"
      :variation="selectedVariations[partType] || type + '-1'"
      :color="getBodyPartColor(partType)"
    />
  </div>
</template>

<script setup lang="ts">
import type { BodyPartType, BodyPartStyle } from '../types'
import BodyPart from './BodyPart.vue'

interface Props {
  unlockedBodyPartTypes: Record<BodyPartType, BodyPartStyle>
  selectedVariations: Record<BodyPartType, string>
  incorrectParts?: BodyPartType[]
}

const props = defineProps<Props>()

const getBodyPartColor = (partType: BodyPartType): string => {
  return props.incorrectParts && props.incorrectParts.includes(partType) ? '#ff0000' : ''
}
</script>

<style scoped>
.creature-container {
  width: 250px;
  height: 250px;
  margin: 0 auto;
  position: relative;
  background: #e8f5e8;
  border-radius: 50%;
  border: 3px solid #4CAF50;
}

.creature-body {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background-color: #4CAF50;
  border-radius: 50%;
}
</style> 