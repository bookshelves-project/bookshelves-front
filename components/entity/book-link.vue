<script setup lang="ts">
defineProps<{
  book?: Book
}>()
</script>

<template>
  <div v-if="book && book.meta" class="dark:text-white">
    <app-button
      size="sm"
      color="white"
      :to="{
        name: 'books-author-slug',
        params: {
          author: book.meta.author,
          slug: book.meta.slug,
        },
      }"
    >
      {{ book.title }}
      <slot />
    </app-button>
  </div>
</template>
