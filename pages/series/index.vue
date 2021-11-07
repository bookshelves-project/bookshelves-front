<template>
  <main class="main-content">
    <app-header title="Series" :subtitle="description" :border="false">
      <template #filters>
        <blocks-filters languages :sort="sortOptions" />
      </template>
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

import { formatLanguage } from '~/plugins/utils/methods'
import Pagination from '~/components/special/pagination.vue'

export default {
  name: 'SeriesIndex',
  components: { EntityCard, ApiErrorMessage, Pagination },
  async asyncData({ app, query }) {
    try {
      const queryList = { ...query }
      queryList.page = query.page || 1
      queryList['per-page'] = 32

      const [series] = await Promise.all([
        app.$axios.$get(
          `/series?${qs.stringify({
            ...queryList,
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
      title: `All series available on ${this.$config.appName}`,
      description: `Discover books grouped by their serie's name`,
      sortOptions: [
        {
          label: "By series' title (default)",
          query: { sort: 'title_sort' },
          value: 'title_sort',
        },
        {
          label: 'By title',
          query: { sort: 'title' },
          value: 'title',
        },
        {
          label: 'Newest uploaded',
          query: { sort: '-created_at' },
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
  watchQuery: ['page', 'filter[languages]', 'sort'],
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
