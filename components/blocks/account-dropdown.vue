<template>
  <div v-click-outside="closeAccountDropdown" class="relative ml-3">
    <div>
      <button
        id="user-menu"
        class="flex text-sm rounded-full text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
        aria-haspopup="true"
        title="Account"
        @click="accountDropdownOpened = !accountDropdownOpened"
      >
        <span class="sr-only">Open user menu</span>
        <!-- <img
                  class="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=UbJG7I0AnK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> -->
        <svg
          class="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
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
    <transition name="fade">
      <div
        v-if="accountDropdownOpened"
        class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <nuxt-link
          :to="{ name: 'sign-in' }"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          @click.native="closeAccountDropdown"
        >
          Sign in
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'sign-up' }"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          @click.native="closeAccountDropdown"
        >
          Sign up
        </nuxt-link>
        <!-- <a
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
                > -->
      </div>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'AccountDropdown',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      accountDropdownOpened: false,
    }
  },
  methods: {
    closeAccountDropdown() {
      this.accountDropdownOpened = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
