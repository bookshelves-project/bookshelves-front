<template>
  <main class="container mt-5 mb-5 max-w-7xl">
    <div class="relative mb-8">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div v-if="search.length > 0" class="relative flex justify-center">
        <span class="px-3 text-lg font-medium text-gray-900 bg-white">
          Results for &ldquo;<i>{{ $route.query['search-terms'] }}</i
          >&rdquo; : {{ search.length }} Books
        </span>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="search.length > 0"
        :key="componentKey"
        class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
      >
        <entity-card
          v-for="book in search"
          :key="book.id"
          :data="book"
          :cover="book.cover.thumbnail"
          :route="{
            name: 'books-slug',
            params: { author: book.author.slug, slug: book.slug },
          }"
        >
          <template #title>
            {{ $overflow(book.title) }}
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                {{ book.author.name }}
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
            <div class="font-semibold">
              {{ book.title }}
            </div>
            <div class="italic">
              {{ book.author.name }}
            </div>
            <div v-if="book.serie">
              {{ book.serie.title }}, vol. {{ book.serie.number }}
            </div>
          </template>
        </entity-card>
      </div>
    </transition>
  </main>
</template>

<script>
import qs from 'qs'
import entityCard from '~/components/blocks/entity-card.vue'

export default {
  name: 'SearchIndex',
  components: { entityCard },
  data() {
    return {
      search: {},
      componentKey: 0,
    }
  },
  async mounted() {
    this.search = await this.getSearchResults(this.$route.query['search-terms'])
  },
  methods: {
    async getSearchResults(query) {
      const search = await this.$axios.$get(
        `search?${qs.stringify({
          'search-term': query,
        })}`
      )

      return search.data
    },
  },
  async watchQuery(newQuery, oldQuery) {
    this.search = await this.getSearchResults(newQuery['search-terms'])
  },
}
</script>

<style lang="postcss" scoped></style>
