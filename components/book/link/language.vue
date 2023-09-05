<script setup lang="ts">
import type { Language } from '~/types'

defineProps<{
  language?: Language
}>()
</script>

<template>
  <div v-if="language" class="mt-2 dark:text-white lg:mt-0">
    <typed-link
      :to="{
        name: 'books',
        query: { lang: language.meta.slug },
      }"
      class="internal-link"
    >
      {{ language.name }}
    </typed-link>
  </div>
</template>
