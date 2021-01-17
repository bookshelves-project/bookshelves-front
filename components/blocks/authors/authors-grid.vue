<template>
  <div
    class="grid grid-cols-1 gap-4 2xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <author-card
      v-for="(author, authorId) in authors"
      :id="authorId"
      :key="authorId"
      :author="author"
    />
  </div>
</template>

<script>
import authorCard from './author-card.vue'

export default {
  name: 'AuthorsGrid',
  components: { authorCard },
  props: {
    authors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped></style>
