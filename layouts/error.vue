<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen flex flex-col lg:relative">
    <div class="flex-grow flex flex-col">
      <main class="flex-grow flex flex-col">
        <div
          class="
            flex-grow
            mx-auto
            max-w-7xl
            w-full
            flex flex-col
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div class="flex-shrink-0 my-auto py-16 sm:py-32">
            <p
              class="
                text-sm
                font-semibold
                text-indigo-600
                uppercase
                tracking-wide
              "
            >
              {{ error.statusCode }} error
            </p>
            <h1
              class="
                mt-2
                text-4xl
                font-semibold font-handlee
                text-gray-900
                tracking-tight
                sm:text-5xl
              "
            >
              <span v-if="error.statusCode === 404"> Page not found </span>
              <span v-else-if="error.statusCode === 500">
                Server has failed
              </span>
              <span v-else>Something bad happened</span>
            </h1>
            <p class="mt-2 text-base text-gray-500">
              These isn't the book you're looking for.
            </p>
            <div class="mt-6">
              <nuxt-link
                to="/"
                class="
                  text-base
                  font-medium
                  text-indigo-600
                  hover:text-indigo-500
                "
                >Go back home<span aria-hidden="true"> &rarr;</span></nuxt-link
              >
            </div>
          </div>
        </div>
      </main>
      <footer class="flex-shrink-0 bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
          <nav class="flex space-x-4">
            <nuxt-link
              :to="{ name: 'contact' }"
              class="text-sm font-medium text-gray-500 hover:text-gray-600"
              >Contact Support</nuxt-link
            >
          </nav>
        </div>
      </footer>
    </div>
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="/images/library-mess.webp"
        alt=""
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
