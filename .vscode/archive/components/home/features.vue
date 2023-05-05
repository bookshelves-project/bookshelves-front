<script setup lang="ts">
defineProps<{
  features?: CmsFeatures
}>()
</script>

<template>
  <div v-if="features" class="relative py-16 pb-16 sm:pt-24 lg:py-32">
    <div
      class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2
        class="text-base font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-500"
      >
        {{ features.title }}
      </h2>
      <div class="mx-auto mt-5 max-w-prose text-xl text-gray">
        {{ features.text }}
      </div>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div v-for="(feature, id) in features.list" :key="id" class="pt-6">
            <div
              class="flow-root rounded-lg bg-gray-50 px-6 pb-8 dark:bg-gray-800"
            >
              <div class="-mt-6">
                <div class="flex">
                  <div
                    class="mx-auto w-max rounded-md bg-primary-600 p-3 shadow"
                  >
                    <img
                      :src="feature.picture"
                      :alt="feature.title"
                      loading="lazy"
                      class="h-8 w-8 text-white"
                    >
                  </div>
                </div>
                <h3
                  class="mt-5 text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100"
                >
                  {{ feature.title }}
                </h3>
                <div class="mt-5 text-base text-gray">
                  {{ feature.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
