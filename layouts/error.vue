<template>
  <div class="container">
    <div
      class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <h1 class="text-3xl">
        An error occurred ({{ `code ${error.statusCode}` }})
      </h1>
      <div class="mt-2">
        <nuxt-link
          to="/"
          class="p-2 transition-colors duration-100 rounded-md hover:bg-gray-50"
          >Go to home page</nuxt-link
        >
      </div>
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
