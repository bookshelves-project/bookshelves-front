<script setup lang="ts">
defineProps<{
  language?: Language
}>()
</script>

<template>
  <div v-if="language" class="mt-2 dark:text-white lg:mt-0">
    <router-link
      :to="
        $localePath({
          name: 'books',
          query: { lang: language.meta.slug },
        })
      "
      class="internal-link"
    >
      {{ language.name }}
    </router-link>
  </div>
</template>
