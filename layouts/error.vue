<template>
  <div class="container">
    <div
      class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <h1 class="text-3xl font-semibold">
        An error occurred ({{ `code ${error.statusCode}` }})
      </h1>
      <p class="max-w-xl mt-5 prose-xl">
        We are sorry but something went wrong. If this is something that has
        happened too often on certain features, please contact us.
      </p>
      <div class="flex justify-between mt-5">
        <nuxt-link exact to="/" class="error-link">Back to home page</nuxt-link>
        <nuxt-link exact :to="{ name: 'contact' }" class="error-link"
          >Contact us</nuxt-link
        >
      </div>
      <img
        src="/images/warning.svg"
        alt="Warning"
        title="Warning"
        class="pb-16"
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
