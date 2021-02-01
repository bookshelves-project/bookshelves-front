<template>
  <main class="container mt-5 mb-5 max-w-7xl">
    <div class="flex items-center px-5 mb-5">
      <autocomplete-search-bar class="w-full" @searching="searching" />
      <div class="w-56 ml-5">
        Results for &ldquo;<i>{{ $route.query['search-terms'] }}</i
        >&rdquo;
      </div>
    </div>
    <books-grid class="px-5" :books="search.data" />
  </main>
</template>

<script>
import qs from 'qs'
import booksGrid from '~/components/blocks/books-grid.vue'
import AutocompleteSearchBar from '~/components/blocks/autocomplete-search-bar.vue'

export default {
  name: 'SearchIndex',
  components: { booksGrid, AutocompleteSearchBar },
  async asyncData({ $axios, query, error, $content, store }) {
    const searchTerms = query['search-terms']

    const search = await $axios.$get(
      `search?${qs.stringify({
        'search-term': searchTerms,
      })}`
    )
    console.log(search)

    return { search }
  },
  data() {
    return {
      componentKey: 0,
    }
  },
  watchQuery: ['page'],
}
</script>

<style lang="postcss" scoped></style>
