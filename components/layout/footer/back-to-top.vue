<script setup lang="ts">
function scrollToTop() {
  return window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button
    class="hidden md:block text-gray-400 transition-colors duration-100 bg-opacity-50 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100"
    type="button"
    aria-label="Back to top"
    @click="scrollToTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-8 h-8"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
