<script lang="ts" setup>
interface MediaProps {
  src: string
  color?: string
  alt?: string
  placeholder?: string
  preflight?: boolean
  iframe?: boolean
  width?: number | string
  height?: number | string
  allow?: string
  options?: IntersectionObserverInit
}

const props = withDefaults(defineProps<MediaProps>(), {
  src: '/default.webp',
  color: '#ffffff',
  alt: '',
  placeholder: '/default.jpg',
  iframe: false,
  preflight: true,
  width: '100%',
  height: '460px',
  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  options: {
    // @ts-expect-error IntersectionObserverInit not compatible with IntersectionObserverInit
    threshold: 1.0,
    rootMargin: '0px 0px 100px 0px',
  },
})

const media = ref<HTMLElement>()
const currentPlaceholder = ref<HTMLElement>()
const currentMedia = ref<HTMLImageElement | HTMLIFrameElement>()

const allow = ref(props.allow ?? '')
const style = ''
const preflightClass = ref('object-cover h-full w-full')
if (props.iframe)
  preflightClass.value = `${preflightClass.value} rounded-md`

function setMedia() {
  const placeholder = media.value?.children[0] as HTMLElement
  const current = media.value?.children[1] as HTMLImageElement | HTMLIFrameElement

  currentPlaceholder.value = placeholder
  currentMedia.value = current

  current.setAttribute('src', props.src)

  current.classList.remove('hidden')
  if (props.iframe)
    current.setAttribute('allow', allow.value)

  current.onload = () => {
    placeholder?.classList.add('opacity-0')
    placeholder?.classList.remove('opacity-100')
  }
}

function setIntersectionObserver() {
  if (!window.IntersectionObserver)
    return

  const observer = new IntersectionObserver(([entry]) => {
    const target = entry.target
    if (entry.isIntersecting) {
      setMedia()

      observer.unobserve(target)
    }
  }, props.options)

  if (media.value)
    observer.observe(media.value)
}

function handleError() {
  currentMedia.value?.setAttribute('src', props.placeholder ?? '/default.jpg')
  currentPlaceholder.value?.classList.add('opacity-0')
  currentPlaceholder.value?.classList.remove('opacity-100')
}

onMounted(() => {
  window.addEventListener('DOMContentLoaded', () => {
    setIntersectionObserver()
  })
})
</script>

<template>
  <div ref="media" class="lazy-media relative my-2">
    <div
      :class="[
        { preflightClass: preflight },
      ]"
      class="lazy-media-transition bg-gray-50 dark:bg-gray-800 opacity-100 transition-opacity duration-200 absolute inset-0"
      :style="color !== '#ffffff' ? `background-color: ${color};` : ''"
    >
      <span
        v-if="iframe"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        Media is loading...
      </span>
    </div>
    <iframe
      v-if="iframe"
      class="lazy-media-iframe hidden" :class="[
        style,
        preflight ? preflightClass : '',
      ]"
      :width="width"
      :height="height"
      :data-src="src"
      :title="alt"
      frameborder="0"
      allow=""
      allowfullscreen
      loading="lazy"
      @error="handleError"
    />
    <img
      v-else
      class="lazy-media-media hidden" :class="[
        style,
        preflight ? preflightClass : '',
      ]"
      :data-src="src"
      :title="alt"
      loading="lazy"
      @error="handleError"
    >
  </div>
</template>
