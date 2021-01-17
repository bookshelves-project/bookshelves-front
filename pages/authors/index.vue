<template>
  <div class="px-5 py-5">
    <authors-grid :key="componentKey" :authors="authors.data" />
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
</template>

<script>
import qs from 'qs'
import authorsGrid from '~/components/blocks/authors/authors-grid.vue'
import Pagination from '~/components/special/pagination.vue'
export default {
  name: 'AuthorsIndex',
  components: { authorsGrid, Pagination },
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [authors] = await Promise.all([
        app.$axios.$get(
          `/authors?${qs.stringify({
            page: page || 1,
            perPage: 32,
          })}`
        ),
      ])

      return {
        authors,
        pages: authors.meta.last_page,
        currentPage: authors.meta.current_page,
        perPage: authors.meta.per_page,
        total: authors.meta.total,
      }
    } catch (error) {
      console.error(error)

      return {
        authors: [],
        pages: 0,
        currentPage: 0,
      }
    }
  },
  data() {
    return {
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
  },
  watchQuery: ['page'],
}
</script>

<style lang="postcss" scoped></style>
