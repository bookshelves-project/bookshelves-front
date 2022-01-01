<template>
  <nav
    class="fixed z-30 w-full bg-white dark:bg-gray-800 border-b border-primary-300 border-opacity-25 shadow-sm"
  >
    <div class="max-w-7xl mx-auto">
      <div class="relative h-16 flex items-center justify-between">
        <div class="hidden px-2 sm:flex items-center lg:px-0 h-full">
          <nuxt-link
            :to="localePath('/')"
            class="shrink-0 flex hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-75 p-2 rounded-md ml-2"
          >
            <img
              class="block h-8 w-8 m-auto"
              src="/icon.svg"
              :alt="$config.appName"
            />
          </nuxt-link>
          <div class="hidden lg:block lg:ml-4 h-full">
            <div class="flex space-x-6 h-full">
              <nuxt-link
                v-for="(link, id) in navigation"
                :key="id"
                :to="localePath(link.route)"
                class="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-400 transition-colors duration-100 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-white dark:text-gray-400"
                aria-current="page"
              >
                <span class="font-semibold">{{ $t(`nav.${link.label}`) }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
          <layout-search-bar />
        </div>
        <div class="flex lg:hidden pr-2 sm:pr-4">
          <app-button
            color="white"
            size="sm"
            aria-label="Open side menu"
            @click="openSidebar"
          >
            <svg-icon name="menu" class="block w-6 h-6" />
          </app-button>
        </div>
        <div class="hidden lg:block pr-4">
          <div class="flex items-center">
            <block-account-dropdown />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useIndexStore } from '~/stores'
import { useNavigationStore } from '~/stores/navigation'

const storeNavigation = useNavigationStore()
const navigation = storeNavigation.main

const openSidebar = () => {
  const store = useIndexStore()
  store.toggleSidebar()
}
</script>

<style lang="css" scoped>
.nuxt-link-active {
  @apply border-primary-500 text-primary-500 dark:border-white dark:text-gray-100;
}
</style>
