<script lang="ts" setup>
import type { Book } from '~/types'

const books = await useHttpQuery<Book[]>({
  name: '/books',
})
</script>

<template>
  <div class="main-content">
    <listing :entities="books?.data" />
    <pagination
      v-if="books?.meta"
      :pages="books?.meta.last_page"
      :current="books?.meta.current_page"
    />
  </div>
</template>
