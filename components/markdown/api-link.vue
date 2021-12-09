<template>
  <span v-if="button">
    <app-button
      :href="`${url}${endpoint}`"
      color="primary"
    ><slot /></app-button>
  </span>
  <span v-else>
    <a
      ref="link"
      :href="`${url}${endpoint}`"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
    ><slot /></a>
  </span>
</template>

<script>
export default {
  name: 'ApiLink',
  props: {
    endpoint: {
      type: String,
      default: '/'
    },
    selfRefer: {
      type: Boolean,
      default: false
    },
    base: {
      type: Boolean,
      default: true
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    url() {
      return this.base ? this.$apiUrlBase() : this.$config.apiURL
    }
  },
  mounted() {
    if (this.selfRefer) {
      this.$refs.link.innerHTML = `${this.url}${this.endpoint}`
    }
  }
}
</script>

<style lang="postcss" scoped>
.link {
  @apply font-semibold !important;
}
</style>
