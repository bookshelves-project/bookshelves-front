<template>
  <div class="relative">
    <transition name="fade">
      <span
        v-if="loading"
        :class="placeholder"
        class="absolute z-10 inset-0 transition-transform duration-100 block"
        :style="color ? `background-color: ${color}` : ''"
      ></span>
    </transition>
    <img
      v-lazy-load
      :data-src="src"
      :alt="meta"
      :title="meta"
      :class="override"
      class="!m-0 !w-full h-full object-cover app-img"
      @load="load"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  legend: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'bg-gray-100 dark:bg-gray-800',
  },
  color: {
    type: String,
    default: null,
  },
  override: {
    type: String,
    default: null,
  },
  invisible: {
    type: Boolean,
    default: false,
  },
})

watch(
  () => props.src,
  (newVal) => {
    loading.value = true
  }
)

const loading = ref(true)
const meta = ref('')

const load = () => {
  loading.value = false
  meta.value = props.title
}
</script>
