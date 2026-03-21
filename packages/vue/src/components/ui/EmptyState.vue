<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const emptyStateVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted/30 border-3 border-dashed border-foreground p-8',
        card: 'bg-card border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] p-8',
      },
      size: {
        compact: 'gap-2 p-2',
        sm: 'gap-3 p-4',
        md: 'gap-4 p-6',
        lg: 'gap-6 p-8',
      },
      layout: {
        vertical: 'flex-col text-center',
        horizontal: 'flex-row text-left',
      },
      animation: {
        none: '',
        fadeIn: 'animate-[fadeIn_0.3s_ease-out]',
        bounce: 'animate-[bounceIn_0.5s_ease-out]',
        scale: 'animate-[scaleIn_0.3s_ease-out]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      layout: 'vertical',
      animation: 'none',
    },
  }
)

type EmptyStateVariants = VariantProps<typeof emptyStateVariants>

export interface EmptyStateProps {
  variant?: EmptyStateVariants['variant']
  size?: EmptyStateVariants['size']
  layout?: EmptyStateVariants['layout']
  animation?: EmptyStateVariants['animation']
  class?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  variant: 'default',
  size: 'md',
  layout: 'vertical',
  animation: 'none',
})
</script>

<template>
  <div :class="cn(emptyStateVariants({ variant, size, layout, animation }), props.class)">
    <slot />
  </div>
</template>
