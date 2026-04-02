<script setup lang="ts">
import { computed } from 'vue'
import { getPoint, getAngle, buildPath } from '@/lib/math-curves'
import type { ProgressCurveKey } from '@/lib/math-curves'

interface MathCurveProgressProps {
  value: number
  curve?: ProgressCurveKey
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  trackColor?: string
  fillColor?: string
  strokeWidth?: number
  class?: string
}

const props = withDefaults(defineProps<MathCurveProgressProps>(), {
  curve: 'spiral',
  size: 'md',
  showValue: false,
  strokeWidth: 4,
})

const sizeMap: Record<NonNullable<MathCurveProgressProps['size']>, number> = {
  sm: 48,
  md: 64,
  lg: 96,
}

const pixelSize = computed(() => sizeMap[props.size ?? 'md'])

const clampedValue = computed(() => Math.min(100, Math.max(0, props.value ?? 0)))

const trackPath = computed(() => buildPath(props.curve ?? 'spiral'))

const headPoint = computed(() => getPoint(props.curve ?? 'spiral', clampedValue.value / 100))

const headAngle = computed(() => getAngle(props.curve ?? 'spiral', clampedValue.value / 100))

const headTransform = computed(() => {
  const { x, y } = headPoint.value
  const angle = headAngle.value
  return `rotate(${angle} ${x} ${y})`
})

// Build the fill path: only draw up to value progress
const fillPath = computed(() => {
  const curve = props.curve ?? 'spiral'
  const progress = clampedValue.value / 100
  if (progress <= 0) return ''
  // Build a partial path by limiting segments proportionally
  const totalSegments = 200
  const segments = Math.max(1, Math.round(totalSegments * progress))
  let d = ''
  for (let i = 0; i <= segments; i++) {
    const p = (i / totalSegments) * progress
    const pt = getPoint(curve, p)
    if (i === 0) {
      d = `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`
    } else {
      d += ` L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`
    }
  }
  return d
})
</script>

<template>
  <div
    :class="props.class"
    :style="{ width: pixelSize + 'px', height: pixelSize + 'px', position: 'relative', display: 'inline-block' }"
    role="progressbar"
    :aria-valuenow="clampedValue"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <svg
      :width="pixelSize"
      :height="pixelSize"
      viewBox="0 0 100 100"
      style="overflow: visible; display: block"
    >
      <!-- Track (full curve, low opacity) -->
      <path
        :d="trackPath"
        :stroke="trackColor ?? 'currentColor'"
        :stroke-width="strokeWidth"
        stroke-opacity="0.2"
        stroke-linecap="square"
        stroke-linejoin="miter"
        fill="none"
      />
      <!-- Fill (partial curve up to value) -->
      <path
        :d="fillPath"
        :stroke="fillColor ?? 'currentColor'"
        :stroke-width="strokeWidth"
        stroke-linecap="square"
        stroke-linejoin="miter"
        fill="none"
        style="transition: d 300ms ease"
      />
      <!-- Head rect -->
      <rect
        :width="strokeWidth * 2"
        :height="strokeWidth * 2"
        :x="headPoint.x - strokeWidth"
        :y="headPoint.y - strokeWidth"
        :fill="fillColor ?? 'currentColor'"
        :transform="headTransform"
        :style="{ transition: 'transform 300ms ease' }"
      />
    </svg>
    <!-- Optional value label -->
    <div
      v-if="showValue"
      style="
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.75em;
        pointer-events: none;
      "
    >
      {{ Math.round(clampedValue) }}%
    </div>
  </div>
</template>
