<script setup lang="ts">
import AppImg from '@/components/app/img.vue'

defineProps<{
  logos?: CmsLogos
}>()
</script>

<template>
  <div v-if="logos" class="bg-gray-100 dark:bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p
        class="text-center text-sm font-semibold uppercase tracking-wide text-gray-500"
      >
        {{ logos.title }}
      </p>
      <div
        class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5"
      >
        <a
          v-for="(logo, id) in logos.list"
          :key="id"
          :href="logo.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="logo.label"
          class="hover:zoom col-span-1 flex justify-center transition-all duration-300 md:col-span-2 lg:col-span-1"
        >
          <app-img :src="logo.picture" :title="logo.label" class="w-16 md:w-32" />
        </a>
      </div>
    </div>
  </div>
</template>
