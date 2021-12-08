<template>
  <div class="relative">
    <transition name="fade">
      <span
        v-if="loading"
        ref="Placeholder"
        :class="placeholder"
        class="absolute z-10 inset-0 transition-transform duration-100 block"
        :style="color ? `background-color: ${color}` : ''"
      ></span>
    </transition>
    <figure class="h-full">
      <img
        v-lazy-load
        :data-src="src"
        :alt="meta"
        :title="meta"
        :class="override"
        class="!m-0 !w-full h-full object-cover app-img"
        @load="load"
      />
      <figcaption v-if="$slots" class="dark:text-gray-50 mt-2 mx-2 mb-10">
        <slot />
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: null
  },
  legend: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'bg-gray-100 dark:bg-gray-800'
  },
  override: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  invisible: {
    type: Boolean,
    default: false
  }
})

const loading = ref(true)
const meta = ref('')

watch(() => props.src, (newVal) => {
  loading.value = true
})

const load = () => {
  loading.value = false
  meta.value = props.title
}
</script>
