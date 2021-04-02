<template>
  <div class="mx-auto">
    <main>
      <book-header :book="book" />
      <div
        class="grid max-w-3xl grid-cols-1 gap-6 px-3 mx-auto mt-8 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2"
      >
        <div class="space-y-6 xl:col-start-1 xl:col-span-1">
          <book-description :book="book" />
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
import BookSerie from '~/components/blocks/books-slug/book-serie.vue'

export default {
  name: 'BooksSlug',
  components: {
    bookHeader,
    BookSerie,
    BookDescription,
    BookComments,
  },
  async asyncData({ app, query, params, error, $content, store }) {
    try {
      const [book] = await Promise.all([
        app.$axios.$get(`/books/${params.author}/${params.slug}`),
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
    const image = this.book.picture.openGraph
    const isbn = this.book.identifier.isbn13 || this.book.identifier.isbn
    const date = this.book.publishDate
    const tags = this.book.tags
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
          hid: 'book:author',
          property: 'books:author',
          content: authors,
        },
        {
          hid: 'book:release_date',
          property: 'books:release_date',
          content: date,
        },
        {
          hid: 'book:tag',
          property: 'books:tag',
          content: tags,
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
        try {
          const serie = await this.$axios.$get(this.book.serie.meta.show)
          this.serie = serie.data.books
          this.serieLoaded = true
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
}
</script>
