<script setup lang="ts">
defineProps<{
  book?: Book
}>()
</script>

<template>
  <div v-if="book && book.meta" class="dark:text-white">
    <nuxt-link
      :to="$localePath({
        name: 'books-author-slug',
        params: {
          author: book.meta.author,
          slug: book.meta.slug,
        },
      })"
      class="link-macos"
    >
      {{ book.title }}
      <slot />
    </nuxt-link>
  </div>
</template>
