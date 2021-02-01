<template>
  <div class="max-w-3xl mx-auto xl:grid xl:grid-cols-3 xl:max-w-7xl">
    <main class="col-span-2 py-10 mx-auto sm:px-6">
      <book-header :book="book" />
      <div class="mt-10">
        <book-information :book="book">
          <template #serie>
            <book-serie v-if="serie.length > 0" :serie="serie" />
          </template>
        </book-information>
      </div>
    </main>
    <aside class="col-span-1">
      <div class="fixed hidden ml-auto xl:block" style="width: inherit">
        <physical-book :cover="book.cover.original" />
        <div class="justify-center hidden pt-5 xl:flex">
          <a
            :href="book.epub.download"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="mx-1">Download</span>
            <span> ({{ book.epub.size }}) </span>
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import bookHeader from '~/components/blocks/books-slug/book-header.vue'
import BookInformation from '~/components/blocks/books-slug/book-information.vue'
import BookSerie from '~/components/blocks/books-slug/book-serie.vue'
import PhysicalBook from '~/components/blocks/physical-book.vue'
export default {
  name: 'BooksSlug',
  components: {
    bookHeader,
    BookInformation,
    PhysicalBook,
    BookSerie,
  },
  async asyncData({ app, query, params, error, $content, store }) {
    try {
      const [book] = await Promise.all([
        app.$axios.$get(`books/${params.author}/${params.slug}`),
      ])
      console.log(book)

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
        console.log(this.book.serie.show)
        const serie = await this.$axios.$get(this.book.serie.show)
        this.serie = serie.data.books
        console.log(this.serie)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
