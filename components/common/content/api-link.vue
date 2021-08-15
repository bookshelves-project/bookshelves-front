<template>
  <a
    ref="link"
    :href="`${url}${endpoint}`"
    target="_blank"
    rel="noopener noreferrer"
    class="link"
    ><slot
  /></a>
</template>

<script>
export default {
  name: 'ApiLink',
  props: {
    endpoint: {
      type: String,
      default: '/',
    },
    referItSelf: {
      type: Boolean,
      default: false,
    },
    base: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    url() {
      return this.thumbnail ? this.$apiUrlBase() : this.$config.apiURL
    },
  },
  mounted() {
    if (this.referItSelf) {
      this.$refs.link.innerHTML = `${this.url}${this.endpoint}`
    }
  },
}
</script>

<style lang="postcss" scoped>
.link {
  @apply font-semibold !important;
}
</style>
