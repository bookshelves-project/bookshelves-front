<template>
  <li class="relative flex col-span-1 rounded-md shadow-sm">
    <div
      class="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-pink-600 rounded-l-md"
    >
      GA
    </div>
    <div
      class="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md"
    >
      <div class="flex-1 px-4 py-2 text-sm truncate">
        <a href="#" class="font-medium text-gray-900 hover:text-gray-600">
          GraphQL API
        </a>
        <p class="text-gray-500">12 Members</p>
      </div>
      <div class="flex-shrink-0 pr-2">
        <button
          id="-project-options-menu-0"
          v-click-outside="closeProjectDropdown"
          aria-haspopup="true"
          class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          @click="projectDropdownOpened = !projectDropdownOpened"
        >
          <span class="sr-only">Open options</span>
          <!-- Heroicon name: dots-vertical -->
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="projectDropdownOpened"
            :class="
              projectDropdownOpened
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            "
            class="absolute z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-10 top-3 ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="-project-options-menu-0"
          >
            <div class="py-1" role="none">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                >View</a
              >
            </div>
            <div class="py-1" role="none">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                >Removed from
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                >Share</a
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </li>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'ProjectCard',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      projectDropdownOpened: false,
    }
  },
  methods: {
    closeProjectDropdown(event) {
      this.projectDropdownOpened = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
