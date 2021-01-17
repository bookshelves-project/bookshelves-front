<template>
  <div class="container my-5">
    <books-grid :key="componentKey" class="px-5" :books="search.data" />
  </div>
</template>

<script>
import qs from 'qs'
import booksGrid from '~/components/blocks/books-grid.vue'

export default {
  name: 'SearchIndex',
  components: { booksGrid },
  async asyncData({ $axios, query, error, $content, store }) {
    const searchTerms = query['search-terms']

    const search = await $axios.$get(
      `books/search?${qs.stringify({
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
}
</script>

<style lang="postcss" scoped></style>
