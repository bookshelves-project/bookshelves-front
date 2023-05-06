<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
  color: '#000000',
  src: undefined,
  title: undefined,
  alt: undefined,
  placeholder: '/images/placeholder.webp',
  legend: undefined,
  origin: undefined,
})

const emit = defineEmits<{
  (e: 'loaded', loaded: boolean): void
}>()

interface Props {
  color?: string
  src?: string
  title?: string
  alt?: string
  placeholder?: string
  legend?: string
  origin?: string
}
const source = ref<string>()
const media = ref<HTMLImageElement>()
const defaultImage = ref<HTMLImageElement>()
const display = ref(false)
const attrs = useAttrs()

onMounted(() => {
  source.value = props.src

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const media = entry.target
            if (media instanceof HTMLImageElement) {
              media.src = source.value ?? props.placeholder ?? ''
              media.onload = () => {
                display.value = true
                emit('loaded', true)
              }
              media.onerror = () => {
                media.classList.add('hidden')
                defaultImage.value?.classList.remove('hidden')
                display.value = true
              }
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px 50px 0px' },
    )
    if (media.value)
      observer.observe(media.value)
  }
})
</script>

<template>
  <figure
    :class="{
      'pb-5': legend,
    }"
    class="lazy-media"
  >
    <transition>
      <div
        v-if="!display"
        v-bind="attrs"
        class="placeholder bg-gray-50 dark:bg-gray-800"
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
    <img
      ref="defaultImage"
      v-bind="attrs"
      :src="placeholder ? placeholder : '/default.webp'"
      :alt="display ? (alt ? alt : title) : ''"
      class="hidden object-cover"
      loading="lazy"
    >
    <figcaption v-if="legend" class="mt-3 flex text-sm text-gray-500 dark:text-gray-400">
      <svg
        class="h-5 w-5 flex-none text-gray-400 dark:text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
      <a :href="origin" target="_blank" rel="noopener noreferrer" class="ml-2 underline underline-offset-2">
        {{ legend }}
      </a>
    </figcaption>
  </figure>
</template>

<style lang="css" scoped>
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
