<template>
  <div
    class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
  >
    <book-card
      v-for="(book, bookId) in books"
      v-cloak
      :id="bookId"
      :key="bookId"
      :book="book"
    />
  </div>
</template>

<script>
import bookCard from './book-card.vue'
export default {
  name: 'BooksGrid',
  components: { bookCard },
  props: {
    books: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped></style>
