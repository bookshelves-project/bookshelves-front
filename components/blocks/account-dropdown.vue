<template>
  <div class="ml-3">
    <dropdown align="right" :width="48">
      <template #trigger>
        <span class="flex">
          <button
            type="button"
            class="flex items-center text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out border border-transparent rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:focus:bg-gray-700 hover:text-gray-800 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
            aria-label="Open user menu"
          >
            <span class="sr-only">Open user menu</span>
            <transition name="fade">
              <img
                v-if="$auth.$state.loggedIn"
                class="w-8 h-8 rounded-full"
                :src="$auth.$state.user.data.avatar"
                :alt="$auth.$state.user.data.name"
              />
              <img
                v-else
                src="/images/user.svg"
                class="w-8 h-8 rounded-full"
                alt="avatar"
              />
            </transition>
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </span>
      </template>
      <template #content>
        <div v-if="$auth.$state.loggedIn">
          <span v-for="link in authNav" :key="link.id">
            <nuxt-link
              :to="{ name: link.route }"
              class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
              role="menuitem"
              @click.native="closeAccountDropdown"
            >
              <svg-icon :name="link.icon" class="w-5 h-5 mr-1 text-gray-500" />
              {{ link.label }}
            </nuxt-link>
          </span>
          <button
            class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            role="menuitem"
            @click="logout"
          >
            <svg-icon name="logout" class="w-5 h-5 mr-1 text-gray-500" />
            Sign out
          </button>
        </div>
        <div v-else>
          <nuxt-link
            v-for="link in $store.state.authNavigationFalse"
            :key="link.id"
            :to="{ name: link.route }"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
            role="menuitem"
            @click.native="closeAccountDropdown"
          >
            {{ link.label }}
          </nuxt-link>
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from '@/components/special/dropdown-template.vue'
export default {
  name: 'AccountDropdown',
  components: { Dropdown },
  data() {
    return {
      accountDropdownOpened: false,
    }
  },
  computed: {
    authNav() {
      const nav = this.$store.state.authNavigationTrue
      if (this.$auth.$state.user.isAdmin) {
        return nav
      } else {
        return nav.filter((item) => !item.isAdmin)
      }
    },
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
