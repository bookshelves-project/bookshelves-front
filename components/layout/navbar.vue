<template>
  <nav
    class="
      fixed
      z-30
      w-full
      bg-white
      dark:bg-gray-800
      border-b border-primary-300 border-opacity-25
      shadow-sm
    "
  >
    <div class="max-w-7xl mx-auto">
      <div class="relative h-16 flex items-center justify-between">
        <div class="px-2 flex items-center lg:px-0 h-full">
          <nuxt-link
            :to="localePath('/')"
            class="
              flex-shrink-0 flex
              hover:bg-gray-100
              dark:hover:bg-gray-700
              transition-colors
              duration-75
              p-2
              rounded-md
              ml-2
            "
          >
            <img
              class="block h-8 w-8 m-auto"
              src="/icon.svg"
              :alt="$config.appName"
            />
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
                class="
                  inline-flex
                  items-center
                  px-1
                  pt-1
                  text-sm
                  font-semibold
                  text-gray-400
                  transition-colors
                  duration-100
                  border-b-2 border-transparent
                  hover:border-gray-300 hover:text-gray-700
                  dark:hover:text-white dark:text-gray-400
                "
                aria-current="page"
              >
                <span class="font-semibold">
                  {{ $t(`nav.${booksNav.label}`) }}
                </span>
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
            class="
              bg-gray-100
              dark:bg-gray-700
              text-gray-600
              dark:text-gray-300
              transition-colors
              duration-75
              p-2
              rounded-md
              inline-flex
              items-center
              justify-center
              hover:bg-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-primary-600
              focus:ring-white
            "
            aria-controls="mobile-menu"
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

    <!-- Mobile menu, show/hide based on menu state. -->
    <!-- <div id="mobile-menu" class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          href="#"
          class="
            bg-primary-700
            text-white
            block
            rounded-md
            py-2
            px-3
            text-base
            font-medium
          "
          aria-current="page"
        >
          Dashboard
        </a>

        <a
          href="#"
          class="
            text-white
            hover:bg-primary-500 hover:bg-opacity-75
            block
            rounded-md
            py-2
            px-3
            text-base
            font-medium
          "
        >
          Team
        </a>

        <a
          href="#"
          class="
            text-white
            hover:bg-primary-500 hover:bg-opacity-75
            block
            rounded-md
            py-2
            px-3
            text-base
            font-medium
          "
        >
          Projects
        </a>

        <a
          href="#"
          class="
            text-white
            hover:bg-primary-500 hover:bg-opacity-75
            block
            rounded-md
            py-2
            px-3
            text-base
            font-medium
          "
        >
          Calendar
        </a>

        <a
          href="#"
          class="
            text-white
            hover:bg-primary-500 hover:bg-opacity-75
            block
            rounded-md
            py-2
            px-3
            text-base
            font-medium
          "
        >
          Reports
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-primary-700">
        <div class="px-5 flex items-center">
          <div class="flex-shrink-0">
            <img
              class="rounded-full h-10 w-10"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">Tom Cook</div>
            <div class="text-sm font-medium text-primary-300">
              tom@example.com
            </div>
          </div>
          <button
            type="button"
            class="
              ml-auto
              bg-primary-600
              flex-shrink-0
              rounded-full
              p-1
              text-primary-200
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-primary-600
              focus:ring-white
            "
          >
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <a
            href="#"
            class="
              block
              rounded-md
              py-2
              px-3
              text-base
              font-medium
              text-white
              hover:bg-primary-500 hover:bg-opacity-75
            "
          >
            Your Profile
          </a>

          <a
            href="#"
            class="
              block
              rounded-md
              py-2
              px-3
              text-base
              font-medium
              text-white
              hover:bg-primary-500 hover:bg-opacity-75
            "
          >
            Settings
          </a>

          <a
            href="#"
            class="
              block
              rounded-md
              py-2
              px-3
              text-base
              font-medium
              text-white
              hover:bg-primary-500 hover:bg-opacity-75
            "
          >
            Sign out
          </a>
        </div>
      </div>
    </div> -->
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {
      displayIfScrolled: false,
    }
  },
  computed: {
    ...mapGetters({
      navigation: 'nav/main',
    }),
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
    },
  },
}
</script>
