<template>
  <div>
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
    <client-only>
      <tailwind-helper sneak />
    </client-only>
  </div>
</template>

<script>
import BackToTop from '~/components/layout/back-to-top.vue'
import HeaderResponsive from '~/components/layout/header-responsive.vue'
import Sidebar from '~/components/layout/sidebar.vue'
import StaticSidebar from '~/components/layout/static-sidebar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    StaticSidebar,
    Sidebar,
    HeaderResponsive,
    BackToTop,
  },
}
</script>
