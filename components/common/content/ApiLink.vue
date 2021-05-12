<template>
  <a
    ref="link"
    :href="`${$config.apiURL}${endpoint}`"
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
  },
  mounted() {
    if (this.referItSelf) {
      this.$refs.link.innerHTML = `${this.$config.apiURL}${this.endpoint}`
    }
  },
}
</script>

<style lang="postcss" scoped>
.link {
  @apply font-semibold !important;
}
</style>
