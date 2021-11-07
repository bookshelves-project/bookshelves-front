<template>
  <main class="main-content relative">
    <app-header title="Book" :subtitle="description" :border="false">
      <template #filters>
        <blocks-filters has-serie languages :sort="sortOptions" />
      </template>
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
import { formatLanguage } from '~/plugins/utils/methods'

export default {
  name: 'Books',
  async asyncData({ app, query }) {
    try {
      const queryList = { ...query }
      queryList.page = query.page || 1
      queryList['per-page'] = 32

      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            ...queryList,
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
      console.error(error)
      return {
        apiError: true,
      }
    }
  },
  data() {
    return {
      formatLanguage,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: `All books available on ${this.$config.appName}`,
      description: `Discover all available books sorted by title and serie's title`,
      sortOptions: [
        {
          label: "By series' title (default)",
          value: 'title_sort',
        },
        {
          label: 'By title',
          value: 'title',
        },
        {
          label: 'Most recently published',
          value: '-date',
        },
        {
          label: 'Newest uploaded',
          value: '-created_at',
        },
      ],
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
  watchQuery: ['page', 'filter[has_serie]', 'filter[languages]', 'sort'],
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
      const query = { ...this.$route.query }
      query.page = pageNum
      const route = {
        name: this.$route.name,
        query: { ...query },
      }
      return route
    },
  },
}
</script>
