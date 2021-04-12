<template>
  <nuxt-link :to="{ name: route }" class="flex m-auto">
    <img
      src="/images/bookshelves-simple.svg"
      alt="bookshelves"
      class="w-10 h-10"
    />
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    route: {
      type: String,
      default: 'home',
    },
  },
}
</script>
