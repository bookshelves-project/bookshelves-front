<script setup lang="ts">
defineProps<{
  book?: Book
}>()
</script>

<template>
  <div v-if="book && book.meta" class="dark:text-white">
    <app-link
      :to="{
        name: 'books-author-slug',
        params: {
          author: book.meta.author,
          slug: book.meta.slug,
        },
      }"
      class="link-macos"
    >
      {{ book.title }}
      <slot />
    </app-link>
  </div>
</template>
