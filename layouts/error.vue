<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen flex flex-col xl:relative">
    <div class="flex-grow flex flex-col">
      <main class="flex-grow flex flex-col">
        <div
          class="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 xl:px-8"
        >
          <div class="shrink-0 my-auto py-16 sm:py-32">
            <p
              class="text-sm font-semibold text-primary-600 dark:text-primary-500 uppercase tracking-wide"
            >
              {{ error.statusCode }} error
            </p>
            <h1
              class="mt-2 text-2xl sm:text-4xl font-semibold font-handlee text-gray-900 dark:text-gray-100 tracking-tight md:text-5xl"
            >
              <span v-if="error.statusCode === 404">Page not found</span>
              <span v-else-if="error.statusCode === 500"
                >Server has failed</span
              >
              <span v-else>Something bad happened</span>
            </h1>
            <div class="mt-2 text-base text-gray-500">
              <span v-if="error.message" class="text-gray-500">{{
                error.message
              }}</span>
              <span v-else>These isn't the book you're looking for.</span>
            </div>
            <div class="mt-6">
              <nuxt-link
                to="/"
                class="text-base font-medium text-primary-600 dark:text-primary-500 hover:text-primary-500"
              >
                Go back home
                <span aria-hidden="true">&rarr;</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </main>
      <footer class="shrink-0 bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 xl:px-8">
          <nav class="flex space-x-4">
            <nuxt-link
              :to="localePath({ name: 'contact' })"
              class="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact Support
            </nuxt-link>
          </nav>
        </div>
      </footer>
    </div>
    <div class="hidden xl:block xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2">
      <app-img
        class="absolute inset-0 h-full w-full object-cover"
        src="/images/library-mess.webp"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" scoped>
.error-link {
  @apply transition-colors duration-100 border-b border-gray-600 hover:bg-gray-50 text-black font-semibold;
}
</style>
