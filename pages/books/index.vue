<template>
  <main class="container mt-5 max-w-7xl">
    <div>
      <div class="flex items-center px-5 mb-5">
        <autocomplete-search-bar class="w-full" @searching="searching" />
        <div class="w-56 ml-5">
          Search on <b>{{ total }}</b> eBooks
        </div>
      </div>
      <!-- <books-grid class="px-5" :books="books.data" /> -->
      <!-- <transition name="fade">
          <books-grid
            v-if="!isReloadForPaginate"
            :key="componentKey"
            class="px-5"
            :books="books.data"
          />
        </transition> -->
      <div class="mt-10">
        <books-grid :key="componentKey" class="px-5" :books="books.data" />
      </div>
      <div class="mt-6 mb-5">
        <pagination
          :link-gen="linkGen"
          :pages="pages"
          :current-page="currentPage"
          :limit="5"
          class="flex justify-center"
          @event="event"
        >
        </pagination>
      </div>
    </div>
  </main>
</template>

<script>
import qs from 'qs'

import Pagination from '~/components/special/pagination.vue'
import BooksGrid from '~/components/blocks/books-grid.vue'
import AutocompleteSearchBar from '~/components/blocks/autocomplete-search-bar.vue'

export default {
  name: 'Books',
  components: {
    Pagination,
    BooksGrid,
    AutocompleteSearchBar,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            page: page || 1,
            perPage: 32,
          })}`
        ),
      ])

      return {
        books,
        pages: books.meta.last_page,
        currentPage: books.meta.current_page,
        perPage: books.meta.per_page,
        total: books.meta.total,
      }
    } catch (error) {
      console.error(error)

      return {
        books: [],
        pages: 0,
        currentPage: 0,
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isReloadForPaginate: false,
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
    }
  },
  methods: {
    linkGen(pageNum) {
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum },
      }
    },
    event(data) {
      this.componentKey += 1
    },
    searching(result) {
      console.log(this.$store.state.searching)
    },
  },
  watchQuery: ['page'],
}
</script>
