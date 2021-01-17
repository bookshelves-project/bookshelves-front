<template>
  <div class="px-10 py-5">
    <series-grid :key="componentKey" :series="series.data" />
    <pagination
      :link-gen="linkGen"
      :pages="pages"
      :current-page="currentPage"
      :limit="5"
      class="flex justify-center mt-5"
      @event="event"
    >
    </pagination>
  </div>
</template>

<script>
import qs from 'qs'
import SeriesGrid from '~/components/blocks/series/series-grid.vue'
import Pagination from '~/components/special/pagination.vue'

export default {
  name: 'SeriesIndex',
  // eslint-disable-next-line vue/no-unused-components
  components: { SeriesGrid, Pagination },
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [series] = await Promise.all([
        app.$axios.$get(
          `/series?${qs.stringify({
            page: page || 1,
            perPage: 32,
          })}`
        ),
      ])

      return {
        series,
        pages: series.meta.last_page,
        currentPage: series.meta.current_page,
        perPage: series.meta.per_page,
        total: series.meta.total,
      }
    } catch (error) {
      console.error(error)

      return {
        series: [],
        pages: 0,
        currentPage: 0,
      }
    }
  },
  data() {
    return {
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      covers: [
        'http://api.bookshelves.test/storage/covers/40a132646362c26c35668688df577970.webp',
        'http://api.bookshelves.test/storage/covers/f4045002e4872bef8b8037fbdd94b792.webp',
        'http://api.bookshelves.test/storage/covers/eda2979ea17efb8af89900aaa13d3c14.webp',
      ],
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

<style lang="postcss" scoped>
.cover {
  @apply object-cover rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
