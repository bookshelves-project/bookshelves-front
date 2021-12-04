<template>
  <main class="main-content">
    <app-header
      :title="search ? `Results for &ldquo;${$route.query['q']}&rdquo;` : title"
      :subtitle="search ? `${search.length} results` : description"
    />
    <forms-advanced-search @advancedSearch="advancedSearch" />
    <section class="mt-6">
      <transition name="fade">
        <div v-if="search && search.length">
          <search-results
            v-if="authors.length"
            :entity-type="`author`"
            :entities="authors"
          />
          <search-results
            v-if="series.length"
            :entity-type="`serie`"
            :entities="series"
          />
          <search-results
            v-if="books.length"
            :entity-type="`book`"
            :entities="books"
          />
        </div>
      </transition>
      <transition name="fade">
        <skeleton v-if="pending" />
      </transition>
      <div v-if="empty" class="italic text-gray-500">
        No result
      </div>
    </section>
  </main>
</template>

<script>
import qs from 'qs'

import SearchResults from '~/components/blocks/search-results.vue'
import Skeleton from '~/components/special/skeleton.vue'
import { objectIsEmpty } from '~/plugins/utils/methods'

export default {
  name: 'PageSearchAdvanced',
  components: {
    SearchResults,
    Skeleton
  },
  data() {
    return {
      search: [],
      objectIsEmpty,
      pending: false,
      advancedSearchInput: '',
      empty: false,
      title: 'Search',
      description: 'Try to search what you want'
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
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
  computed: {
    authors() {
      let search = this.search
      search = search.filter(entity => entity.meta.entity === 'author')
      return search
    },
    series() {
      let search = this.search
      search = search.filter(entity => entity.meta.entity === 'serie')
      return search
    },
    books() {
      let search = this.search
      search = search.filter(entity => entity.meta.entity === 'book')
      return search
    }
  },
  async watchQuery(newQuery) {
    if (this) {
      this.search = await this.getSearchResults(newQuery)
    }
  },
  async mounted() {
    this.search = await this.getSearchResults(this.$route.query)
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home'
      },
      {
        url: `${this.$config.baseURL}/search`,
        text: 'Search'
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
  methods: {
    advancedSearch(search) {
      this.$router.push(
        this.localePath({
          path: this.$route.path,
          query: search
        })
      )
    },
    async getSearchResults(query) {
      if (query) {
        if (!objectIsEmpty(query) && query.q.length >= 1) {
          this.pending = true
          this.empty = false

          if (Object.keys(query).length === 1) {
            const search = await this.$axios.$get(
              `/search?${qs.stringify({
                q: query.q
              })}`
            )
            this.pending = false

            if (!search.data.length) {
              this.empty = true
            }

            return search.data
          } else {
            const search = await this.$axios.$get(
              `/search/advanced?${qs.stringify({
                ...query
              })}`
            )
            this.pending = false
            if (!search.data.length) {
              this.empty = true
            }
            return search.data
          }
        }
      } else {
        return null
      }
    }
  }
}
</script>
