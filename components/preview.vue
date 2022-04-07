<script setup lang="ts">
const display = ref(false)

const checkStorage = () => {
  if (process.client) {
    const storage = localStorage.getItem('preview')
    if (storage === null) {
      display.value = true
    }
  }
}
checkStorage()

const clearPreview = () => {
  localStorage.setItem('preview', 'false')
  display.value = false
}
</script>

<template>
  <client-only>
    <transition>
      <div v-if="display" class="fixed z-50 top-5 left-5">
        <div class="rounded-md bg-gray-50 dark:bg-gray-700 p-4 w-96">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Heroicon name: solid/information-circle -->
              <svg
                class="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
                Bookshelves use Nuxt 3 preview
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You will find some bugs here. Some features are disabled for now.
                <ul class="list-disc list-inside mt-2">
                  <li>
                    <code>i18n</code>
                  </li>
                  <li>
                    <code>auth</code>
                  </li>
                  <li>
                    Webreader
                  </li>
                </ul>
              </p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  class="inline-flex bg-gray-50 dark:bg-gray-800 rounded-md p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600"
                  @click="clearPreview"
                >
                  <span class="sr-only">Dismiss</span>
                  <!-- Heroicon name: solid/x -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </client-only>
</template>
