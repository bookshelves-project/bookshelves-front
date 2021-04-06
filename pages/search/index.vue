<template>
  <main class="container mb-5 max-w-7xl">
    <section-heading
      :title="search ? `Results for &ldquo;${$route.query['q']}&rdquo;` : title"
      :subtitle="search ? `${search.length} results` : description"
    />
    <form
      class="w-full max-w-lg pb-6 m-auto lg:max-w-lg"
      @submit.prevent="advancedSearch"
    >
      <label for="search" class="sr-only">Advanced search</label>
      <div class="relative text-light-primary-100 focus-within:text-gray-400">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <!-- Heroicon name: solid/search -->
          <svg
            class="flex-shrink-0 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          id="search"
          v-model="advancedSearchInput"
          name="search"
          class="block w-full py-4 pl-10 pr-3 text-lg leading-5 bg-gray-200 bg-opacity-50 border border-transparent rounded-md focus:border-gray-100 focus:bg-gray-100 focus:ring-0 bg-light-primary-700 placeholder-light-primary-100 focus:outline-none focus:ring-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
          placeholder="Advanced search"
          type="search"
        />
      </div>
    </form>
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
  </main>
</template>

<script>
import qs from 'qs'
import SectionHeading from '~/components/blocks/section-heading.vue'
import SearchResults from '~/components/blocks/search-results.vue'
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'SearchIndex',
  components: {
    SectionHeading,
    SearchResults,
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
    const url = `${process.env.BASE_URL}/search`
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
        url: process.env.BASE_URL,
        text: 'Home',
      },
      {
        url: `${process.env.BASE_URL}/search`,
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
    advancedSearch() {
      this.$router.push({
        name: 'search',
        query: { q: this.advancedSearchInput },
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
