<template>
  <div class="mx-auto">
    <main>
      <!-- Page header -->
      <book-header :book="book" />

      <div
        class="grid max-w-3xl grid-cols-1 gap-6 px-3 mx-auto mt-8 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2"
      >
        <div class="space-y-6 xl:col-start-1 xl:col-span-1">
          <!-- Description list-->
          <book-description :book="book" />

          <!-- Comments-->
          <book-comments :book="book" />
        </div>

        <transition name="fade">
          <book-serie
            v-if="serieLoaded && book.serie !== null"
            :serie="serie"
            :book="book"
          />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import BookComments from '~/components/blocks/books-slug/book-comments.vue'
import BookDescription from '~/components/blocks/books-slug/book-description.vue'
import bookHeader from '~/components/blocks/books-slug/book-header.vue'
import BookInformation from '~/components/blocks/books-slug/book-information.vue'
import BookSerie from '~/components/blocks/books-slug/book-serie.vue'

/* eslint-disable vue/no-unused-components */
export default {
  name: 'BooksSlug',
  components: {
    bookHeader,
    BookInformation,
    BookSerie,
    BookDescription,
    BookComments,
  },
  async asyncData({ app, query, params, error, $content, store }) {
    try {
      const [book] = await Promise.all([
        app.$axios.$get(`/api/books/${params.author}/${params.slug}`),
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
      serieLoaded: false,
    }
  },
  head() {
    let authors = ''
    this.book.authors.forEach((author, authorId) => {
      authors += `${author.name}`
      if (
        this.book.authors.length > 1 &&
        authorId !== this.book.authors.length - 1
      ) {
        authors += ' & '
      }
    })
    const title = `${this.book.title} by ${this.book.authors[0].name}`
    const description = this.book.summary
    const image = this.book.imageStandard
    const isbn = this.book.identifier.isbn13 || this.book.identifier.isbn
    const url = `${process.env.BASE_URL}/books/${this.book.slug}`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/jpg',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // og book
        {
          hid: 'book:isbn',
          property: 'book:isbn',
          content: isbn,
        },
        {
          hid: 'books:author',
          property: 'books:author',
          content: authors,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  async mounted() {
    await this.loadSerie()
  },
  methods: {
    async loadSerie() {
      if (this.book.serie !== null) {
        const serie = await this.$axios.$get(this.book.serie.show)
        this.serie = serie.data.books
        this.serieLoaded = true
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
