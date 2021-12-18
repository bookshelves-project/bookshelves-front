<template>
  <div class="main-content">
    new page
    <div>
      {{ upgrade }}
      <nuxt-content :document="upgrade" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Content } from '~/types'

const ctx = useContext()
const upgrade = useAsync<Content>(() => {
  return ctx
    .$content('upgrade')
    .fetch<Content>()
    .then((e) => (e.length ? e.find(true) : e))
})
</script>

<style scoped></style>
