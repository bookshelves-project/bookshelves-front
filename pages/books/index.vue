<template>
  <projects-layout>
    <div>
      <header-navigation />
      <div v-if="!isLoading" class="hidden mt-5 sm:block">
        <transition name="fade">
          <books-table
            v-if="$store.state.booksView === 'list'"
            :books="books.data"
          />
          <books-grid v-else class="px-5" :books="books.data" />
        </transition>
        <pagination
          :link-gen="linkGen"
          :pages="pages"
          :current-page="currentPage"
          :limit="5"
          class="flex justify-center mt-8"
        >
        </pagination>
        <slot />
      </div>
      <loading v-else />
    </div>
  </projects-layout>
</template>

<script>
import qs from 'qs'

import ProjectsLayout from '~/components/blocks/projects-layout.vue'
import Pagination from '~/components/special/pagination.vue'
import BooksGrid from '~/components/blocks/books-grid.vue'
import BooksTable from '~/components/blocks/books-table.vue'
import HeaderNavigation from '~/components/blocks/header-navigation.vue'

export default {
  name: 'Books',
  components: {
    ProjectsLayout,
    Pagination,
    BooksGrid,
    BooksTable,
    HeaderNavigation,
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
            perPage: 12,
          })}`
        ),
      ])

      return {
        books,
        pages: books.meta.last_page,
        currentPage: books.meta.current_page,
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
  },
  watchQuery: ['page'],
}
</script>
