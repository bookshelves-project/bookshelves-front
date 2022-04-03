<script setup lang="ts">
import AppButton from '@/components/app/button.vue'
import LayoutSearch from '@/components/layout/search/index.vue'
import LayoutAccount from '@/components/layout/account.vue'
import { useNavigationStore } from '~~/store/navigation'

const navigation = useNavigationStore()

const config = useRuntimeConfig()
const toggleSidebar = () => {
  navigation.toggleSidebar()
}
</script>

<template>
  <nav
    class="fixed z-30 w-full border-b border-primary-300 border-opacity-25 bg-white shadow-sm dark:bg-gray-800"
  >
    <div class="mx-auto max-w-7xl">
      <div class="relative flex h-16 items-center justify-between">
        <div class="hidden h-full items-center px-2 sm:flex lg:px-0">
          <router-link
            :to="$localePath('/')"
            class="ml-2 flex shrink-0 rounded-md p-2 transition-colors duration-75 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <img
              class="m-auto block h-8 w-8"
              src="/favicon.svg"
              :alt="config.appName"
            />
          </router-link>
          <div class="hidden h-full lg:ml-4 lg:block">
            <div class="flex h-full space-x-6">
              <router-link
                :to="$localePath(link.route)"
                v-for="(link, id) in navigation.main"
                :key="id"
                class="focus-link inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-semibold text-gray-400 outline-none transition-colors duration-100 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                aria-current="page"
              >
                <span class="font-semibold">
                  {{ $t(`nav.${link.label}`) }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
          <layout-search />
        </div>
        <div class="flex pr-2 sm:pr-4 lg:hidden">
          <app-button
            color="white"
            size="sm"
            aria-label="Open side menu"
            @click="toggleSidebar"
          >
            <svg
              class="block h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </app-button>
        </div>
        <div class="hidden pr-4 lg:block">
          <div class="flex items-center">
            <layout-account />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.router-link-active {
  @apply border-primary-500 text-primary-500 dark:border-white dark:text-gray-100;
}
</style>
