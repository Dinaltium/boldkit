import { MathCurveBackground } from '@/components/ui/math-curve-background'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface MathCurveBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  curve?: 'rose' | 'lissajous' | 'fourier' | 'spiral'
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  asChild?: boolean
}

const MathCurveBackground = React.forwardRef<HTMLDivElement, MathCurveBackgroundProps>(
  ({ className, curve = 'rose', speed = 'slow', opacity = 0.15, trackColor, headColor, strokeWidth = 2, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    // Renders children with an animated SVG curve overlaid as a background layer
    // The curve animates continuously at the given speed
  }
)
MathCurveBackground.displayName = 'MathCurveBackground'

export { MathCurveBackground }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface MathCurveBackgroundProps extends PrimitiveProps {
  curve?: 'rose' | 'lissajous' | 'fourier' | 'spiral'
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  class?: string
}

const props = withDefaults(defineProps<MathCurveBackgroundProps>(), {
  as: 'div',
  curve: 'rose',
  speed: 'slow',
  opacity: 0.15,
  strokeWidth: 2,
})
</script>

<template>
  <Primitive v-bind="props" :class="cn('relative overflow-hidden', props.class)">
    <!-- Animated SVG curve rendered as absolute background layer -->
    <slot />
  </Primitive>
</template>`

const usageCode = `import { MathCurveBackground } from '@/components/ui/math-curve-background'

export default function Example() {
  return (
    <MathCurveBackground curve="rose" opacity={0.2} className="p-8">
      <p>Your content here</p>
    </MathCurveBackground>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { MathCurveBackground } from '@/components/ui'
</script>

<template>
  <MathCurveBackground curve="rose" :opacity="0.2" class="p-8">
    <p>Your content here</p>
  </MathCurveBackground>
</template>`

export function MathCurveBackgroundDoc() {
  return (
    <>
      <ComponentDoc
        name="Math Curve Background"
        description="An ambient animated mathematical curve background layer. Wraps content with a slow-moving curve animation that adds depth and visual interest."
        dependencies={['@radix-ui/react-slot']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        registryName="math-curve-background"
      >
        <MathCurveBackground curve="rose" opacity={0.2} className="border-3 border-foreground p-8 min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-black uppercase mb-2">Hello World</div>
            <div className="text-sm text-muted-foreground">Ambient curve background</div>
          </div>
        </MathCurveBackground>
      </ComponentDoc>

      <ExampleSection
        title="Curve Variants"
        description="Four mathematical curves, each with a distinct visual character for different aesthetic contexts."
        code={`<MathCurveBackground curve="rose" opacity={0.2}>Rose</MathCurveBackground>
<MathCurveBackground curve="lissajous" opacity={0.2}>Lissajous</MathCurveBackground>
<MathCurveBackground curve="fourier" opacity={0.2}>Fourier</MathCurveBackground>
<MathCurveBackground curve="spiral" opacity={0.2}>Spiral</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="rose" :opacity="0.2">Rose</MathCurveBackground>
  <MathCurveBackground curve="lissajous" :opacity="0.2">Lissajous</MathCurveBackground>
  <MathCurveBackground curve="fourier" :opacity="0.2">Fourier</MathCurveBackground>
  <MathCurveBackground curve="spiral" :opacity="0.2">Spiral</MathCurveBackground>
</template>`}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(['rose', 'lissajous', 'fourier', 'spiral'] as const).map((curve) => (
            <MathCurveBackground
              key={curve}
              curve={curve}
              opacity={0.2}
              className="border-3 border-foreground min-h-[120px] flex items-center justify-center"
            >
              <span className="text-xs font-black uppercase">{curve}</span>
            </MathCurveBackground>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Wrapping Cards"
        description="Use MathCurveBackground to add ambient motion to card components without affecting their content layout."
        code={`<MathCurveBackground curve="lissajous" opacity={0.15} className="border-3 border-foreground p-6">
  <h3 className="text-lg font-black uppercase mb-1">Component Title</h3>
  <p className="text-sm text-muted-foreground mb-4">
    A card with an animated curve background that adds depth and motion.
  </p>
  <button className="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
    Get Started
  </button>
</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="lissajous" :opacity="0.15" class="border-3 border-foreground p-6">
    <h3 class="text-lg font-black uppercase mb-1">Component Title</h3>
    <p class="text-sm text-muted-foreground mb-4">
      A card with an animated curve background that adds depth and motion.
    </p>
    <button class="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
      Get Started
    </button>
  </MathCurveBackground>
</template>`}
      >
        <div className="max-w-sm">
          <MathCurveBackground curve="lissajous" opacity={0.15} className="border-3 border-foreground p-6">
            <h3 className="text-lg font-black uppercase mb-1">Component Title</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A card with an animated curve background that adds depth and motion.
            </p>
            <button className="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              Get Started
            </button>
          </MathCurveBackground>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Opacity Control"
        description="Adjust opacity to balance between a subtle ambient effect and a prominent decorative element."
        code={`<MathCurveBackground curve="rose" opacity={0.05}>0.05</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.1}>0.1</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.2}>0.2</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.4}>0.4</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="rose" :opacity="0.05">0.05</MathCurveBackground>
  <MathCurveBackground curve="rose" :opacity="0.1">0.1</MathCurveBackground>
  <MathCurveBackground curve="rose" :opacity="0.2">0.2</MathCurveBackground>
  <MathCurveBackground curve="rose" :opacity="0.4">0.4</MathCurveBackground>
</template>`}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {([0.05, 0.1, 0.2, 0.4] as const).map((opacity) => (
            <MathCurveBackground
              key={opacity}
              curve="rose"
              opacity={opacity}
              className="border-3 border-foreground min-h-[120px] flex items-center justify-center"
            >
              <span className="text-xs font-black uppercase">{opacity}</span>
            </MathCurveBackground>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Speed Variants"
        description="Control animation speed from a barely-perceptible ambient drift to an energetic fast-moving trace."
        code={`<MathCurveBackground curve="rose" speed="slow" opacity={0.2}>Slow</MathCurveBackground>
<MathCurveBackground curve="rose" speed="normal" opacity={0.2}>Normal</MathCurveBackground>
<MathCurveBackground curve="rose" speed="fast" opacity={0.2}>Fast</MathCurveBackground>`}
        vueCode={`<template>
  <MathCurveBackground curve="rose" speed="slow" :opacity="0.2">Slow</MathCurveBackground>
  <MathCurveBackground curve="rose" speed="normal" :opacity="0.2">Normal</MathCurveBackground>
  <MathCurveBackground curve="rose" speed="fast" :opacity="0.2">Fast</MathCurveBackground>
</template>`}
      >
        <div className="flex flex-wrap gap-4">
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <MathCurveBackground
              key={speed}
              curve="rose"
              speed={speed}
              opacity={0.2}
              className="border-3 border-foreground min-h-[120px] w-40 flex items-center justify-center"
            >
              <span className="text-xs font-black uppercase">{speed}</span>
            </MathCurveBackground>
          ))}
        </div>
      </ExampleSection>
    </>
  )
}
