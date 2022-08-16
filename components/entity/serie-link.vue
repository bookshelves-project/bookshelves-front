<script setup lang="ts">
defineProps<{
  serie?: BookSerie
  volume?: number
}>()
</script>

<template>
  <div v-if="serie && serie.meta" class="dark:text-white lg:mt-0">
    <app-link
      :to="{
        name: 'series-author-slug',
        params: {
          author: serie.meta.author,
          slug: serie.meta.slug,
        },
      }"
      class="internal-link"
    >
      {{ serie.title }}
    </app-link>
    (vol. {{ volume }})
  </div>
</template>
