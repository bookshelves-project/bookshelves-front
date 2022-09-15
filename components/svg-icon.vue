<script setup lang="ts">
import type { SvgLibrary } from '@/.nuxt/types/svg-library'

const props = defineProps<{
  name?: SvgLibrary
}>()

const path = `/assets/svg/${props.name}.svg`

const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(/* @vite-ignore */path),
    loadingComponent: {
      template: '<span></span>'
    },
    errorComponent: {
      template: '<span>error</span>'
    },
    delay: 200,
    timeout: 3000,
    suspensible: true
  })
)
const attrs = useAttrs()
const classes = attrs.class ?? 'w-6 h-6'
</script>

<template>
  <span>
    <Suspense>
      <template #default>
        <current-icon :class="classes" />
      </template>
      <template #fallback>
        <div :class="classes" />
      </template>
    </Suspense>
  </span>
</template>
