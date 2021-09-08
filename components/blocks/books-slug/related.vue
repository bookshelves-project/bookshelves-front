<template>
  <blocks-books-slug-slider
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
      <app-button
        :to="{
          name: 'related-author-slug',
          params: {
            author: book.meta.author,
            slug: book.meta.slug,
          },
        }"
        class="w-full"
        color="white"
      >
        View all results
      </app-button>
    </template>
  </blocks-books-slug-slider>
</template>

<script>
import qs from 'qs'

export default {
  name: 'BookMore',
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
              limit: 10,
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
