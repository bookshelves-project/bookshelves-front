<script setup lang="ts">
import AppButton from '@/components/app/button.vue'
</script>

<template>
  <section class="pt-2">
    <div
      class="mx-auto py-12 md:max-w-7xl lg:flex lg:items-center lg:justify-between lg:py-20 container"
    >
      <h2
        class="font-handlee text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl"
      >
        <span class="block">Ready to dive in?</span>
        <span class="block text-primary-600 dark:text-primary-500"
        >Discover your next universe.</span
        >
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:shrink-0">
        <div class="inline-flex rounded-md shadow">
          <app-button color="primary" :to="{ name: 'books' }">
            Discover books
          </app-button>
        </div>
      </div>
    </div>
  </section>
</template>
