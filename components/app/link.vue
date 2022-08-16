<script lang="ts" setup>
defineProps<{
  to?: TypedRoute
}>()
</script>

<template>
  <nuxt-link
    :to="$localePath(to)"
  >
    <slot />
  </nuxt-link>
</template>
