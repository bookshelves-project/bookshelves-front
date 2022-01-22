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
              v-if="loggedIn"
              class="w-8 h-8"
              :src="user ? user.avatar : null"
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
        <div class="w-48 bg-white dark:bg-gray-700 rounded-md">
          <div v-if="loggedIn">
            <span v-for="(link, id) in auth" :key="id">
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
            <hr class="border-gray-200 dark:border-gray-600" />
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
              v-for="(link, id) in guest"
              :key="id"
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

<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import { useNavigationStore } from '~/stores/navigation'
import { Profile } from '~/types'

const { $auth } = useContext()

const store = useNavigationStore()
const auth = store.auth
const guest = store.guest

const loggedIn = computed(() => $auth.loggedIn)
const user = computed(() => $auth.user?.data as Profile)

const accountDropdownOpened = ref(false)
const { logout } = useAuth()

const closeAccountDropdown = () => {
  accountDropdownOpened.value = false
}
</script>

<style lang="css" scoped>
.link {
  @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-100 rounded-md;
}
</style>
