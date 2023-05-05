<script setup lang="ts">
defineProps<{
  publisher?: Publisher
}>()
</script>

<template>
  <div v-if="publisher" class="dark:text-white">
    <typed-link
      :to="{
        name: 'publishers-slug',
        params: { slug: publisher.meta.slug },
      }"
      class="internal-link"
    >
      {{ publisher.name }}
    </typed-link>
  </div>
</template>
