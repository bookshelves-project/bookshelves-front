<script setup lang="ts">
import { useNavigationStore } from '~~/store/navigation'

const { show } = useScroll()
const navigation = useNavigationStore()

const config = useRuntimeConfig()
const toggleSidebar = () => {
  navigation.toggleSidebar()
}
</script>

<template>
  <div
    class="navbar w-full z-20 relative"
    :class="{ 'navbar--hidden': !show }"
  >
    <nav class="w-full border-b border-primary-300 border-opacity-25 bg-white shadow-sm dark:bg-gray-800">
      <div class="mx-auto max-w-7xl">
        <div class="relative flex h-16 items-center justify-between">
          <div class="h-full items-center px-2 flex lg:px-0">
            <div class="flex lg:hidden">
              <button
                aria-label="Open side menu"
                class="hover:bg-gray-700 transition-colors duration-100 p-1.5 rounded-md"
                @click="toggleSidebar"
              >
                <svg class="block h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <app-link
              :to="{
                name: 'index'
              }"
              class="ml-2 hidden lg:flex shrink-0 rounded-md p-2 transition-colors duration-75 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img class="m-auto block h-8 w-8" src="/icon.png" :alt="config.appName">
            </app-link>
            <div class="hidden h-full lg:ml-4 lg:block">
              <div class="flex h-full space-x-6">
                <app-link
                  v-for="(link, id) in navigation.main"
                  :key="id"
                  :to="link.route"
                  class="focus-link inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-semibold text-gray-400 outline-none transition-colors duration-100 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  aria-current="page"
                >
                  <span class="font-semibold">
                    {{ $t(`nav.${link.label}`) }}
                  </span>
                </app-link>
              </div>
            </div>
          </div>
          <div class="pr-4 flex items-center w-full lg:w-96">
            <search />
            <div class="flex items-center">
              <layout-account />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="css" scoped>
.router-link-active {
  @apply border-primary-500 text-primary-500 dark:border-white dark:text-gray-100;
}

.navbar {
  @apply fixed duration-200 transition-all ease-out;
  transform: translate3d(0, 0, 0);
}

.navbar.navbar--hidden {
  transform: translate3d(0, -100%, 0);
}
</style>
