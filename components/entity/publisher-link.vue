<script setup lang="ts">
defineProps<{
  publisher?: Publisher
}>()
</script>

<template>
  <div v-if="publisher" class="dark:text-white">
    <app-link
      :to="{
        name: 'publishers-slug',
        params: { slug: publisher.meta.slug },
      }"
      class="internal-link"
    >
      {{ publisher.name }}
    </app-link>
  </div>
</template>
