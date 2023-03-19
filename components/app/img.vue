<script setup lang="ts">
import lozad from 'lozad'

const props = defineProps<{
  color?: string
  src?: string
  title?: string
  alt?: string
}>()

const source = ref<string>()
const lazyMedia = ref<HTMLElement>()
const media = ref<HTMLImageElement>()
const display = ref(false)
const attrs = useAttrs()

const load = () => {
  source.value = props.src
  lozad(media.value, {
    load(el: HTMLImageElement) {
      el.src = el.dataset.src!
      el.onload = () => (display.value = true)
    },
  }).observe()
}

watch(
  () => props.src,
  () => {
    display.value = false
    load()
  },
)

onMounted(() => {
  load()
})
</script>

<template>
  <div ref="lazyMedia" class="lazy-media">
    <transition>
      <div
        v-if="!display"
        v-bind="attrs"
        class="placeholder bg-white dark:bg-gray-900"
        :style="color !== '#ffffff' ? `background-color: ${color};` : ''"
      />
    </transition>
    <img
      ref="media"
      v-bind="attrs"
      :data-src="source"
      :alt="display ? (alt ? alt : title) : ''"
      loading="lazy"
    >
  </div>
</template>

<style scoped>
.lazy-media {
  position: relative;
}
.placeholder {
  position: absolute;
  height: 100%;
  width: 100%;
}
img {
  height: 100%;
  width: 100%;
}
</style>
