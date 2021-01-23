<template>
  <div :class="dev ? 'debug-screens' : ''">
    <navbar />
    <div class="pt-20"></div>
    <Nuxt />
    <!-- <client-only>
      <tailwind-helper sneak />
    </client-only> -->
    <!-- <div>
    <div class="flex">
      <div v-if="$store.state.layerVisible">
        <div
          :class="$store.state.sidebarOpened ? 'opacity-75' : 'opacity-0'"
          class="fixed inset-0 z-40 transition-opacity duration-300 ease-linear bg-gray-600"
        ></div>
      </div>
      <static-sidebar class="fixed min-h-screen lg:w-64" />
      <sidebar />
      <div class="w-full lg:ml-64">
        <header-responsive />
        <Nuxt />
      </div>
    </div>
    <back-to-top />

  </div> -->
  </div>
</template>

<script>
import Navbar from '~/components/layout/navbar.vue'
// import BackToTop from '~/components/layout/back-to-top.vue'
// import HeaderResponsive from '~/components/layout/header-responsive.vue'
// import Sidebar from '~/components/layout/sidebar.vue'
// import StaticSidebar from '~/components/layout/static-sidebar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    Navbar,
    // StaticSidebar,
    // Sidebar,
    // HeaderResponsive,
    // BackToTop,
  },
  data() {
    return {
      dev: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>
