<script setup lang="ts">
import type { SvgLibrary } from '@/.nuxt/types/svg-library'

const props = defineProps<{
  name?: SvgLibrary
}>()

const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(`@/assets/svg/${props.name}.svg`),
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
</script>

<template>
  <span>
    <Suspense>
      <template #default>
        <current-icon :class="attrs.class" />
      </template>
      <template #fallback>
        <div :class="attrs.class" />
      </template>
    </Suspense>
  </span>
</template>
