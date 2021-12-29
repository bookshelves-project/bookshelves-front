<template>
  <div :class="dev ? 'debug-screens' : ''">
    <lazy-layout-helper />
    <lazy-app-toasts />
    <div class="app mx-auto">
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
import { useApplicationStore } from '~/stores/application'
import { Application } from '~/types'

const dev: boolean = useContext().isDev
const store = useApplicationStore()
const app: Application = store.application

useMeta(() => ({
  title: app.name,
  titleTemplate: app.title_template,
  link: [{ rel: 'icon', type: 'image/svg+xml', href: app.favicon }],
}))
</script>

<script lang="ts">
export default {
  middleware: 'nuxt-init',
  head: {},
}
</script>

<style lang="css" scoped>
.min-height-content {
  min-height: 70vh;
}
</style>
