<template>
  <div v-click-outside="closeAccountDropdown" class="relative ml-3">
    <div>
      <button
        id="user-menu"
        class="flex w-8 h-8 text-sm rounded-full text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
        aria-haspopup="true"
        title="Account"
        @click="accountDropdownOpened = !accountDropdownOpened"
      >
        <span class="sr-only">Open user menu</span>
        <transition name="fade">
          <img
            v-if="this.$auth.$state.loggedIn"
            class="w-full h-full rounded-full"
            :src="this.$auth.$state.user.profile_photo_url"
            :alt="this.$auth.$state.user.name"
          />
          <img
            v-else
            src="/images/user.svg"
            class="w-8 h-8 rounded-full"
            alt="avatar"
          />
        </transition>
      </button>
    </div>
    <transition name="fade">
      <div
        v-if="accountDropdownOpened"
        class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-900 ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <div v-if="$auth.$state.loggedIn">
          <nuxt-link
            v-for="link in $store.state.authNavigationTrue"
            :key="link.id"
            :to="{ name: link.route }"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            @click.native="closeAccountDropdown"
          >
            {{ link.label }}
          </nuxt-link>
          <button
            class="block w-full px-4 py-2 text-sm text-left text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            @click="logout"
          >
            Sign out
          </button>
        </div>
        <div v-else>
          <nuxt-link
            v-for="link in $store.state.authNavigationFalse"
            :key="link.id"
            :to="{ name: link.route }"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            @click.native="closeAccountDropdown"
          >
            {{ link.label }}
          </nuxt-link>
        </div>
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
    async logout() {
      try {
        this.accountDropdownOpened = false
        await this.$auth.logout()
      } catch (error) {
        console.error(error)
      }
    },
    closeAccountDropdown() {
      this.accountDropdownOpened = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
