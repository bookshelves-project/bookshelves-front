<template>
  <main class="main-content">
    <app-header
      :title="book.title"
      :image="book.cover ? book.cover.thumbnail : null"
      :image-original="book.cover ? book.cover.original : null"
      :subtitle="subtitle"
      :authors="book.authors"
      :text="book.description"
      favorite
    ></app-header>
    <blocks-book-main :book="book" class="mb-6" />
    <div class="lg:grid lg:grid-cols-2 divide-x">
      <blocks-book-serie
        v-if="book.serie !== null"
        :book="book"
        class="lg:pr-10"
      />
      <blocks-book-related :book="book" :class="book.serie ? 'lg:pl-10' : ''" />
    </div>
    <blocks-comments :entity="book" class="mt-6" />
  </main>
</template>

<script>
import {
  formatLanguage,
  formatAuthors,
  formatTags,
} from '~/plugins/utils/methods'

export default {
  name: 'BooksAuthorSlug',
  async asyncData({ app, params }) {
    const [book] = await Promise.all([
      app.$axios.$get(`/books/${params.author}/${params.slug}`),
    ])

    return {
      book: book.data,
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const serie = this.book.serie
      ? ` · ${this.book.serie.title}, vol. ${this.book.volume} `
      : ''
    const authors = this.formatAuthors(this.book.authors)
    const title = `${this.book.title} ${serie}by ${authors}`
    return {
      title,
      description: this.book.summary,
      image: this.book.cover.og,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
          bookISBN: this.book.identifier
            ? this.book.identifier.isbn13 || this.book.identifier.isbn
            : null,
          bookAuthor: authors,
          bookReleaseDate: this.book.publishDate,
          bookTag: this.formatTags(this.book.tags),
        }),
      ],
    }
  },
  computed: {
    subtitle() {
      const lang = formatLanguage(this.book.language)
      const serie = this.book.serie
        ? `${this.book.serie.title}, vol. ${this.book.volume}, `
        : ''
      return `${serie}into ${lang}`
    },
  },
  methods: {
    formatLanguage,
    formatAuthors,
    formatTags,
  },
}
</script>
