<template>
  <main class="container min-h-screen max-w-7xl">
    <div class="pb-8">
      <div class="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">{{ book.title }}</h1>
        <div class="masonry-container">
          <book-header :book="book" class="masonry-block" />
          <book-main :book="book" class="masonry-block" />
          <book-comments
            v-if="$config.moduleSocial"
            :book="book"
            class="masonry-block"
          />
          <book-serie
            v-if="book.serie !== null"
            :book="book"
            class="masonry-block"
          />
          <book-related :book="book" class="masonry-block" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BookComments from '~/components/blocks/books-slug/book-comments.vue'
import bookHeader from '~/components/blocks/books-slug/book-header.vue'
import BookMain from '~/components/blocks/books-slug/book-main.vue'
import BookRelated from '~/components/blocks/books-slug/book-related.vue'
import BookSerie from '~/components/blocks/books-slug/book-serie.vue'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'
import { getLanguage, getAuthors } from '~/plugins/utils/methods'

export default {
  name: 'BooksSlug',
  components: { bookHeader, BookComments, BookMain, BookSerie, BookRelated },
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
      getAuthors,
    }
  },
  head() {
    const serie = this.book.serie
      ? ` · ${this.book.serie.title}, vol. ${this.book.volume} `
      : ''
    const title = `${this.book.title} ${serie}by ${this.authors}`
    const url = `${this.$config.baseURL}/${this.$nuxt.$route.path}`
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
          content: this.book.identifier
            ? this.book.identifier.isbn13 || this.book.identifier.isbn
            : null,
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
        url: `${this.$config.baseURL}/`,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/books`,
        text: 'Books',
      },
      {
        url: `${this.$config.baseURL}/books/${this.$route.params.author}/${this.$route.params.slug}`,
        text: this.book.title,
      },
    ]
    const authors = this.book.authors.map((author, index) => ({
      '@type': 'Person',
      familyName: author.lastname,
      givenName: author.firstname,
      name: author.name,
      url: `${this.$config.baseURL}/authors/${author.meta.slug}`,
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
        inLanguage: getLanguage(this.book.language),
        isbn: this.book.identifier
          ? this.book.identifier.isbn || this.book.identifier.isbn13
          : null,
        name: this.book.title,
        numberOfPages: this.book.pageCount,
        publisher: this.book.publisher ? this.book.publisher.name : '',
      },
    }
  },
  computed: {
    authors() {
      return getAuthors(this.book.authors)
    },
  },
}
</script>

<style lang="postcss" scoped>
.masonry-block {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 0.8rem;
  break-inside: avoid;
}

.masonry-container {
  column-count: 1;
  column-gap: 1rem;
}

@screen lg {
  .masonry-container {
    column-count: 2;
  }
}
</style>
