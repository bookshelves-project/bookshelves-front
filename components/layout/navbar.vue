<template>
  <header class="relative">
    <div
      :class="{ shadow: displayIfScrolled }"
      class="fixed z-50 w-full py-3 transition-shadow duration-100 bg-white bg-opacity-95"
    >
      <nav
        class="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6"
        aria-label="Global"
      >
        <div class="flex items-center flex-1">
          <div class="flex items-center justify-between w-full md:w-auto">
            <nuxt-link
              to="/"
              active-class="no-active"
              exact-active-class="no-exact-active"
              class="group"
            >
              <span class="sr-only">Bookshelves</span>
              <img
                class="w-auto h-8 transition-all duration-100 sm:h-10 group-hover:home-logo-shadow"
                src="/images/bookshelves.svg"
                alt="Bookshelves logo"
              />
            </nuxt-link>
            <div class="flex items-center -mr-2 md:hidden">
              <button
                id="main-menu"
                type="button"
                class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:bg-gray-800"
                aria-haspopup="true"
              >
                <span class="sr-only">Open main menu</span>
                <!-- Heroicon name: menu -->
                <svg
                  class="w-6 h-6"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="items-center hidden h-10 md:flex md:ml-5">
            <nuxt-link
              v-for="(booksNav, booksNavId) in $store.state.navigation"
              :key="booksNavId"
              :to="{ name: booksNav.route }"
              class="flex items-center h-full px-3 mx-1 transition-colors duration-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-purple-200"
            >
              <!-- <icon
                :name="booksNav.icon"
                stroke
                class="text-gray-400"
                :size="24"
              /> -->
              <span class="font-semibold">
                {{ booksNav.label }}
              </span>
            </nuxt-link>
          </div>
        </div>
        <div class="hidden md:flex md:items-center md:space-x-6">
          <!-- <a
            href="#"
            class="text-base font-medium text-gray-800 hover:text-gray-300"
          >
            Log in
          </a>
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700"
          >
            Register
          </a> -->
          <autocomplete-search-bar class="w-96" />
        </div>
      </nav>
    </div>

    <!--
        Mobile menu, show/hide based on menu open state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
    <div
      class="inset-x-0 top-0 hidden p-2 transition origin-top transform md:hidden"
    >
      <div
        class="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
      >
        <div class="flex items-center justify-between px-5 pt-4">
          <div>
            <img
              class="w-auto h-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
            />
          </div>
          <div class="-mr-2">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            >
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: x -->
              <svg
                class="w-6 h-6"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="pt-5 pb-6"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="main-menu"
        >
          <div class="px-2 space-y-1" role="none">
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
              role="menuitem"
              >Product</a
            >

            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
              role="menuitem"
              >Features</a
            >

            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
              role="menuitem"
              >Marketplace</a
            >

            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
              role="menuitem"
              >Company</a
            >
          </div>
          <div role="none" class="px-5 mt-6">
            <a
              href="#"
              class="block w-full px-4 py-3 font-medium text-center text-gray-800 bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
              >Start free trial</a
            >
          </div>
          <div role="none" class="px-5 mt-6">
            <p class="text-base font-medium text-center text-gray-500">
              Existing customer?
              <a href="#" class="text-gray-900 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import vClickOutside from 'v-click-outside'
import autocompleteSearchBar from '../blocks/autocomplete-search-bar.vue'

export default {
  name: 'Navbar',
  components: { autocompleteSearchBar },
  directives: {
    clickOutside: vClickOutside.directive,
  },
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
    onClickOutside(event) {
      console.log('Clicked outside. Event: ', event)
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
