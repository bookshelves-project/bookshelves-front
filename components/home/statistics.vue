<script setup lang="ts">
defineProps<{
  statistics?: {
    books: number
    series: number
    authors: number
  }
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
          A quick tour of books count
        </h2>
        <p
          class="mt-3 font-handlee text-3xl font-extrabold text-gray-700 dark:text-gray-300"
        >
          Lots of books for ever more insatiable readers
        </p>
        <div class="mt-5 max-w-3xl text-lg text-gray-900 dark:text-gray-100">
          More and more books for more and more reading, each day brings its own novelties (or almost). Don't hesitate to come back from time to time to discover the new books.
        </div>
        <div
          class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(value, name) in statistics"
            :key="name"
            class="rounded-md"
          >
            <div class="block p-2">
              <span
                class="block text-2xl font-bold text-gray-700 dark:text-gray-300"
              >
                {{ value }}
              </span>
              <span
                class="mt-1 block text-base text-gray-900 dark:text-gray-100"
              ><span class="font-medium text-gray-700 dark:text-gray-300">
                {{ name }}
              </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
