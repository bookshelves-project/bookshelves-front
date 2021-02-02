<template>
  <div class="max-w-3xl mx-auto xl:grid xl:grid-cols-3 xl:max-w-7xl">
    <main class="col-span-2 py-10 mx-auto sm:px-6">
      <book-header :book="book" />
      <div class="mt-10">
        <book-information :book="book">
          <template #serie>
            <book-serie v-if="serie.length > 0" :serie="serie" />
          </template>
          <template #isbn>
            <isbn-results :book-isbn="book.isbn" />
          </template>
        </book-information>
      </div>
    </main>
  </div>
</template>

<script>
import bookHeader from '~/components/blocks/books-slug/book-header.vue'
import BookInformation from '~/components/blocks/books-slug/book-information.vue'
import BookSerie from '~/components/blocks/books-slug/book-serie.vue'
import IsbnResults from '~/components/blocks/books-slug/isbn-results.vue'

export default {
  name: 'BooksSlug',
  components: {
    bookHeader,
    BookInformation,
    BookSerie,
    IsbnResults,
  },
  async asyncData({ app, query, params, error, $content, store }) {
    try {
      const [book] = await Promise.all([
        app.$axios.$get(`books/${params.author}/${params.slug}`),
      ])

      return {
        book: book.data,
      }
    } catch (error) {
      console.error(error)

      return {
        book: [],
      }
    }
  },
  data() {
    return {
      serie: [],
    }
  },
  async mounted() {
    await this.loadSerie()
  },
  methods: {
    async loadSerie() {
      if (this.book.serie) {
        const serie = await this.$axios.$get(this.book.serie.show)
        this.serie = serie.data.books
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
