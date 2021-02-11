<template>
  <nav class="fixed z-30 w-full bg-white shadow dark:bg-gray-800">
    <div class="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex px-2 lg:px-0">
          <div class="flex items-center flex-shrink-0">
            <button
              class="inline-flex items-center w-auto h-8 lg:hidden dark:text-gray-100"
              @click="openSidebar"
            >
              <svg
                class="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <icon
                name="bookshelves-logo"
                :size="40"
                class="text-primary-600"
              />
            </button>
            <nuxt-link
              to="/"
              class="items-center hidden w-auto h-8 lg:inline-flex"
            >
              <icon
                name="bookshelves-logo"
                :size="40"
                class="text-primary-600"
              />
              <!-- <div class="mt-2 ml-3 text-2xl font-handlee">Bookshelves</div> -->
            </nuxt-link>
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
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
          <account-dropdown class="hidden lg:block" />
        </div>
        <div v-if="false" class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              class="block w-6 h-6"
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
            <!-- Icon when menu is open. -->
            <!--
            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              class="hidden w-6 h-6"
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
        <div v-if="false" class="hidden lg:ml-4 lg:flex lg:items-center">
          <button
            class="flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="relative flex-shrink-0 ml-4">
            <div>
              <button
                id="user-menu"
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            <!--
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
            <div
              class="absolute right-0 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Settings</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Sign out</a
              >
            </div>
          </div>
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
    onClickOutside(event) {
      // console.log('Clicked outside. Event: ', event)
    },
    openSidebar() {
      this.$store.commit('setLayer', true)
      setTimeout(() => {
        this.$store.commit('setSidebar', true)
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
