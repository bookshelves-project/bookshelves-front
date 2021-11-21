<template>
  <div :class="dev ? 'debug-screens' : ''">
    <lazy-layout-overlay />
    <lazy-special-routes-list />
    <lazy-app-notifications />
    <div class="app mx-auto">
      <lazy-layout-layer />
      <layout-navbar />
      <lazy-layout-sidebar />
      <div style="padding-top: 4rem"></div>
      <nuxt class="min-height-content" />
      <lazy-layout-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api'

const dev = useContext().isDev
</script>

<style lang="postcss">
.min-height-content {
  min-height: 70vh;
}
</style>
