<template>
  <main class="container max-w-7xl">
    <div class="px-3">
      <!-- <breadcrumb
        class="px-3 mb-8 lg:px-3"
        :title="`${book.title} by ${authors}`"
      /> -->
      <book-header :book="book" />
    </div>
    <div
      class="grid grid-cols-1 gap-6 mt-8 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2"
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
</template>

<script>
import BookComments from '~/components/blocks/books-slug/book-comments.vue'
import BookDescription from '~/components/blocks/books-slug/book-description.vue'
import bookHeader from '~/components/blocks/books-slug/book-header.vue'
import BookSerie from '~/components/blocks/books-slug/book-serie.vue'
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'BooksSlug',
  components: {
    bookHeader,
    BookSerie,
    BookDescription,
    BookComments,
  },
  async asyncData({ app, params }) {
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
    const title = `${this.book.title} by ${this.authors}`
    const url = `${process.env.BASE_URL}/books/${this.book.author}/${this.book.slug}`
    const dynamicMeta = dynamicMetadata({
      type: 'book',
      title,
      description: this.book.summary,
      url,
      image: this.book.picture.openGraph,
    })
    return {
      title,
      meta: [
        ...dynamicMeta,
        {
          hid: 'book:isbn',
          property: 'book:isbn',
          content: this.book.identifier.isbn13 || this.book.identifier.isbn,
        },
        {
          hid: 'book:author',
          property: 'books:author',
          content: this.authors,
        },
        {
          hid: 'book:release_date',
          property: 'books:release_date',
          content: this.book.publishDate,
        },
        {
          hid: 'book:tag',
          property: 'books:tag',
          content: this.book.tags,
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
  jsonld() {
    const breadcrumbs = [
      {
        url: `${process.env.BASE_URL}/`,
        text: 'Home',
      },
      {
        url: `${process.env.BASE_URL}/books`,
        text: 'Books',
      },
      {
        url: `${process.env.BASE_URL}/books/${this.$route.params.author}/${this.$route.params.slug}`,
        text: this.book.title,
      },
    ]
    const authors = this.book.authors.map((author, index) => ({
      '@type': 'Person',
      familyName: author.lastname,
      givenName: author.firstname,
      name: author.name,
      url: `${process.env.BASE_URL}/authors/${author.slug}`,
    }))

    const items = breadcrumbs.map((item, index) => ({
      '@type': 'BreadcrumbList',
      item: {
        '@type': 'ListItem',
        position: index + 1,
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
      mainEntity: {
        '@type': 'Book',
        author: authors,
        bookFormat: 'http://schema.org/Book',
        datePublished: this.book.publishDate,
        image: this.book.picture.base,
        inLanguage: this.$getLanguage(this.book.language),
        isbn: this.book.identifier.isbn || this.book.identifier.isbn13,
        name: this.book.title,
        numberOfPages: this.book.pageCount,
        publisher: this.book.publisher.name,
      },
    }
  },
  computed: {
    authors() {
      return this.$getAuthors(this.book.authors)
    },
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
