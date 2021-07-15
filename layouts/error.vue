<template>
  <div
    class="
      min-h-screen
      px-4
      py-16
      sm:px-6 sm:py-24
      md:grid md:place-items-center
      lg:px-8
    "
  >
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-primary-600 sm:text-5xl">
          {{ error.statusCode }}
        </p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1
              class="
                text-4xl
                font-semibold
                text-gray-900
                tracking-tight
                sm:text-5xl
              "
            >
              Page not found
            </h1>
            <p class="mt-1 text-base text-gray-500">
              Please check the URL in the address bar and try again.
            </p>
          </div>
          <div
            class="
              mt-10
              flex
              space-x-3
              sm:border-l sm:border-transparent sm:pl-6
            "
          >
            <app-button to="/" :color="`primary`"> Go back home </app-button>
            <app-button :to="{ name: 'contact' }" :color="`secondary`">
              Contact support
            </app-button>
          </div>
        </div>
      </main>
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
