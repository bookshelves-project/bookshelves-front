<template>
  <nav class="fixed z-30 w-full bg-white dark:bg-gray-800">
    <div class="px-2 mx-auto sm:px-4 lg:px-5">
      <div class="flex justify-between h-16">
        <div class="flex px-2 lg:px-0">
          <div class="flex items-center flex-shrink-0">
            <button
              class="flex items-center w-auto h-8 lg:hidden dark:text-gray-100"
              type="button"
              aria-label="Open side menu"
              @click="openSidebar"
            >
              <svg-icon name="menu" class="w-8 h-8" />
              <svg-icon name="bookshelves" class="w-8 h-8 text-primary-600" />
            </button>
            <nuxt-link
              to="/"
              class="hidden lg:block"
              title="Home"
              aria-label="Home"
            >
              <svg-icon name="bookshelves" class="w-8 h-8 text-primary-600" />
            </nuxt-link>
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:space-x-8 navbar">
            <nuxt-link
              v-for="(booksNav, booksNavId) in $store.state.navigation"
              :key="booksNavId"
              :to="{ name: booksNav.route }"
              class="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-400 transition-colors duration-100 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-white dark:text-gray-400"
            >
              <span class="font-semibold">
                {{ booksNav.label }}
              </span>
            </nuxt-link>
          </div>
        </div>
        <div
          class="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end"
        >
          <div class="w-full max-w-lg lg:max-w-md">
            <autocomplete-search-bar />
          </div>
          <account-dropdown
            v-if="$config.moduleSocial"
            class="hidden lg:block"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import autocompleteSearchBar from '../blocks/autocomplete-search-bar.vue'
import AccountDropdown from '../blocks/account-dropdown.vue'

export default {
  name: 'Navbar',
  components: { autocompleteSearchBar, AccountDropdown },
  data() {
    return {
      displayIfScrolled: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 50) {
        this.displayIfScrolled = true
      } else {
        this.displayIfScrolled = false
      }
    },
    openSidebar() {
      this.$store.commit('setLayer', true)
      if (process.client) {
        const body = document.getElementsByTagName('body')[0]
        body.classList.add('scroll-prevent')
      }

      setTimeout(() => {
        this.$store.commit('setSidebar', true)
        this.$store.commit('setLayerOpacity', true)
      }, 150)
    },
  },
}
</script>

<style lang="postcss" scoped>
@variants group-hover, hover, focus {
  /* /deep/ .home-logo-shadow {
  } */
}
</style>
