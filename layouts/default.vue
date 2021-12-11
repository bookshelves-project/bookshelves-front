<template>
  <div :class="dev ? 'debug-screens' : ''">
    <Helper />
    <Nuxt />
  </div>
</template>

<script setup lang="ts">
import Helper from '~/components/layout/helper.vue'

const { isDev } = useContext()
const dev: boolean = isDev
</script>
