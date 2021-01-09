<template>
  <div
    class="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden"
  >
    <!-- Sidebar toggle, controls the 'sidebarOpen' sidebar state. -->
    <button
      class="px-4 text-gray-500 transition-colors duration-300 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden hover:bg-gray-200"
      @click="openSidebar()"
    >
      <span class="sr-only">Open sidebar</span>
      <!-- Heroicon name: menu-alt-1 -->
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
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </button>

    <div class="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1">
        <form class="flex w-full md:ml-0" action="#" method="GET">
          <label for="search_field" class="sr-only">Search</label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div
              class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
            >
              <!-- Heroicon name: search -->
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search_field"
              name="search_field"
              class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
              placeholder="Search"
              type="search"
            />
          </div>
        </form>
      </div>
      <div class="flex items-center">
        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button
              id="user-menu"
              v-click-outside="closeProfileDropdown"
              class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              aria-haspopup="true"
              @click="profileDropdownOpened = !profileDropdownOpened"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>
          <transition name="fade">
            <div
              v-if="profileDropdownOpened"
              :class="
                profileDropdownOpened
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              "
              class="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  >View profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  >Notifications</a
                >
              </div>
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  >Get desktop app</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  >Support</a
                >
              </div>
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  >Logout</a
                >
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderResponsive',

  data() {
    return {
      profileDropdownOpened: false,
    }
  },
  methods: {
    closeProfileDropdown(event) {
      this.profileDropdownOpened = false
    },
    // openSidebar() {
    //   this.$store.commit('setSidebar', true)
    //   setTimeout(() => {
    //     this.$store.commit('setLayer', true)
    //   }, 100)
    // },
    // closeSidebar() {
    //   this.$store.commit('setSidebar', false)
    //   setTimeout(() => {
    //     this.$store.commit('setLayer', false)
    //   }, 100)
    // },
    openSidebar() {
      this.$store.commit('setLayer', true)
      setTimeout(() => {
        this.$store.commit('setSidebar', true)
      }, 150)
    },
  },
}
</script>
