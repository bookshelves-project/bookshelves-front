<script setup lang="ts">
defineProps<{
  serie?: BookSerie
  volume?: number
}>()
</script>

<template>
  <div v-if="serie && serie.meta" class="dark:text-white lg:mt-0">
    <typed-link
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
    </typed-link>
    (vol. {{ volume }})
  </div>
</template>
