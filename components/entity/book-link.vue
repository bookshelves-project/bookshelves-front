<script setup lang="ts">
defineProps<{
  book?: Book
}>()
</script>

<template>
  <div v-if="book && book.meta" class="dark:text-white">
    <router-link
      :to="
        $localePath({
          name: 'books-author-slug',
          params: {
            author: book.meta.author,
            slug: book.meta.slug,
          },
        })
      "
      class="internal-link"
    >
      {{ book.title }}
    </router-link>
  </div>
</template>
