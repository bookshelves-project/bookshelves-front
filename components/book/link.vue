<script setup lang="ts">
import type { Book } from '~/types'

defineProps<{
  book?: Book
}>()
</script>

<template>
  <div v-if="book && book.meta" class="dark:text-white mt-2">
    <typed-link
      :to="{
        name: 'books-author-slug',
        params: {
          author: book.meta.author,
          slug: book.meta.slug,
        },
      }"
      class="internal-link"
    >
      {{ book.title }}
      <slot />
    </typed-link>
  </div>
</template>
