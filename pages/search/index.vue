<template>
  <main class="container mb-5 max-w-7xl">
    <section-heading
      :title="
        search ? `Results for &ldquo;${$route.query['terms']}&rdquo;` : 'Search'
      "
      :subtitle="
        search ? `${search.length} results` : `Try to search what you want`
      "
    />
    <form
      class="w-full max-w-lg pb-6 m-auto lg:max-w-lg"
      @submit.prevent="advancedSearch"
    >
      <label for="search" class="sr-only">Advanced search</label>
      <div class="relative text-light-blue-100 focus-within:text-gray-400">
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
          class="block w-full py-4 pl-10 pr-3 text-lg leading-5 bg-gray-200 bg-opacity-50 border border-transparent rounded-md focus:border-gray-100 focus:bg-gray-100 focus:ring-0 bg-light-blue-700 placeholder-light-blue-100 focus:outline-none focus:ring-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
          placeholder="Advanced search"
          type="search"
        />
      </div>
    </form>
    <div class="relative mb-8">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="px-2 text-sm text-gray-500 bg-white"> Results </span>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="search && search.length > 0"
        :key="componentKey"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
      >
        <entity-card
          v-for="book in search"
          :key="book.id"
          :data="book"
          :cover="book.image"
          :limited-height="false"
          :route="{
            name: `${book.meta.entity}s-slug`,
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
        >
          <template #title>
            <div>
              {{ $overflow(book.title, 25) }}
            </div>
          </template>
          <template #subtitle>
            <div class="italic">
              {{ $capitalize(book.meta.entity) }}
            </div>
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                {{ book.author }}
                <!-- <span
                  v-for="(author, authorId) in book.authors"
                  :key="authorId"
                >
                  <span>{{ book.author.name }}</span>
                  <span
                    v-if="
                      book.authors.length > 1 &&
                      authorId !== book.authors.length - 1
                    "
                  >
                    ,
                  </span>
                </span> -->
              </div>
            </div>
            <div v-if="book.serie" class="mt-5">
              <div class="font-semibold">Serie &#8212;</div>
              <div class="italic break-all">
                {{ book.serie.title }}
              </div>
              <div>Vol. {{ book.serie.number }}</div>
            </div>
          </template>
          <template #title-responsive>
            <div>
              <div class="font-semibold">
                {{ book.title }}
              </div>
              <div>
                {{ $capitalize(book.meta.entity) }}
              </div>
            </div>
            <div class="italic">
              <span v-for="(author, authorId) in book.authors" :key="authorId">
                <span>{{ author.name }}</span>
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  ,
                </span>
              </span>
            </div>
            <div v-if="book.serie">
              {{ book.serie.title }}, vol. {{ book.serie.number }}
            </div>
          </template>
        </entity-card>
      </div>
      <div v-else class="italic text-gray-500">No result</div>
    </transition>
  </main>
</template>

<script>
import qs from 'qs'
import entityCard from '~/components/blocks/entity-card.vue'
import SectionHeading from '~/components/blocks/section-heading.vue'

export default {
  name: 'SearchIndex',
  components: { entityCard, SectionHeading },
  data() {
    return {
      search: [],
      componentKey: 0,
      advancedSearchInput: '',
    }
  },
  head() {
    const title = `Search for ${
      this.$route.query.terms ? this.$route.query.terms : ''
    }`
    const description = 'Find all books you want to read.'
    const image = `${process.env.BASE_URL}/open-graph.jpg`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/search?terms${this.$route.query.terms}`,
        },
      ],
    }
  },
  async watchQuery(newQuery, oldQuery) {
    if (this) {
      this.search = await this.getSearchResults(newQuery.terms)
    }
  },
  async mounted() {
    this.search = await this.getSearchResults(this.$route.query.terms)
  },
  methods: {
    advancedSearch() {
      this.$router.push({
        name: 'search',
        query: { terms: this.advancedSearchInput },
      })
    },
    async getSearchResults(query) {
      if (query) {
        const search = await this.$axios.$get(
          `/api/search?${qs.stringify({
            terms: query,
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
