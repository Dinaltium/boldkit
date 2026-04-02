import { MathCurveLoader } from '@/components/ui/math-curve-loader'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const mathCurveLoaderVariants = cva('', {
  variants: {
    size: {
      xs: 'h-8 w-8',
      sm: 'h-12 w-12',
      md: 'h-16 w-16',
      lg: 'h-24 w-24',
      xl: 'h-32 w-32',
    },
    speed: {
      slow: '[--duration:4s]',
      normal: '[--duration:2s]',
      fast: '[--duration:1s]',
    },
  },
  defaultVariants: {
    size: 'md',
    speed: 'normal',
  },
})

export type CurveType =
  | 'rose'
  | 'lissajous'
  | 'butterfly'
  | 'hypotrochoid'
  | 'cardioid'
  | 'lemniscate'
  | 'fourier'
  | 'rose3'

export interface MathCurveLoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveLoaderVariants> {
  curve?: CurveType
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
}

// Each curve generates parametric (x, y) points from t ∈ [0, 2π]
function getCurvePoints(curve: CurveType, steps = 300): [number, number][] {
  const points: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI
    let x = 0, y = 0
    switch (curve) {
      case 'rose':      { const r = Math.cos(2 * t); x = r * Math.cos(t); y = r * Math.sin(t); break }
      case 'lissajous': { x = Math.sin(3 * t + Math.PI / 4); y = Math.sin(2 * t); break }
      case 'butterfly': { const e = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5); x = Math.sin(t) * e; y = -Math.cos(t) * e; break }
      case 'hypotrochoid': { x = 3 * Math.cos(t) + Math.cos(3 * t); y = 3 * Math.sin(t) - Math.sin(3 * t); break }
      case 'cardioid':  { const rc = 1 - Math.cos(t); x = rc * Math.cos(t); y = rc * Math.sin(t); break }
      case 'lemniscate': { const d = 1 + Math.sin(t) ** 2; x = Math.cos(t) / d; y = Math.sin(t) * Math.cos(t) / d; break }
      case 'fourier':   { x = Math.cos(t) + 0.5 * Math.cos(3 * t) + 0.25 * Math.cos(5 * t); y = Math.sin(t) + 0.5 * Math.sin(3 * t) + 0.25 * Math.sin(5 * t); break }
      case 'rose3':     { const r3 = Math.cos(3 * t); x = r3 * Math.cos(t); y = r3 * Math.sin(t); break }
    }
    points.push([x, y])
  }
  return points
}

