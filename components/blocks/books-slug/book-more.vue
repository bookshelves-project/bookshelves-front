<template>
  <div>
    <div v-for="bookValue in books" :key="bookValue.id">
      {{ bookValue.title }}
    </div>
  </div>
</template>

<script>
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
    }
  },
  mounted() {
    this.moreBooks()
  },
  methods: {
    async moreBooks() {
      console.log(this.book)
      const books = await this.$axios.$get(
        `/books/more/${this.book.author}/${this.book.slug}`
      )
      this.books = books.data
    },
  },
}
</script>
