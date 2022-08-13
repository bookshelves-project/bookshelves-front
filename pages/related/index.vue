<script setup lang="ts">
definePageMeta({
  middleware (to) {
    if (to.params.author) {
      const app = useNuxtApp()
      const router = useRouter()
      router.push(app.$localePath('/'))
    }
  }
})
</script>

<template>
  <app-redirection :to="$localePath('/')" />
</template>
