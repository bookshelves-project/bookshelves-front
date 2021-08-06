<template>
  <div :class="dev ? 'debug-screens' : ''">
    <app-notification />
    <overlay />
    <div class="mx-auto bg-white dark:bg-gray-900">
      <layer />
      <navbar
        class="
          transform
          -translate-x-1/2
          border-gray-800
          max-w-7xl
          left-1/2
          border-opacity-5
        "
      />
      <div
        class="
          fixed
          z-20
          w-full
          h-16
          bg-white
          border-gray-800
          shadow
          dark:border-gray-800 dark:bg-gray-800
          shadow-navbar
          dark:shadow-none
          border-opacity-5
        "
      ></div>
      <sidebar />
      <div class="pt-24"></div>
      <modal />
      <Nuxt class="min-height-content" />
      <app-footer />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {
    AppFooter: () => import('~/components/layout/app-footer.vue'),
    Layer: () => import('~/components/layout/layer.vue'),
    Navbar: () => import('~/components/layout/navbar.vue'),
    Sidebar: () => import('~/components/layout/sidebar.vue'),
    Modal: () => import('~/components/special/modal.vue'),
    Overlay: () => import('~/components/special/overlay.vue'),
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
