<template>
  <main v-if="serie" class="main-content">
    <app-header
      :title="serie.title"
      :image="serie.cover ? serie.cover.thumbnail : null"
      :subtitle="`${serie.count} eBooks`"
      :authors="serie.authors"
      :cta="serie.link"
      :text="serie.description"
      :border="false"
      :entity="serie"
      favorite
    >
      <blocks-button-download
        :href="serie.download"
        :size="serie.size"
        :type="`ZIP`"
      >{{ serie.count }} eBooks</blocks-button-download>
      <template #content>
        <div v-if="serie.tags && serie.tags.length" class="lg:flex">
          <h2 class="mr-1">Tags:</h2>
          <ul>
            <li v-for="(tag, id) in serie.tags" :key="id" class="inline-block dark:text-gray-100">
              <span>{{ tag.name }}</span>
              <span
                v-if="serie.tags.length > 1 && id !== serie.tags.length - 1"
                class="mr-1 text-gray-900 dark:text-gray-100"
              >,</span>
            </li>
          </ul>
        </div>
      </template>
    </app-header>
    <div>
      <blocks-divider v-if="books">Books</blocks-divider>
      <div v-if="books" class="space-y-6 display-grid sm:space-y-0">
        <blocks-entity-card
          v-for="book in books"
          :key="book.id"
          :data="book"
          :cover="book.cover.thumbnail"
          :color="book.cover.color"
          :title="book.title"
          :route="{
            name: 'books-author-slug',
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
        >
          <template #title>{{ $overflow(book.title, 50) }}</template>
          <template #subtitle>
            <span v-for="(author, authorId) in book.authors" :key="authorId">
              {{ author.name }}
              <span
                v-if="
                  book.authors.length > 1 &&
                  authorId !== book.authors.length - 1
                "
              >,</span>
            </span>
          </template>
          <template #extra>Vol. {{ book.volume }}</template>
        </blocks-entity-card>
      </div>
      <div class="mt-6 mb-5">
        <pagination v-if="pages > 1" :link-gen="linkGen" :pages="pages" :current-page="currentPage"></pagination>
      </div>
    </div>
    <blocks-comments-template :entity="serie" />
  </main>
</template>

<script>
import { stringify } from 'qs'
import {
  getHostname,
  formatLanguage,
  formatAuthors
} from '~/plugins/utils/methods'

export default {
  name: 'SeriesAuthorSlug',
  components: { Pagination },
  async asyncData({ app, params, query }) {
    const page = query.page
    const [serie, books] = await Promise.all([
      app.$axios.$get(`/series/${params.author}/${params.slug}`),
      app.$axios.$get(
        `/series/books/${params.author}/${params.slug}?${stringify({
          page: page || 1,
          perPage: 32
        })}`
      )
    ])

    return {
      serie: serie.data,
      books: books.data,
      pages: books.meta.last_page,
      currentPage: books.meta.current_page,
      perPage: books.meta.per_page,
      total: books.meta.total
    }
  },
  data() {
    return {
      formatLanguage,
      formatAuthors,
      getHostname
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = `${this.serie.title} by ${this.authors}`
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          type: 'book',
          title,
          description: `Written by ${this.authors} with ${this.serie.count} books.`,
          url: this.$nuxt.$route.path,
          image: this.serie.cover.og
        })
      ]
    }
  },
  computed: {
    authors() {
      return formatAuthors(this.serie.authors)
    }
  },
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum }
      }
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home'
      },
      {
        url: `${this.$config.baseURL}/series`,
        text: 'Series'
      },
      {
        url: `${this.$config.baseURL}/series/${this.$route.params.author}/${this.$route.params.slug}`,
        text: this.serie.title
      }
    ]
    const authors = this.serie.authors.map((author, index) => ({
      '@type': 'Person',
      familyName: author.lastname,
      givenName: author.firstname,
      name: author.name,
      url: `${this.$config.baseURL}/authors/${author.meta.slug}`
    }))

    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text
      }
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
      mainEntity: {
        '@type': 'BookSeries',
        author: authors,
        bookFormat: 'http://schema.org/BookSeries',
        image: this.serie.cover.thumbnail,
        inLanguage: formatLanguage(this.serie.language).label,
        name: this.serie.title
      }
    }
  }
}
</script>
