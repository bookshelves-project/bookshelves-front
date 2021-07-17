<template>
  <book-slider :book-data="book" :books="books" :loaded="loaded">
    <template #title> {{ book.serie.title }}'s series </template>
    <template #subtitle>
      Current: vol. {{ book.volume }}, limited to 10 next volumes.
    </template>
    <template #link>
      <nuxt-link
        :to="{
          name: 'series-slug',
          params: {
            author: book.meta.author,
            slug: book.serie.meta.slug,
          },
        }"
        class="
          flex
          items-center
          justify-center
          w-full
          px-4
          py-2
          text-sm
          font-semibold
          text-gray-700
          transition-colors
          duration-100
          bg-white
          border border-gray-300
          rounded-md
          shadow-sm
          dark:border-gray-600
          hover:bg-gray-200
          dark:bg-gray-800 dark:hover:bg-gray-700
        "
      >
        View series page
      </nuxt-link>
    </template>
  </book-slider>
</template>

<script>
import BookSlider from './book-slider.vue'

export default {
  name: 'BookSerie',
  components: {
    BookSlider,
  },
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      books: [],
      loaded: false,
    }
  },
  async mounted() {
    await this.loadSerie()
  },
  methods: {
    async loadSerie() {
      if (this.book.serie !== null) {
        try {
          const books = await this.$axios.$get(
            `/series/books/${this.book.volume}/${this.book.serie.meta.author}/${this.book.serie.meta.slug}`
          )
          this.books = books.data
          this.loaded = true
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
}
</script>
