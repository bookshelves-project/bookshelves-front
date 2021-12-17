<template>
  <div class="main-content">
    <admin-nav />
  </div>
</template>

<script>
import adminNav from '~/components/admin/admin-nav.vue'
export default {
  name: 'PageDatabase',
  components: { adminNav },
  data() {
    return {
      title: 'Admin: database',
      description: ''
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = this.title
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          description: this.description,
          url: this.$nuxt.$route.path
        })
      ]
    }
  }
}
</script>
