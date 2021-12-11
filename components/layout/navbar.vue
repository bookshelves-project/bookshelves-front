<template>
  <nav
    class="fixed z-30 w-full bg-white dark:bg-gray-800 border-b border-primary-300 border-opacity-25 shadow-sm"
  >
    <div class="max-w-7xl mx-auto">
      <div class="relative h-16 flex items-center justify-between">
        <div class="px-2 flex items-center lg:px-0 h-full">
          <nuxt-link
            :to="localePath('/')"
            class="shrink-0 flex hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-75 p-2 rounded-md ml-2"
          >
            <img class="block h-8 w-8 m-auto" src="/icon.svg" :alt="$config.appName" />
          </nuxt-link>
          <div class="hidden lg:block lg:ml-4 h-full">
            <div class="flex space-x-6 h-full">
              <nuxt-link
                v-for="(booksNav, booksNavId) in navigation"
                :key="booksNavId"
                :to="
                  localePath({
                    name: booksNav.route,
                  })
                "
                class="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-400 transition-colors duration-100 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-white dark:text-gray-400"
                aria-current="page"
              >
                <span class="font-semibold">{{ $t(`nav.${booksNav.label}`) }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
          <layout-search-bar />
        </div>
        <div class="flex lg:hidden pr-4">
          <button
            type="button"
            aria-label="Open side menu"
            class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-75 p-2 rounded-md inline-flex items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
            @click="openSidebar"
          >
            <svg-icon name="menu" class="block w-6 h-6" />
          </button>
        </div>
        <div class="hidden lg:block pr-4">
          <div class="flex items-center">
            <blocks-account-dropdown />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {
      displayIfScrolled: false
    }
  },
  computed: {
    ...mapGetters({
      navigation: 'nav/main'
    })
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
      // if (process.client) {
      //   const body = document.getElementsByTagName('body')[0]
      //   body.classList.add('scroll-prevent')
      // }

      setTimeout(() => {
        this.$store.commit('setSidebar', true)
        this.$store.commit('setLayerOpacity', true)
      }, 150)
    }
  }
}
</script>
