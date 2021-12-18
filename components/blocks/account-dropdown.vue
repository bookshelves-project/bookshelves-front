<template>
  <div class="ml-3">
    <app-dropdown align="right" click-close>
      <template #trigger>
        <span
          class="flex items-center text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out border border-transparent rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:focus:bg-gray-700 hover:text-gray-800 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
        >
          <span class="sr-only"> Account </span>
          <transition name="fade">
            <app-img
              v-if="$auth.$state.loggedIn"
              class="w-8 h-8"
              :src="
                $auth.$state.user.data ? $auth.$state.user.data.avatar : null
              "
              override="rounded-full"
              invisible
            />
            <app-img
              v-else
              src="/images/user.svg"
              class="w-8 h-8"
              override="rounded-full"
              invisible
            />
          </transition>
          <svg-icon name="dropdown" class="w-5 h-5" />
        </span>
      </template>
      <template #content>
        <div class="w-48 bg-white dark:bg-gray-700">
          <div v-if="$auth.$state.loggedIn">
            <span v-for="link in auth" :key="link.id">
              <nuxt-link
                :to="localePath(link.route)"
                class="link"
                role="menuitem"
              >
                <span class="flex items-center" @click="closeAccountDropdown">
                  <svg-icon :name="link.icon" class="w-5 h-5 mr-1" />
                  {{ link.label }}
                </span>
              </nuxt-link>
            </span>
            <!-- <hr
              v-if="authAdmin.length"
              class="my-1 border-gray-200 dark:border-gray-600"
            />
            <span v-for="link in authAdmin" :key="link.id">
              <nuxt-link
                :to="localePath({ name: link.route })"
                class="
                  flex
                  items-center
                  px-4
                  py-2
                  text-sm text-gray-700
                  hover:bg-gray-200
                  dark:hover:bg-gray-800
                "
                role="menuitem"
              >
                <span class="flex items-center" @click="closeAccountDropdown">
                  <svg-icon
                    :name="link.icon"
                    class="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400"
                  />
                  {{ link.label }}
                </span>
              </nuxt-link>
            </span> -->
            <hr class="my-1 border-gray-200 dark:border-gray-600" />
            <button
              class="link w-full"
              role="menuitem"
              type="button"
              @click="logout"
            >
              <span class="flex items-center">
                <svg-icon
                  name="logout"
                  class="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400"
                />
                Sign out
              </span>
            </button>
          </div>
          <div v-else>
            <nuxt-link
              v-for="link in guest"
              :key="link.id"
              :to="localePath(link.route)"
              class="link"
              role="menuitem"
            >
              <span @click="closeAccountDropdown">{{ link.label }}</span>
            </nuxt-link>
          </div>
        </div>
      </template>
    </app-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountDropdown',
  data() {
    return {
      accountDropdownOpened: false,
    }
  },
  computed: {
    ...mapGetters({
      auth: 'nav/auth',
      guest: 'nav/guest',
    }),
    // authNav() {
    //   const nav = this.$store.state.nav.authNavigationTrue
    //   if (this.$auth.$state.user.data.isAdmin) {
    //     return nav
    //   } else {
    //     return nav.filter((item) => !item.data.isAdmin)
    //   }
    // },
    // authAdmin() {
    //   const nav = this.$store.state.nav.authNavigationAdmin
    //   if (this.$auth.$state.user.data.isAdmin) {
    //     return nav
    //   } else {
    //     return nav.filter((item) => !item.data.isAdmin)
    //   }
    // },
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

<style lang="css" scoped>
.link {
  @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-100;
}
</style>
