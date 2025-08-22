<template>
  <div 
    :class="`creature-body-part ${bodyPart}-part ${type}-${bodyPart}-${variation}`"
    :style="{
      '--body-part-bg': color || '#000',
      '--body-part-border': color || '#000',
      '--body-part-shadow': color ? `0 0 8px ${color}CC` : 'none'
    }"
  ></div>
</template>

<script setup lang="ts">
import type { BodyPartType, BodyPartStyle } from '../types'

interface Props {
  bodyPart: BodyPartType
  type: BodyPartStyle
  variation: string
  color?: string
}

defineProps<Props>()
</script>

<style scoped>
.creature-body-part {
  position: absolute;
  width: 60px;
  height: 60px;
  background: transparent;
  /* CSS custom properties for dynamic styling */
  --body-part-bg: white;
  --body-part-border: #333;
  --body-part-shadow: none;
}

/* Position each body part type */
.eyes-part {
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 30px;
}

.ears-part {
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 60px;
}

.nose-part {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
}

/* Round Eyes Variations */
.round-eyes-round-1::before,
.round-eyes-round-1::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 5px;
  border: 2px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.round-eyes-round-1::before {
  left: 5px;
}

.round-eyes-round-1::after {
  right: 5px;
}

.round-eyes-round-2::before,
.round-eyes-round-2::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 3px;
  box-shadow: inset 0 0 0 3px var(--body-part-border), var(--body-part-shadow);
}

.round-eyes-round-2::before {
  left: 3px;
}

.round-eyes-round-2::after {
  right: 3px;
}

.round-eyes-round-3::before,
.round-eyes-round-3::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 7px;
  border: 1px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.round-eyes-round-3::before {
  left: 7px;
}

.round-eyes-round-3::after {
  right: 7px;
}

/* Square Eyes Variations */
.square-eyes-square-1::before,
.square-eyes-square-1::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--body-part-bg);
  top: 5px;
  border: 2px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.square-eyes-square-1::before {
  left: 5px;
}

.square-eyes-square-1::after {
  right: 5px;
}

.square-eyes-square-2::before,
.square-eyes-square-2::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: var(--body-part-bg);
  top: 3px;
  border: 3px solid var(--body-part-border);
  border-radius: 3px;
  box-shadow: var(--body-part-shadow);
}

.square-eyes-square-2::before {
  left: 3px;
}

.square-eyes-square-2::after {
  right: 3px;
}

.square-eyes-square-3::before,
.square-eyes-square-3::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--body-part-bg);
  top: 7px;
  border: 1px solid var(--body-part-border);
  transform: rotate(45deg);
  box-shadow: var(--body-part-shadow);
}

.square-eyes-square-3::before {
  left: 7px;
}

.square-eyes-square-3::after {
  right: 7px;
}

/* Triangle Eyes Variations */
.triangle-eyes-triangle-1::before,
.triangle-eyes-triangle-1::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid var(--body-part-bg);
  top: 5px;
  filter: drop-shadow(0 0 2px var(--body-part-border));
}

.triangle-eyes-triangle-1::before {
  left: 5px;
}

.triangle-eyes-triangle-1::after {
  right: 5px;
}

.triangle-eyes-triangle-2::before,
.triangle-eyes-triangle-2::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 24px solid var(--body-part-bg);
  top: 3px;
  filter: drop-shadow(0 0 3px var(--body-part-border));
}

.triangle-eyes-triangle-2::before {
  left: 3px;
}

.triangle-eyes-triangle-2::after {
  right: 3px;
}

.triangle-eyes-triangle-3::before,
.triangle-eyes-triangle-3::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid var(--body-part-bg);
  top: 7px;
  filter: drop-shadow(0 0 1px var(--body-part-border));
}

.triangle-eyes-triangle-3::before {
  left: 7px;
}

.triangle-eyes-triangle-3::after {
  right: 7px;
}

/* Round Ears Variations */
.round-ears-round-1::before,
.round-ears-round-1::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 35px;
  background: var(--body-part-bg);
  border-radius: 50% 50% 0 0;
  top: 5px;
  border: 2px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.round-ears-round-1::before {
  left: -20px;
  transform: rotate(-15deg);
}

.round-ears-round-1::after {
  right: -20px;
  transform: rotate(15deg);
}

.round-ears-round-2::before,
.round-ears-round-2::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 30px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 8px;
  border: 3px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.round-ears-round-2::before {
  left: -15px;
  transform: rotate(-20deg);
}

.round-ears-round-2::after {
  right: -15px;
  transform: rotate(20deg);
}

