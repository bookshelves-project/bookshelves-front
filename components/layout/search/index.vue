<script setup lang="ts">
import AppDialog from '@/components/app/dialog.vue'
import LayoutSearchDialog from '@/components/layout/search/dialog.vue'

const isOpen = ref(false)
const metaKey = ref('Ctrl')
const searchKey = ref('k')

const isMacintosh = () => {
  if (navigator.userAgent.includes('Mac')) {
    metaKey.value = '&#8984;'
  } else {
    metaKey.value = 'Ctrl'
  }
}
const shortcutOpen = (e: KeyboardEvent) => {
  if (e.key === searchKey.value && (e.ctrlKey || e.metaKey)) {
    e.preventDefault() // present "Save Page" from getting triggered.

    isOpen.value = true
  }
}
const shortcutClose = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault() // present "Save Page" from getting triggered.

    isOpen.value = false
  }
}
const closeDialog = (status: boolean) => {
  isOpen.value = status
}

onMounted(() => {
  window.addEventListener('keydown', shortcutOpen)
  window.addEventListener('keydown', shortcutClose)
  isMacintosh()
})
</script>

<template>
  <div class="search-bar flex w-full max-w-lg lg:max-w-xs">
    <app-dialog :open="isOpen" size="xl" @close="closeDialog">
      <layout-search-dialog @close="closeDialog" />
    </app-dialog>
    <label for="search" class="sr-only"> Search </label>
    <div
      class="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-500"
      @click="() => (isOpen = !isOpen)"
    >
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div
        class="absolute inset-0 cursor-text rounded-md border border-gray-300 transition-colors duration-75 hover:border-2 hover:border-primary-600 dark:border-gray-600 hover:dark:border-primary-400"
      />
      <input
        id="search"
        class="search"
        placeholder="Search"
        type="search"
        name="search"
      >
      <div class="absolute top-1/2 right-1.5 -translate-y-1/2 transform">
        <span
          style="opacity: 1"
          class="hidden rounded-md border border-gray-300 py-0.5 px-1.5 text-sm leading-5 text-gray-400 dark:border-gray-600 sm:block"
        >
          <span class="sr-only"> Press </span>
          <kbd class="font-sans">
            <abbr title="Control" class="no-underline">
              <span class="mr-1" v-html="metaKey" />
            </abbr>
          </kbd>
          <span class="sr-only"> and </span>
          <kbd class="font-sans uppercase" :title="searchKey">
            {{ searchKey }}
          </kbd>
          <span class="sr-only"> to search </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.search-bar :deep(abbr) {
  @apply no-underline;
}
.search-bar :deep(.search) {
  @apply block w-full rounded-md border py-2 pl-10 pr-3 leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm;
  @apply border-gray-200 text-gray-900 placeholder-gray-500 focus:border-white focus:ring-white focus:ring-offset-primary-600;
}
.dark .search-bar :deep(.search) {
  @apply border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-primary-400;
}
</style>
