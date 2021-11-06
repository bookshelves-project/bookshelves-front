<template>
  <div class="ml-3">
    <app-dropdown align="right" click-close>
      <template #trigger>
        <div
          class="
            flex
            items-center
            text-sm
            font-medium
            leading-4
            text-gray-500
            transition
            duration-150
            ease-in-out
            border border-transparent
            rounded-md
            hover:bg-gray-50
            dark:hover:bg-gray-700 dark:focus:bg-gray-700
            hover:text-gray-800
            focus:outline-none focus:bg-gray-50
            active:bg-gray-50
          "
        >
          <transition name="fade">
            <app-img
              v-if="$auth.$state.loggedIn"
              class="w-8 h-8 rounded-full"
              :src="
                $auth.$state.user.data ? $auth.$state.user.data.avatar : null
              "
              invisible
            />
            <app-img
              v-else
              src="/images/user.svg"
              class="w-8 h-8 rounded-full"
              invisible
            />
          </transition>
          <svg-icon name="dropdown" class="w-5 h-5" />
        </div>
      </template>
      <template #content>
        <div class="w-48 bg-white dark:bg-gray-800">
          <div v-if="$auth.$state.loggedIn">
            <span v-for="link in authNav" :key="link.id">
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
            </span>
            <hr
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
            </span>
            <hr class="my-1 border-gray-200 dark:border-gray-600" />
            <button
              class="
                flex
                items-center
                w-full
                px-4
                py-2
                text-sm text-left text-gray-700
                dark:text-gray-100
                hover:bg-gray-200
                dark:hover:bg-gray-800
              "
              role="menuitem"
              type="button"
              @click="logout"
            >
              <svg-icon
                name="logout"
                class="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400"
              />
              Sign out
            </button>
          </div>
          <div v-else>
            <nuxt-link
              v-for="link in $store.state.nav.authNavigationFalse"
              :key="link.id"
              :to="localePath({ name: link.route })"
              class="
                block
                px-4
                py-2
                text-sm text-gray-700
                hover:bg-gray-200
                dark:hover:bg-gray-800
              "
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
export default {
  name: 'AccountDropdown',
  data() {
    return {
      accountDropdownOpened: false,
    }
  },
  computed: {
    authNav() {
      const nav = this.$store.state.nav.authNavigationTrue
      if (this.$auth.$state.user.data.isAdmin) {
        return nav
      } else {
        return nav.filter((item) => !item.data.isAdmin)
      }
    },
    authAdmin() {
      const nav = this.$store.state.nav.authNavigationAdmin
      if (this.$auth.$state.user.data.isAdmin) {
        return nav
      } else {
        return nav.filter((item) => !item.data.isAdmin)
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
