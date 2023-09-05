<template>
  <div class="w-full">
    <search-fake-input />
    <search-dialog />
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
