<script setup lang="ts">
const props = defineProps<{
  statistics?: CmsStatistics
}>()
</script>

<template>
  <div v-if="statistics" class="statistics relative mt-6">
    <div class="absolute bottom-0 h-80 w-full">
      <div class="h-full">
        <img
          loading="lazy"
          class="h-full w-full object-cover opacity-25"
          src="/images/statistics.webp"
        >
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-gray-900"
        />
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64">
        <h2
          class="text-sm font-semibold uppercase tracking-wide text-primary-600"
        >
          {{ statistics.eyebrow }}
        </h2>
        <p
          class="mt-3 font-handlee text-3xl font-extrabold text-gray-700 dark:text-gray-300"
        >
          {{ statistics.title }}
        </p>
        <div class="mt-5 max-w-3xl text-lg text-gray-900 dark:text-gray-100">
          {{ statistics.text }}
        </div>
        <div
          class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(metric, id) in statistics.list"
            :key="id"
            class="rounded-md transition-colors duration-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-gray-600"
          >
            <div class="block p-2">
              <span
                class="block text-2xl font-bold text-gray-700 dark:text-gray-300"
              >
                {{ metric.count }}
              </span>
              <span
                class="mt-1 block text-base text-gray-900 dark:text-gray-100"
              ><span class="font-medium text-gray-700 dark:text-gray-300">
                {{ metric.label }}
              </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
