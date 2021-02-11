<template>
  <div class="relative inline-block px-3 mt-6 text-left">
    <!-- Dropdown menu toggle, controlling the show/hide state of dropdown menu. -->
    <div>
      <button
        id="options-menu"
        v-click-outside="closeProfileDropdown"
        type="button"
        class="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
        aria-haspopup="true"
        aria-expanded="true"
        @click="profileDropdownOpened = !profileDropdownOpened"
      >
        <span class="flex items-center justify-between w-full">
          <span class="flex items-center justify-between min-w-0 space-x-3">
            <img
              class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
              alt=""
            />
            <span class="flex-1 min-w-0">
              <span class="text-sm font-medium text-gray-900 truncate"
                >Jessy Schwarz</span
              >
              <span class="text-sm text-gray-500 truncate">@jessyschwarz</span>
            </span>
          </span>
          <!-- Heroicon name: selector -->
          <svg
            class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
    <transition name="fade">
      <div
        v-if="profileDropdownOpened"
        :class="
          profileDropdownOpened ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        "
        class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="py-1">
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
        <div class="py-1">
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
        <div class="py-1">
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
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'ButtonUserAccount',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      profileDropdownOpened: false,
    }
  },
  methods: {
    closeProfileDropdown(event) {
      this.profileDropdownOpened = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
