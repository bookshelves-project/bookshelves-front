<script lang="ts" setup>
import type { SvgLibrary } from '@/.nuxt/types/svg-library'

const props = defineProps<{
  name?: SvgLibrary
}>()

// const path = `@/assets/icons/${props.name}.svg`
const path = `~/components/icons/${props.name}.vue`

const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(/* @vite-ignore */ path),
    loadingComponent: {
      template: '<span></span>',
    },
    errorComponent: {
      template: '<span>error</span>',
    },
    delay: 200,
    timeout: 3000,
    suspensible: true,
  }),
)
const attrs = useAttrs()
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <current-icon :class="attrs.class" />
      </template>
      <template #fallback>
        <div :class="attrs.class" />
      </template>
    </Suspense>
  </div>
</template>
