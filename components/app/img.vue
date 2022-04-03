<script setup lang="ts">
interface Attribute {
  alt?: string
  class?: string
  color?: string
  src?: string
}
const attrs: Attribute = useAttrs()

const props = defineProps<{
  override?: string
}>()

const loaded = ref(false)
const placeholder = 'bg-gray-100 dark:bg-gray-800'
const meta = ref('')

const load = () => {
  loaded.value = true
  meta.value = attrs.alt ?? ''
}
</script>

<template>
  <div class="relative">
    <!-- <transition name="fade">
      <span
        v-if="!loaded"
        :class="placeholder"
        class="absolute inset-0 z-10 block transition-transform duration-100"
        :style="attrs.color ? `background-color: ${attrs.color}` : ''"
      ></span>
    </transition> -->
    <img
      :src="attrs.src"
      :alt="meta"
      :title="meta"
      :class="override"
      class="app-img !m-0 h-full !w-full object-cover"
      @load="load"
      loading="lazy"
    />
  </div>
</template>
