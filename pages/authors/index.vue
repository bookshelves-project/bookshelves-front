<script lang="ts" setup>
import type { Author } from '~/types'

const authors = await useHttpQuery<Author[]>({
  name: '/authors',
})
</script>

<template>
  <div class="main-content">
    <listing :entities="authors?.data" />
    <pagination
      v-if="authors?.meta"
      :pages="authors?.meta.last_page"
      :current="authors?.meta.current_page"
    />
  </div>
</template>
