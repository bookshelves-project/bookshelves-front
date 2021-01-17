<template>
  <div
    class="px-4 py-6 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 breadcrumb"
  >
    <!-- <div class="flex-1 min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        
      </h1>
    </div> -->
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <div>
            <nuxt-link to="/" class="text-gray-400 hover:text-gray-500">
              <!-- Heroicon name: home -->
              <svg
                class="flex-shrink-0 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span class="sr-only">Home</span>
            </nuxt-link>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: chevron-right -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <nuxt-link
              exact-active-class="false"
              :exact="false"
              :to="{ name: $route.name }"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {{ $capitalize($route.name) }}
            </nuxt-link>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: chevron-right -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="#"
              aria-current="page"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >Project Nero</a
            >
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
}
</script>

<style lang="postcss">
.breadcrumb {
  a {
    @apply bg-transparent !important;
  }
}
</style>
