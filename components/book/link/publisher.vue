<script setup lang="ts">
import type { Publisher } from '~/types'

defineProps<{
  publisher?: Publisher
}>()
</script>

<template>
  <div v-if="publisher" class="dark:text-white">
    <typed-link
      :to="{
        name: 'publishers-publisher_slug',
        params: { publisher_slug: publisher.meta.slug },
      }"
      class="internal-link"
    >
      {{ publisher.name }}
    </typed-link>
  </div>
</template>
