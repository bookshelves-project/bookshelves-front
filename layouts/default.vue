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
import {
  defineComponent,
  useMeta,
  computed,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Application } from '~/types/application'

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
  middleware: ['init'],
  head: {},
}
</script>

<style lang="postcss">
.min-height-content {
  min-height: 70vh;
}
</style>
