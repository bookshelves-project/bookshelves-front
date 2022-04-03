<script setup lang="ts">
import Redirection from '@/components/redirection.vue'

const { params } = useRoute()

definePageMeta({
  middleware(to, from) {
    if (to.params.author) {
      const app = useNuxtApp()
      const router = useRouter()
      router.push(
        app.$localePath({
          name: 'authors-slug',
          params: {
            slug: to.params.author,
          },
        })
      )
    }
  },
})
</script>

<template>
  <redirection
    :to="
      $localePath({
        name: 'authors-slug',
        params: {
          slug: params.author,
        },
      })
    "
  />
</template>
