<script setup lang="ts">
const route = useRoute()

definePageMeta({
  middleware(to) {
    if (to.params.author) {
      const app = useNuxtApp()
      const router = useRouter()
      router.push(
        app.$localePath({
          name: 'authors-slug',
          params: {
            slug: to.params.author,
          },
        }),
      )
    }
  },
})
</script>

<template>
  <app-redirection
    :to="
      $localePath({
        name: 'authors-slug',
        params: {
          slug: route.params.author,
        },
      })
    "
  />
</template>
