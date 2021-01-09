<template>
  <projects-layout />
</template>

<script>
import ProjectsLayout from '~/components/blocks/projects-layout.vue'

export default {
  name: 'PageDashboard',
  // eslint-disable-next-line vue/no-unused-components
  components: {
    ProjectsLayout,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const [books] = await Promise.all([app.$axios.$get(`books`)])

      store.commit('setBooks', books.data)

      // return {
      //   books: books.data,
      // }
    } catch (error) {
      console.error(error)

      return {
        books: [],
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
}
</script>
