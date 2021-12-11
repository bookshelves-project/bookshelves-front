<template>
  <nuxt-link
    :to="localePath(to)"
    class="px-3 py-1 m-1 transition-colors duration-100 rounded-full"
    :class="color"
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
      default: () => {}
    },
    order: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
      color: 'red'
    }
  },
  created() {
    this.setColor()
  },
  methods: {
    setColor() {
      this.color = this.colors[this.order % this.colors.length]
    }
  }
}
</script>

<style scoped>
.red {
  @apply bg-red-200 dark:bg-red-700 hover:bg-red-300 dark:hover:bg-red-800;
}
.orange {
  @apply bg-orange-200 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-800;
}
.yellow {
  @apply bg-yellow-200 dark:bg-yellow-700 hover:bg-yellow-300 dark:hover:bg-yellow-800;
}
.green {
  @apply bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-800;
}
.blue {
  @apply bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-red-800;
}
.purple {
  @apply bg-purple-200 dark:bg-purple-700 hover:bg-purple-300 dark:hover:bg-purple-800;
}
</style>
