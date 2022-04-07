<script setup lang="ts">
defineProps<{
  publisher?: Publisher
}>()
</script>

<template>
  <div v-if="publisher" class="dark:text-white">
    <router-link
      :to="
        $localePath({
          name: 'publishers-slug',
          params: { slug: publisher.meta.slug },
        })
      "
      class="internal-link"
    >
      {{ publisher.name }}
    </router-link>
  </div>
</template>
