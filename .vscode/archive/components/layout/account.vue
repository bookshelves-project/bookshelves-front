<script setup lang="ts">
// import useAuth from '~/composables/useAuth'
import { useNavigationStore } from '~~/stores/navigation'

// const ctx = useNuxtApp().nuxt2Context
// const $auth = ctx.$auth

const { auth, guest } = useNavigationStore()

// const loggedIn = computed(() => $auth.loggedIn)
// const user = computed(() => $auth.user?.data as Profile)
const loggedIn = ref(false)
const user = ref<Profile>()

// const { logout } = useAuth()
function logout() {}
</script>

<template>
  <div class="ml-3">
    <app-dropdown align="right" auto-close class="flex">
      <template #trigger>
        <span
          class="flex items-center rounded-md border border-transparent text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:bg-gray-50 hover:text-gray-800 focus:bg-gray-50 focus:outline-none active:bg-gray-50 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
        >
          <span class="sr-only"> Account </span>
          <transition name="fade">
            <app-img
              v-if="loggedIn"
              class="h-8 w-8"
              :src="user?.avatar ? user.avatar : '/images/user.svg'"
              override="rounded-full"
              invisible
            />
            <app-img
              v-else
              src="/images/user.svg"
              class="h-8 w-8"
              override="rounded-full"
              invisible
            />
          </transition>
          <svg-icon name="dropdown" class="h-5 w-5 mb-1 hidden sm:block" />
        </span>
      </template>
      <template #content>
        <div>
          <div v-if="loggedIn">
            <span v-for="(link, id) in auth" :key="id">
              <typed-link
                :to="link.route"
                class="link"
                role="menuitem"
              >
                <span class="flex items-center">
                  <svg-icon :name="link.icon" class="mr-1 h-5 w-5" />
                  {{ link.label }}
                </span>
              </typed-link>
            </span>
            <hr class="border-gray-200 dark:border-gray-600">
            <button
              class="link w-full"
              role="menuitem"
              type="button"
              @click="logout()"
            >
              <span class="flex items-center">
                <svg-icon name="logout" class="mr-1 h-5 w-5 text-gray" />
                Sign out
              </span>
            </button>
          </div>
          <div v-else>
            <typed-link
              v-for="(link, id) in guest"
              :key="id"
              :to="link.route"
              class="link"
              role="menuitem"
            >
              <span>{{ link.label }}</span>
            </typed-link>
          </div>
        </div>
      </template>
    </app-dropdown>
  </div>
</template>

<style lang="css" scoped>
.link {
  @apply block rounded-md px-3 py-1.5 text-gray-700 text-sm transition-colors duration-100 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600;
}
</style>
