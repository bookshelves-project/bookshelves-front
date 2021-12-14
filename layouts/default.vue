<template>
  <div :class="dev ? 'debug-screens' : ''">
    <!-- <lazy-layout-overlay /> -->
    <lazy-layout-helper />
    <lazy-app-toasts />
    <div class="app mx-auto">
      <!-- <lazy-layout-layer /> -->
      <layout-navbar />
      <lazy-layout-sidebar />
      <div style="padding-top: 4rem" />
      <div class="min-height-content">
        <nuxt />
      </div>
      <lazy-layout-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Application } from '~/types'

const dev: boolean = useContext().isDev
const ctx = useContext()
const app: Application = ctx.$cookies.get('app')

useMeta(() => ({
  title: app.name,
  titleTemplate: app.title_template,
  link: [{ rel: 'icon', type: 'image/svg+xml', href: app.favicon }],
}))
</script>

<script lang="ts">
export default {
  head: {},
}
</script>

<style lang="postcss">
.min-height-content {
  min-height: 70vh;
}
</style>
