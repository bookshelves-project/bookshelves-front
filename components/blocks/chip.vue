<template>
  <nuxt-link
    :to="to"
    class="px-3 py-1 m-1 transition-colors duration-100 bg-primary-200 dark:bg-primary-700 dark:hover:bg-primary-800 rounded-full hover:bg-primary-300"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    to: {
      type: [String, Object],
      default: () => {},
    },
  },
}
</script>
