<template>
  <div :class="dev ? 'debug-screens' : ''">
    <lazy-layout-overlay />
    <lazy-special-routes-list />
    <lazy-app-notifications />
    <div class="mx-auto bg-white dark:bg-gray-900">
      <lazy-layout-layer />
      <layout-navbar />
      <lazy-layout-sidebar />
      <div style="padding-top: 4rem"></div>
      <Nuxt class="min-height-content" />
      <lazy-layout-footer />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data() {
    return {
      dev: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>

<style lang="postcss">
/* @variants group-hover, hover, focus, dark {
  .shadow-navbar {
    box-shadow: 0 4px 2px -2px rgba(211, 211, 211, 0.4);
  }
} */

.min-height-content {
  min-height: 70vh;
}
</style>
