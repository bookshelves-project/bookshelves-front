<template>
  <div :class="dev ? 'debug-screens' : ''" class="dark:bg-gray-900">
    <layer />
    <navbar />
    <sidebar />
    <div class="pt-24"></div>
    <alert />
    <Nuxt class="min-height-content" />
    <default-footer />
  </div>
</template>

<script>
import Alert from '~/components/blocks/alert.vue'
import DefaultFooter from '~/components/layout/default-footer.vue'
import Layer from '~/components/layout/layer.vue'
import Navbar from '~/components/layout/navbar.vue'
import Sidebar from '~/components/layout/sidebar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    Navbar,
    DefaultFooter,
    Sidebar,
    Layer,
    Alert,
  },
  data() {
    return {
      dev: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>

<style>
.min-height-content {
  min-height: 70vh;
}
</style>
