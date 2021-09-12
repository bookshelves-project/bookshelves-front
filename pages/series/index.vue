<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description">
      <blocks-entities-filter lang @filter="filter" />
    </app-header>
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="serie in series.data"
            :key="serie.id"
            :cover="serie.cover.thumbnail"
            :color="serie.cover.color"
            :title="serie.title"
            :route="{
              name: 'series-author-slug',
              params: { author: serie.meta.author, slug: serie.meta.slug },
            }"
          >
            <template #primary>
              {{ serie.title }}
            </template>
            <template #secondary>
              <span v-for="(author, authorId) in serie.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    serie.authors.length > 1 &&
                    authorId !== serie.authors.length - 1
                  "
                >
                  &
                </span>
              </span>
            </template>
            <template #tertiary>
              <span>{{ serie.count }} books</span>
              <span v-if="serie.language" class="mt-1 block">
                {{ formatLanguage(serie.language) }}
              </span>
            </template>
          </entity-card>
        </div>
      </div>
      <div class="mt-6 mb-5">
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
import ApiErrorMessage from '~/components/special/api-error-message.vue'

import { formatLanguage, objectIsEmpty } from '~/plugins/utils/methods'
import Pagination from '~/components/special/pagination.vue'

export default {
  name: 'SeriesIndex',
  components: { EntityCard, ApiErrorMessage, Pagination },
  async asyncData({ app, query }) {
    try {
      const page = query.page
      const lang = query.lang
      const [series] = await Promise.all([
        app.$axios.$get(
          `/series?${qs.stringify({
            page: page || 1,
            'per-page': 32,
            lang,
          })}`
        ),
      ])

      return {
        series,
        pages: series.meta.last_page,
        currentPage: series.meta.current_page,
        perPage: series.meta.per_page,
        total: series.meta.total,
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
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: `Series`,
      description: `Discover books grouped by their serie's name`,
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = this.title
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          description: this.description,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/series`,
        text: 'Series',
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
  watchQuery: ['page', 'lang'],
  methods: {
    linkGen(pageNum) {
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum },
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

        this.$router.push({ name: this.$route.name, query })
      } else {
        this.$router.push({ name: this.$route.name })
      }
    },
  },
}
</script>
