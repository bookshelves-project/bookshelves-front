<template>
  <main class="main-content relative">
    <app-header :title="title" :subtitle="description">
      <blocks-entities-filter has-serie language @filter="filter" />
    </app-header>
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <blocks-entity-card
            v-for="book in books.data"
            :key="book.id"
            :cover="book.cover.thumbnail"
            :color="book.cover.color"
            :title="book.title"
            :route="{
              name: 'books-author-slug',
              params: { author: book.meta.author, slug: book.meta.slug },
            }"
          >
            <template #primary>
              {{ $overflow(book.title, 50) }}
            </template>
            <template #secondary>
              <span v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  &
                </span>
              </span>
            </template>
            <template #tertiary>
              <span v-if="book.serie" class="italic">
                {{ book.serie.title }},<br />
                vol. {{ book.volume }}
              </span>
              <span class="mt-1 block">
                {{ formatLanguage(book.language) }}
              </span>
            </template>
          </blocks-entity-card>
        </div>
      </div>
      <div class="mt-14 mb-5">
        <special-pagination
          v-if="pages > 1"
          :link-gen="linkGen"
          :pages="pages"
          :current-page="currentPage"
        >
        </special-pagination>
      </div>
    </section>
    <special-api-error-message v-else />
  </main>
</template>

<script>
import qs from 'qs'

import { formatLanguage, objectIsEmpty } from '~/plugins/utils/methods'

export default {
  name: 'Books',
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query }) {
    try {
      const page = query.page
      const language = query.language
      const hasSerie = query.has_serie
      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            page: page || 1,
            'per-page': 32,
            'filter[languages]': language,
            'filter[has_serie]': hasSerie,
          })}`
        ),
      ])

      return {
        books,
        pages: books.meta.last_page,
        currentPage: books.meta.current_page,
        perPage: books.meta.per_page,
        total: books.meta.total,
        apiError: false,
      }
    } catch (error) {
      return {
        apiError: true,
      }
    }
  },
  data() {
    return {
      formatLanguage,
      objectIsEmpty,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: `Books`,
      description: `Discover all available books sorted by title and serie's title`,
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = this.title
    return {
      title,
      description: this.description,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
  watchQuery: ['page', 'language', 'has_serie'],
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/books`,
        text: 'Books',
      },
    ]
    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
    }
  },
  methods: {
    linkGen(pageNum) {
      const language = this.$route.query.language
      const serie = this.$route.query.serie
      return {
        name: this.$route.name,
        query:
          pageNum === 1
            ? { language, serie }
            : { page: pageNum, language, has_serie: serie },
      }
    },
    filter(param) {
      if (param !== null) {
        const query = {}

        const currentQuery = this.$route.query
        const queryIsEmpty = objectIsEmpty(currentQuery)
        if (!queryIsEmpty) {
          Object.assign(query, currentQuery)
        }

        const key = param.type
        const newQuery = {}
        newQuery[key] = param.data
        query[param.type] = param.data

        this.$router.push(this.localePath({ name: 'books', query }))
      } else {
        this.$router.push(this.localePath({ name: 'books' }))
      }
    },
  },
}
</script>
