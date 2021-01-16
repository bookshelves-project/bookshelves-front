<template>
  <div>
    <div class="flex bg-white">
      <div v-if="$store.state.layerVisible">
        <div
          :class="$store.state.sidebarOpened ? 'opacity-75' : 'opacity-0'"
          class="fixed inset-0 z-40 transition-opacity duration-300 ease-linear bg-gray-600"
        ></div>
      </div>
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->

      <!-- Static sidebar for desktop -->
      <static-sidebar />
      <sidebar />
      <!-- Main column -->
      <div class="flex flex-col flex-1 w-0">
        <!-- Search header -->

        <header-responsive />
        <Nuxt class="overflow-y-auto" />
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
