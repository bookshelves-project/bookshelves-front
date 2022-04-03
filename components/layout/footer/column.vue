<script setup lang="ts">
const props = defineProps<{
  column: FooterColumn
}>()
</script>

<template>
  <div v-if="column">
    <h3
      class="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500"
    >
      {{ $t(`nav.${column.title}`) }}
    </h3>
    <ul class="mt-4 space-y-4">
      <li
        v-for="(link, index) in column.links"
        :key="index"
        class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <router-link :to="$localePath(link.route)" class="block">
          {{ $t(`nav.${link.label}`) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
