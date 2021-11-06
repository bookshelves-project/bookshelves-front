<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description" />
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="(author, authorId) in authors.data"
            :key="authorId"
            :cover="author.cover.thumbnail"
            :color="author.cover.color"
            :title="author.name"
            :route="{
              name: 'authors-slug',
              params: { slug: author.meta.slug },
            }"
          >
            <template #primary>
              {{ author.lastname }} {{ author.firstname }}
            </template>
            <template #tertiary> {{ author.count }} books </template>
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
import Pagination from '~/components/special/pagination.vue'

export default {
  name: 'AuthorsIndex',
  components: { EntityCard, ApiErrorMessage, Pagination },
  async asyncData({ app, query }) {
    try {
      const queryList = { ...query }
      queryList.page = query.page || 1
      queryList['per-page'] = 32

      const [authors] = await Promise.all([
        app.$axios.$get(
          `/authors?${qs.stringify({
            ...queryList,
          })}`
        ),
      ])

      return {
        authors,
        pages: authors.meta.last_page,
        currentPage: authors.meta.current_page,
        perPage: authors.meta.per_page,
        total: authors.meta.total,
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
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: `Authors`,
      description: `Want to find all books written by specific author?`,
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
        url: `${this.$config.baseURL}/authors`,
        text: 'Authors',
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
  watchQuery: ['page'],
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
