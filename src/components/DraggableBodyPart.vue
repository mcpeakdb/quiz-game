<template>
  <div 
    ref="draggableElement"
    class="draggable-part creature-body-part"
    :class="[partType, bodyPartType, variation]"
    :style="elementStyle"
    @mousedown="startDrag"
    @mousemove="drag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { BodyPartType, BodyPartStyle } from '../types'

interface Props {
  partType: BodyPartType
  bodyPartType: BodyPartStyle
  variation: string
  color: string
}

interface Emits {
  (e: 'color-change', partType: BodyPartType, color: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const draggableElement = ref<HTMLElement>()
const isDragging = ref(false)
const currentX = ref(0)
const currentY = ref(0)
const initialX = ref(0)
const initialY = ref(0)
const xOffset = ref(0)
const yOffset = ref(0)

const elementStyle = computed(() => ({
  position: 'absolute' as const,
  cursor: isDragging.value ? 'grabbing' : 'grab',
  userSelect: 'none' as const,
  transition: isDragging.value ? 'none' : 'transform 0.1s ease',
  filter: 'brightness(0) saturate(100%)',
  backgroundColor: props.color,
  transform: `translate3d(${currentX.value}px, ${currentY.value}px, 0)`,
  zIndex: isDragging.value ? 1000 : 1
}))

const startDrag = (e: MouseEvent) => {
  if (!draggableElement.value) return
  
  initialX.value = e.clientX - xOffset.value
  initialY.value = e.clientY - yOffset.value
  
  if (e.target === draggableElement.value) {
    isDragging.value = true
    draggableElement.value.classList.add('dragging')
  }
}

const drag = (e: MouseEvent) => {
  if (isDragging.value) {
    e.preventDefault()
    currentX.value = e.clientX - initialX.value
    currentY.value = e.clientY - initialY.value
    
    xOffset.value = currentX.value
    yOffset.value = currentY.value
  }
}

const endDrag = () => {
  if (draggableElement.value) {
    initialX.value = currentX.value
    initialY.value = currentY.value
    isDragging.value = false
    draggableElement.value.classList.remove('dragging')
  }
}

onMounted(() => {
  // Set random initial position
  if (draggableElement.value) {
    const workspace = draggableElement.value.parentElement
    if (workspace) {
      const maxX = workspace.offsetWidth - 100
      const maxY = workspace.offsetHeight - 100
      currentX.value = Math.random() * maxX
      currentY.value = Math.random() * maxY
      xOffset.value = currentX.value
      yOffset.value = currentY.value
    }
  }
})
</script>

<style scoped>
.draggable-part {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.draggable-part.eyes {
  width: 80px;
  height: 40px;
}

.draggable-part.ears {
  width: 40px;
  height: 60px;
  border-radius: 50% 50% 0 0;
}

.draggable-part.nose {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.draggable-part:hover {
  transform: scale(1.05);
}

.draggable-part.dragging {
  transform: scale(1.1);
}
</style> 