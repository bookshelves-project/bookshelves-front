<template>
  <div>
    <div class="flex items-center justify-start px-5 mt-5">
      <nuxt-link :to="{ name: 'books' }" class="btn"> By books </nuxt-link>
      <nuxt-link :to="{ name: 'series' }" class="btn"> By series </nuxt-link>
      <nuxt-link :to="{ name: 'authors' }" class="btn"> By authors </nuxt-link>
    </div>
    <div class="flex justify-center w-full px-5 mt-5 mb-5">
      <autocomplete-search-bar class="w-full" @searching="searching" />
      <div class="flex justify-end px-4 py-3 space-x-2">
        <button
          :class="$store.state.booksView === 'list' ? 'bg-gray-200' : ''"
          class="view-btn"
          @click="switchBooksView()"
        >
          <icon name="view-list" />
        </button>
        <button
          :class="$store.state.booksView === 'grid' ? 'bg-gray-200' : ''"
          class="view-btn"
          @click="switchBooksView()"
        >
          <icon name="view-grid" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import autocompleteSearchBar from './autocomplete-search-bar.vue'
export default {
  name: 'HeaderNavigation',
  components: { autocompleteSearchBar },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  mounted() {
    const booksView = localStorage.getItem('books-view')
    if (booksView) {
      this.$store.commit('setBooksView', booksView)
    }
    this.isLoading = false
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    switchBooksView() {
      if (this.$store.state.booksView === 'list') {
        this.$store.commit('setBooksView', 'grid')
        localStorage.setItem('books-view', 'grid')
      } else {
        this.$store.commit('setBooksView', 'list')
        localStorage.setItem('books-view', 'list')
      }
    },
    searching(result) {
      this.$emit('searching', result)
    },
  },
}
</script>

<style lang="postcss" scoped>
.view-btn {
  @apply p-1 transition-colors duration-300 rounded-md hover:bg-gray-100;
}
.btn {
  @apply bg-purple-600 rounded-lg mx-1 px-3 py-2 text-white text-lg hover:bg-purple-700 transition-colors duration-100;
}
</style>
