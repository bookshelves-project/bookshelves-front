<template>
  <main class="main-content relative">
    <section-heading :title="title" :subtitle="description">
      <entities-filter @filter="filter" />
    </section-heading>
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
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
          </entity-card>
        </div>
      </div>
      <div class="mt-14 mb-5">
        <pagination
          v-if="pages > 1"
          :link-gen="linkGen"
          :pages="pages"
          :current-page="currentPage"
        >
        </pagination>
      </div>
    </section>
    <api-error-message v-else />
  </main>
</template>

<script>
import qs from 'qs'

import EntityCard from '~/components/blocks/entity-card.vue'
import SectionHeading from '~/components/blocks/section-heading.vue'
import ApiErrorMessage from '~/components/special/api-error-message.vue'
import EntitiesFilter from '~/components/blocks/entities-filter.vue'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'

import { formatLanguage, objectIsEmpty } from '~/plugins/utils/methods'
import Pagination from '~/components/special/pagination.vue'

export default {
  name: 'Books',
  components: {
    EntityCard,
    SectionHeading,
    ApiErrorMessage,
    EntitiesFilter,
    Pagination,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query }) {
    try {
      const page = query.page
      const lang = query.lang
      const serie = query.serie
      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            page: page || 1,
            'per-page': 32,
            lang,
            serie,
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
    const title = this.title
    const url = `${this.$config.baseURL}/${this.$nuxt.$route.path}`
    const dynamicMeta = dynamicMetadata({
      title: this.title,
      description: this.description,
      url,
    })
    return {
      title,
      meta: [...dynamicMeta],
    }
  },
  watchQuery: ['page', 'lang', 'serie'],
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
      const lang = this.$route.query.lang
      const serie = this.$route.query.serie
      return {
        name: this.$route.name,
        query: pageNum === 1 ? { lang, serie } : { page: pageNum, lang, serie },
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

        this.$router.push({ name: 'books', query })
      } else {
        this.$router.push({ name: 'books' })
      }
    },
  },
}
</script>
