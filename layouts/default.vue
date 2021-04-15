<template>
  <div :class="dev ? 'debug-screens' : ''">
    <overlay />
    <div class="mx-auto bg-white dark:bg-gray-900">
      <layer />
      <navbar
        class="transform -translate-x-1/2 border-gray-800 max-w-7xl left-1/2 border-opacity-5"
      />
      <div
        class="fixed z-20 w-full h-16 bg-white border-gray-800 shadow dark:border-gray-800 dark:bg-gray-800 shadow-navbar dark:shadow-none border-opacity-5"
      ></div>
      <sidebar />
      <div class="pt-24"></div>
      <modal />
      <Nuxt class="min-height-content" />
      <default-footer />
    </div>
  </div>
</template>

<script>
import DefaultFooter from '~/components/layout/default-footer.vue'
import Layer from '~/components/layout/layer.vue'
import Navbar from '~/components/layout/navbar.vue'
import Sidebar from '~/components/layout/sidebar.vue'
import Modal from '~/components/special/modal.vue'
import Overlay from '~/components/special/overlay.vue'

export default {
  name: 'LayoutDefault',
  components: {
    Navbar,
    DefaultFooter,
    Sidebar,
    Layer,
    Modal,
    Overlay,
  },
  data() {
    return {
      dev: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>

<style lang="postcss">
@variants group-hover, hover, focus, dark {
  .shadow-navbar {
    box-shadow: 0 4px 2px -2px rgba(211, 211, 211, 0.4);
  }
}
.min-height-content {
  min-height: 70vh;
}
</style>
