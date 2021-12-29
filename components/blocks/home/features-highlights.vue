<template>
  <div class="relative pt-16 pb-16 overflow-hidden px-4">
    <blocks-home-feature-highlighted
      v-for="(highlight, id) in highlights"
      :key="id"
      :highlight="highlight"
      :right-position="id % 2 === 0"
    />
  </div>
</template>

<script setup lang="ts">
import { Highlight } from '~/types/cms/home-page'

const props = defineProps<{
  highlights: Highlight[]
}>()
</script>
