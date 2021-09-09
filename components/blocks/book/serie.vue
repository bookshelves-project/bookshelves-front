<template>
  <blocks-book-slider :books="books" :loaded="loaded">
    <template #title> {{ book.serie.title }}'s series </template>
    <template #subtitle>
      Current: vol. {{ book.volume }}, limited to 10 next volumes.
    </template>
    <template #link>
      <app-button
        :to="{
          name: 'series-author-slug',
          params: {
            author: book.serie.meta.author,
            slug: book.serie.meta.slug,
          },
        }"
        class="w-full"
        color="white"
      >
        View series page
      </app-button>
    </template>
  </blocks-book-slider>
</template>

<script>
export default {
  name: 'BookSerie',
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
