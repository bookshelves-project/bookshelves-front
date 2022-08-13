<script setup lang="ts">
const { params } = useRoute()

definePageMeta({
  middleware (to) {
    if (to.params.author) {
      const app = useNuxtApp()
      const router = useRouter()
      router.push(
        app.$localePath({
          name: 'authors-slug',
          params: {
            slug: to.params.author
          }
        })
      )
    }
  }
})
</script>

<template>
  <app-redirection
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
