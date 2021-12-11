<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description" :border="false">
      <template #filters>
        <blocks-filters :sort="sortOptions" paginate />
      </template>
    </app-header>
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
            <template #title>{{ author.lastname }} {{ author.firstname }}</template>
            <template #extra>{{ author.count }} books</template>
          </entity-card>
        </div>
      </div>
      <div class="mt-6 mb-5">
        <Pagination v-if="meta" :current-page="meta.current_page" :pages="meta.last_page" />
      </div>
    </section>
    <api-error-message v-else />
  </main>
</template>

<script>
import { stringify } from 'qs'

import EntityCard from '~/components/blocks/entity-card.vue'
import ApiErrorMessage from '~/components/special/api-error-message.vue'
import Pagination from '~/components/blocks/pagination.vue'

export default {
  name: 'AuthorsIndex',
  components: { EntityCard, ApiErrorMessage, Pagination },
  async asyncData({ app, query }) {
    try {
      const queryList = { ...query }
      queryList.page = query.page || 1
      queryList.perPage = 32

      const [authors] = await Promise.all([
        app.$axios.$get(
          `/authors?${stringify({
            ...queryList
          })}`
        )
      ])

      return {
        authors,
        meta: authors.meta,
        apiError: false
      }
    } catch (error) {
      return {
        apiError: true
      }
    }
  },
  data() {
    return {
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: 'Authors',
      description: 'Want to find all books written by specific author?',
      sortOptions: [
        {
          label: 'By lastname (default)',
          query: { sort: 'lastname' },
          value: 'lastname'
        },
        {
          label: 'By firstname',
          query: { sort: 'firstname' },
          value: 'firstname'
        },
        {
          label: 'Newest created',
          query: { sort: '-created_at' },
          value: '-created_at'
        }
      ]
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = this.title
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          url: this.$nuxt.$route.path
        })
      ]
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home'
      },
      {
        url: `${this.$config.baseURL}/authors`,
        text: 'Authors'
      }
    ]
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
      itemListElement: items
    }
  },
  watchQuery: [
    'page',
    'sort'
  ],
  methods: {
    linkGen(pageNum) {
      const query = { ...this.$route.query }
      query.page = pageNum
      const route = {
        name: this.$route.name,
        query: { ...query }
      }
      return route
    }
  }
}
</script>
