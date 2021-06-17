<template>
  <main class="container mb-5 max-w-7xl">
    <section-heading
      :title="search ? `Results for &ldquo;${$route.query['q']}&rdquo;` : title"
      :subtitle="search ? `${search.length} results` : description"
    />
    <advanced-search-form @advancedSearch="advancedSearch" />
    <section class="mt-6">
      <transition name="fade">
        <div v-if="search && search.length > 0" :key="componentKey">
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
        <div v-else class="italic text-gray-500">No result</div>
      </transition>
    </section>
  </main>
</template>

<script>
import qs from 'qs'

import SectionHeading from '~/components/blocks/section-heading.vue'
import SearchResults from '~/components/blocks/search-results.vue'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'
import AdvancedSearchForm from '~/components/forms/advanced-search-form.vue'

export default {
  name: 'SearchIndex',
  components: {
    SectionHeading,
    SearchResults,
    AdvancedSearchForm,
  },
  data() {
    return {
      search: [],
      componentKey: 0,
      advancedSearchInput: '',
      title: `Search`,
      description: `Try to search what you want`,
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
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  computed: {
    authors() {
      let search = this.search
      search = search.filter((entity) => entity.meta.entity === 'author')
      return search
    },
    series() {
      let search = this.search
      search = search.filter((entity) => entity.meta.entity === 'serie')
      return search
    },
    books() {
      let search = this.search
      search = search.filter((entity) => entity.meta.entity === 'book')
      return search
    },
  },
  async watchQuery(newQuery) {
    if (this) {
      this.search = await this.getSearchResults(newQuery.q)
    }
  },
  async mounted() {
    this.search = await this.getSearchResults(this.$route.query.q)
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/search`,
        text: 'Search',
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
    advancedSearch(search) {
      this.$router.push({
        path: this.$route.path,
        query: { q: search },
      })
    },
    async getSearchResults(query) {
      if (query) {
        const search = await this.$axios.$get(
          `/search?${qs.stringify({
            q: query,
          })}`
        )

        return search.data
      } else {
        return null
      }
    },
  },
}
</script>
