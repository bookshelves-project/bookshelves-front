<template>
  <div>
    <hero />
    <statistics
      :authors="authorsCount"
      :books="booksCount"
      :series="seriesCount"
    />
  </div>
</template>

<script>
import Hero from '~/components/blocks/hero.vue'
import Statistics from '~/components/blocks/statistics.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Statistics,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const welcome = await $content('welcome').fetch()

      // const booksStore = store.state.books
      // if (booksStore.length < 1) {
      //   const page = query.page
      const [booksCount, seriesCount, authorsCount] = await Promise.all([
        app.$axios.$get('/books/count'),
        app.$axios.$get('/series/count'),
        app.$axios.$get('/authors/count'),
      ])
      // } else {
      //   console.log('detect books in store!')
      // }

      //   const posts = await app.$axios.$get(
      //   `/blog/posts?${qs.stringify({
      //     page: page || 1,
      //     perPage: 6
      //   })}`
      // )
      // return {
      // posts: posts.data,
      // pages: posts.meta.pagination.total_pages,
      // currentPage: posts.meta.pagination.current_page
      // }

      return {
        welcome,
        booksCount,
        seriesCount,
        authorsCount,
      }
    } catch (error) {
      console.error(error)

      return {
        welcome: {},
      }
    }
  },
  data() {
    return {
      pinnedProjectDropdownOpened: false,
      projectDropdownOpened: false,
      // old
      isLoading: false,
      apiData: null,
      menuIsOpen: false,
      profileDropdownIsOpen: false,
      layerMenuIsDisplayed: false,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
  head() {
    return {
      title: 'Bookshelves',
      titleTemplate: '%s : your digital library',
    }
  },
}
</script>
