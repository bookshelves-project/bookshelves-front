<script lang="ts" setup>
import type { Serie } from '~/types'

const series = await useHttpQuery<Serie[]>({
  name: '/series',
})
</script>

<template>
  <div class="main-content">
    <listing :entities="series?.data" />
    <pagination
      v-if="series?.meta"
      :pages="series?.meta.last_page"
      :current="series?.meta.current_page"
    />
  </div>
</template>
