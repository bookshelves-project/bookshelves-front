<script setup lang="ts">
import type { Serie } from '~/types'

defineProps<{
  serie?: Serie
  volume?: number
}>()
</script>

<template>
  <div v-if="serie && serie.meta" class="dark:text-white lg:mt-0">
    <typed-link
      :to="{
        name: 'series-author_slug-serie_slug',
        params: {
          author_slug: serie.meta.author,
          serie_slug: serie.meta.slug,
        },
      }"
      class="internal-link"
    >
      {{ serie.title }}
    </typed-link>
    (vol. {{ volume }})
  </div>
</template>
