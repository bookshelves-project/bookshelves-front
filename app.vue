<script lang="ts" setup>
import AppToasts from '@/components/app/toasts.vue'
import AppHelper from '@/components/app/helper.vue'
import Preview from '@/components/preview.vue'
import LayoutNavbar from '@/components/layout/navbar.vue'
import LayoutSidebar from '@/components/layout/sidebar.vue'
import LayoutFooter from '@/components/layout/footer/index.vue'
import { useApplicationStore } from './store/application'

const isDev = process.dev

const { nuxtInit } = useApplicationStore()
nuxtInit()
</script>

<template>
  <div
    :class="{ 'debug-screens': isDev }"
    class="min-h-screen text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100"
  >
    <app-toasts />
    <app-helper v-if="isDev" />
    <preview />
    <layout-navbar />
    <layout-sidebar />
    <div class="content-min-height pt-16">
      <NuxtPage />
    </div>
    <layout-footer />
  </div>
</template>

<style lang="css">
body {
  @apply overflow-y-scroll bg-white dark:bg-gray-900;
}
.no-scroll {
  width: 100%;
  position: fixed;
  overflow-y: scroll;
}
.dark {
  color-scheme: dark;
  scrollbar-color: theme('colors.gray.600') theme('colors.gray.900');
}
.dark [type='checkbox']:checked,
.dark [type='radio']:checked {
  background-color: currentColor !important;
}
#nprogress {
  pointer-events: none;
}
#nprogress .bar {
  @apply fixed top-0 left-0 w-full bg-primary-600 opacity-75;
  z-index: 1031;
  height: 3px;
}
</style>
