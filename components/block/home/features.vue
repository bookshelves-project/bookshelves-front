<template>
  <div v-if="features" class="relative py-16 sm:py-24 lg:py-32">
    <div
      class="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl"
    >
      <h2
        class="text-base font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-500"
      >
        {{ features.title }}
      </h2>
      <div
        class="mx-auto mt-5 text-xl text-gray-500 dark:text-gray-400 max-w-prose"
      >
        {{ features.text }}
      </div>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(feature, id) in features.list" :key="id" class="pt-6">
            <div
              class="flow-root px-6 pb-8 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div class="-mt-6">
                <div class="flex">
                  <div
                    class="p-3 rounded-md shadow bg-primary-600 w-max mx-auto"
                  >
                    <img
                      :src="feature.picture"
                      alt=""
                      class="w-8 h-8 text-white"
                    />
                  </div>
                </div>
                <h3
                  class="mt-5 text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100"
                >
                  {{ feature.title }}
                </h3>
                <div class="mt-5 text-base text-gray-500 dark:text-gray-400">
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

<script setup lang="ts">
import { Features } from '~/types/cms/home-page'

const props = defineProps<{
  features: Features
}>()
</script>
