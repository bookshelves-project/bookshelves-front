<template>
  <div class="px-5 pt-10 pb-5 mx-auto bg-yellow-50">
    <div class="flex items-center justify-around mb-16">
      <h1 class="text-6xl font-semibold">Bookshelves</h1>
      <img src="/images/book-lover.svg" alt="book-lover" class="h-64" />
    </div>
    <div
      class="grid grid-cols-1 gap-4 2xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <book-card v-for="book in books" :key="book.id" :book="book"></book-card>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import bookCard from '~/components/blocks/book-card.vue'

export default {
  name: 'PageHome',
  components: { bookCard },
  async asyncData({ app, query, error, $content }) {
    try {
      const [books] = await Promise.all([
        app.$axios.$get(
          `books?${qs.stringify({
            limit: '10',
          })}`
        ),
      ])

      return {
        books: books.data,
      }
    } catch (error) {
      console.error(error)

      return {
        books: [],
      }
    }
  },
}
</script>