// Normalise points into SVG viewport, returning an SVG path string
function pointsToPath(points: [number, number][]): string {
  const xs = points.map(p => p[0])
  const ys = points.map(p => p[1])
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const pad = 10
  const w = 100 - pad * 2, h = 100 - pad * 2
  const toSVG = ([x, y]: [number, number]) => {
    const sx = pad + ((x - minX) / (maxX - minX || 1)) * w
    const sy = pad + ((y - minY) / (maxY - minY || 1)) * h
    return \`\${sx.toFixed(2)},\${sy.toFixed(2)}\`
  }
  return 'M ' + points.map(toSVG).join(' L ')
}

// Animated dot travels along the path using CSS offset-path + offset-distance
const MathCurveLoader = React.forwardRef<SVGSVGElement, MathCurveLoaderProps>(
  (
    {
      className,
      curve = 'rose',
      size,
      speed,
      trackColor,
      headColor,
      strokeWidth = 4,
      headSize = 8,
      ...props
    },
    ref
  ) => {
    const points = React.useMemo(() => getCurvePoints(curve), [curve])
    const pathD = React.useMemo(() => pointsToPath(points), [points])
    const pathId = React.useId()

    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(mathCurveLoaderVariants({ size, speed }), className)}
        {...props}
      >
        {/* Track */}
        <path
          d={pathD}
          fill="none"
          stroke={trackColor ?? 'currentColor'}
          strokeWidth={strokeWidth * 0.5}
          opacity={0.2}
        />
        {/* Animated head */}
        <circle r={headSize / 2} fill={headColor ?? 'currentColor'}>
          <animateMotion dur="var(--duration, 2s)" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref={\`#\${pathId}\`} />
          </animateMotion>
        </circle>
        {/* Hidden path for animateMotion reference */}
        <path id={pathId} d={pathD} fill="none" stroke="none" />
      </svg>
    )
  }
)
MathCurveLoader.displayName = 'MathCurveLoader'

export { MathCurveLoader, mathCurveLoaderVariants }`

const vueSourceCode = `<script setup lang="ts">
import { computed, useId } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const mathCurveLoaderVariants = cva('', {
  variants: {
    size: {
      xs: 'h-8 w-8',
      sm: 'h-12 w-12',
      md: 'h-16 w-16',
      lg: 'h-24 w-24',
      xl: 'h-32 w-32',
    },
    speed: {
      slow: '[--duration:4s]',
      normal: '[--duration:2s]',
      fast: '[--duration:1s]',
    },
  },
  defaultVariants: {
    size: 'md',
    speed: 'normal',
  },
})

type CurveType =
  | 'rose' | 'lissajous' | 'butterfly' | 'hypotrochoid'
  | 'cardioid' | 'lemniscate' | 'fourier' | 'rose3'

type MathCurveLoaderVariants = VariantProps<typeof mathCurveLoaderVariants>

interface MathCurveLoaderProps {
  curve?: CurveType
  size?: MathCurveLoaderVariants['size']
  speed?: MathCurveLoaderVariants['speed']
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
  class?: string
}

const props = withDefaults(defineProps<MathCurveLoaderProps>(), {
  curve: 'rose',
  size: 'md',
  speed: 'normal',
  strokeWidth: 4,
  headSize: 8,
})

const pathId = useId()

// getCurvePoints + pointsToPath logic mirrors the React implementation
const pathD = computed(() => {
  const points = getCurvePoints(props.curve)
  return pointsToPath(points)
})
</script>

<template>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn(mathCurveLoaderVariants({ size, speed }), props.class)"
  >
    <path
      :d="pathD"
      fill="none"
      :stroke="trackColor ?? 'currentColor'"
      :stroke-width="strokeWidth * 0.5"
      :opacity="0.2"
    />
    <circle :r="headSize / 2" :fill="headColor ?? 'currentColor'">
      <animateMotion dur="var(--duration, 2s)" repeatCount="indefinite" rotate="auto">
        <mpath :href="\`#\${pathId}\`" />
      </animateMotion>
    </circle>
    <path :id="pathId" :d="pathD" fill="none" stroke="none" />
  </svg>
</template>`

const usageCode = `import { MathCurveLoader } from '@/components/ui/math-curve-loader'

export default function Example() {
  return <MathCurveLoader curve="rose" />
}`

const vueUsageCode = `<script setup lang="ts">
import { MathCurveLoader } from '@/components/ui'
</script>

<template>
  <MathCurveLoader curve="rose" />
</template>`

export function MathCurveLoaderDoc() {
  return (
    <>
      <ComponentDoc
        name="MathCurveLoader"
        description="Mathematical parametric curve loaders with neubrutalism aesthetics. 8 curve variants including rose, lissajous, butterfly, and more."
        dependencies={['class-variance-authority']}
        vueDependencies={['reka-ui', 'class-variance-authority']}
        registryName="math-curve-loader"
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex flex-wrap items-center gap-6">
          <MathCurveLoader curve="rose" size="xl" />
          <MathCurveLoader curve="lissajous" size="xl" />
          <MathCurveLoader curve="butterfly" size="xl" />
          <MathCurveLoader curve="hypotrochoid" size="xl" />
          <MathCurveLoader curve="cardioid" size="xl" />
          <MathCurveLoader curve="lemniscate" size="xl" />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Curve Variants"
        description="8 parametric curves — each tracing a unique mathematical path."
        code={`<MathCurveLoader curve="rose" />
<MathCurveLoader curve="lissajous" />
<MathCurveLoader curve="butterfly" />
<MathCurveLoader curve="hypotrochoid" />
<MathCurveLoader curve="cardioid" />
<MathCurveLoader curve="lemniscate" />
<MathCurveLoader curve="fourier" />
<MathCurveLoader curve="rose3" />`}
        vueCode={`<template>
  <MathCurveLoader curve="rose" />
  <MathCurveLoader curve="lissajous" />
  <MathCurveLoader curve="butterfly" />
  <MathCurveLoader curve="hypotrochoid" />
  <MathCurveLoader curve="cardioid" />
  <MathCurveLoader curve="lemniscate" />
  <MathCurveLoader curve="fourier" />
  <MathCurveLoader curve="rose3" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          {(
            [
              'rose',
              'lissajous',
              'butterfly',
              'hypotrochoid',
              'cardioid',
              'lemniscate',
              'fourier',
              'rose3',
            ] as const
          ).map((curve) => (
            <div key={curve} className="flex flex-col items-center gap-2">
              <MathCurveLoader curve={curve} size="md" />
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {curve}
              </span>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Available sizes from extra small to extra large."
        code={`<MathCurveLoader curve="rose" size="xs" />
<MathCurveLoader curve="rose" size="sm" />
<MathCurveLoader curve="rose" size="md" />
<MathCurveLoader curve="rose" size="lg" />
<MathCurveLoader curve="rose" size="xl" />`}
        vueCode={`<template>
  <MathCurveLoader curve="rose" size="xs" />
  <MathCurveLoader curve="rose" size="sm" />
  <MathCurveLoader curve="rose" size="md" />
  <MathCurveLoader curve="rose" size="lg" />
  <MathCurveLoader curve="rose" size="xl" />
</template>`}
      >
        <div className="flex flex-wrap items-end gap-8">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <MathCurveLoader curve="rose" size={size} />
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {size}
              </span>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Speed"
        description="Control animation speed from slow and meditative to fast and urgent."
        code={`<MathCurveLoader curve="rose" speed="slow" />
<MathCurveLoader curve="rose" speed="normal" />
<MathCurveLoader curve="rose" speed="fast" />`}
        vueCode={`<template>
  <MathCurveLoader curve="rose" speed="slow" />
  <MathCurveLoader curve="rose" speed="normal" />
  <MathCurveLoader curve="rose" speed="fast" />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <div key={speed} className="flex flex-col items-center gap-2">
              <MathCurveLoader curve="rose" size="md" speed={speed} />
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {speed}
              </span>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Custom Colors"
        description="Override track and head colors with any CSS color value."
        code={`<MathCurveLoader
  curve="lissajous"
  trackColor="#f97316"
  headColor="#ea580c"
/>
<MathCurveLoader
  curve="butterfly"
  trackColor="#8b5cf6"
  headColor="#6d28d9"
/>
<MathCurveLoader
  curve="hypotrochoid"
  trackColor="#10b981"
  headColor="#065f46"
/>`}
        vueCode={`<template>
  <MathCurveLoader
    curve="lissajous"
    track-color="#f97316"
    head-color="#ea580c"
  />
  <MathCurveLoader
    curve="butterfly"
    track-color="#8b5cf6"
    head-color="#6d28d9"
  />
  <MathCurveLoader
    curve="hypotrochoid"
    track-color="#10b981"
    head-color="#065f46"
  />
</template>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <MathCurveLoader
              curve="lissajous"
              size="md"
              trackColor="#f97316"
              headColor="#ea580c"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wide">
              Orange
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveLoader
              curve="butterfly"
              size="md"
              trackColor="#8b5cf6"
              headColor="#6d28d9"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wide">
              Violet
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MathCurveLoader
              curve="hypotrochoid"
              size="md"
              trackColor="#10b981"
              headColor="#065f46"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wide">
              Emerald
            </span>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
