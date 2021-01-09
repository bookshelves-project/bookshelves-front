<template>
  <div
    class="grid grid-cols-1 gap-4 2xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <book-card
      v-for="(book, bookId) in $store.state.books"
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
}
</script>

<style lang="postcss" scoped></style>
