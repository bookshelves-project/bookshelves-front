<template>
  <book-slider
    v-if="book.tags.length || book.genres.length"
    :book-data="book"
    :books="books"
    :loaded="loaded"
  >
    <template #title> Related books & series </template>
    <template #subtitle>
      Based on tags & genre, not in same series. Limited to 10 first
      results.</template
    >
    <template #link>
      <nuxt-link
        :to="{
          name: 'related-slug',
          params: {
            author: book.meta.author,
            slug: book.meta.slug,
          },
        }"
        class="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-100 bg-white border border-gray-300 rounded-md shadow-sm dark:border-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        View all results
      </nuxt-link>
    </template>
  </book-slider>
</template>

<script>
import qs from 'qs'
import BookSlider from './book-slider.vue'

export default {
  name: 'BookMore',
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
      if (this.book.tags.length || this.book.genres.length) {
        try {
          const books = await this.$axios.$get(
            `/books/related/${this.book.meta.author}/${
              this.book.meta.slug
            }?${qs.stringify({
              limit: true,
            })}`
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