.round-ears-round-3::before,
.round-ears-round-3::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 28px;
  background: var(--body-part-bg);
  border-radius: 50% 50% 0 0;
  top: 10px;
  border: 1px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.round-ears-round-3::before {
  left: -12px;
  transform: rotate(-10deg);
}

.round-ears-round-3::after {
  right: -12px;
  transform: rotate(10deg);
}

/* Square Ears Variations */
.square-ears-square-1::before,
.square-ears-square-1::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 32px;
  background: var(--body-part-bg);
  top: 6px;
  border: 2px solid var(--body-part-border);
  border-radius: 3px;
  box-shadow: var(--body-part-shadow);
}

.square-ears-square-1::before {
  left: -18px;
  transform: rotate(-15deg);
}

.square-ears-square-1::after {
  right: -18px;
  transform: rotate(15deg);
}

.square-ears-square-2::before,
.square-ears-square-2::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 28px;
  background: var(--body-part-bg);
  top: 8px;
  border: 3px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.square-ears-square-2::before {
  left: -15px;
  transform: rotate(-25deg);
}

.square-ears-square-2::after {
  right: -15px;
  transform: rotate(25deg);
}

.square-ears-square-3::before,
.square-ears-square-3::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 24px;
  background: var(--body-part-bg);
  top: 10px;
  border: 1px solid var(--body-part-border);
  transform: rotate(45deg);
  box-shadow: var(--body-part-shadow);
}

.square-ears-square-3::before {
  left: -10px;
  transform: rotate(-45deg);
}

.square-ears-square-3::after {
  right: -10px;
  transform: rotate(45deg);
}

/* Triangle Ears Variations */
.triangle-ears-triangle-1::before,
.triangle-ears-triangle-1::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 35px solid var(--body-part-bg);
  top: 5px;
  filter: drop-shadow(0 0 2px var(--body-part-border));
}

.triangle-ears-triangle-1::before {
  left: -20px;
  transform: rotate(-20deg);
}

.triangle-ears-triangle-1::after {
  right: -20px;
  transform: rotate(20deg);
}

.triangle-ears-triangle-2::before,
.triangle-ears-triangle-2::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 28px solid var(--body-part-bg);
  top: 8px;
  filter: drop-shadow(0 0 3px var(--body-part-border));
}

.triangle-ears-triangle-2::before {
  left: -15px;
  transform: rotate(-30deg);
}

.triangle-ears-triangle-2::after {
  right: -15px;
  transform: rotate(30deg);
}

.triangle-ears-triangle-3::before,
.triangle-ears-triangle-3::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 24px solid var(--body-part-bg);
  top: 10px;
  filter: drop-shadow(0 0 1px var(--body-part-border));
}

.triangle-ears-triangle-3::before {
  left: -12px;
  transform: rotate(-15deg);
}

.triangle-ears-triangle-3::after {
  right: -12px;
  transform: rotate(15deg);
}

/* Round Nose Variations */
.round-nose-round-1::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 7px;
  left: 7px;
  border: 2px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.round-nose-round-2::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 5px;
  left: 5px;
  border: 3px solid var(--body-part-border);
  box-shadow: inset 0 0 0 2px #fff, var(--body-part-shadow);
}

.round-nose-round-3::before {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  background: var(--body-part-bg);
  border-radius: 50%;
  top: 8px;
  left: 8px;
  border: 1px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

/* Square Nose Variations */
.square-nose-square-1::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--body-part-bg);
  top: 7px;
  left: 7px;
  border: 2px solid var(--body-part-border);
  box-shadow: var(--body-part-shadow);
}

.square-nose-square-2::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--body-part-bg);
  top: 5px;
  left: 5px;
  border: 3px solid var(--body-part-border);
  border-radius: 3px;
  box-shadow: var(--body-part-shadow);
}

.square-nose-square-3::before {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  background: var(--body-part-bg);
  top: 8px;
  left: 8px;
  border: 1px solid var(--body-part-border);
  transform: rotate(45deg);
  box-shadow: var(--body-part-shadow);
}

/* Triangle Nose Variations */
.triangle-nose-triangle-1::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid var(--body-part-bg);
  top: 7px;
  left: 7px;
  filter: drop-shadow(0 0 2px var(--body-part-border));
}

.triangle-nose-triangle-2::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid var(--body-part-bg);
  top: 5px;
  left: 5px;
  filter: drop-shadow(0 0 3px var(--body-part-border));
}

.triangle-nose-triangle-3::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 14px solid var(--body-part-bg);
  top: 8px;
  left: 9px;
  filter: drop-shadow(0 0 1px var(--body-part-border));
}
</style>