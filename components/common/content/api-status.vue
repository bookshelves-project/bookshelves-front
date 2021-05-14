<template>
  <a
    :href="`${apiUrl}`"
    target="_blank"
    rel="noopener noreferrer"
    class="block text-base text-gray-500 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-400 w-max"
  >
    API Status:
    <span class="font-semibold">
      <span v-if="apiStatusBoolean" class="text-green-600"> available </span>
      <span v-else class="text-red-600"> unavailable </span>
    </span>
  </a>
</template>

<script>
export default {
  name: 'ApiStatus',
  data() {
    return {
      apiUrl: this.$config.apiURL,
      apiStatusBoolean: false,
    }
  },
  created() {
    this.apiStatus()
  },
  methods: {
    async apiStatus() {
      let res = null
      try {
        res = await this.$axios.head(`${this.$config.apiURL}`)
        if (res.status === 200) {
          this.apiStatusBoolean = true
        } else {
          this.apiStatusBoolean = false
        }
      } catch (error) {
        this.apiStatusBoolean = false
      }
    },
  },
}
</script>
