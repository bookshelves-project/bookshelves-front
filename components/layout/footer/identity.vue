<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'
import AppColorMode from '@/components/app/color-mode.vue'

const config = useRuntimeConfig()

const apiUrlBase = (endpoint: string) => {
  const config = useRuntimeConfig()
  return `${config.apiURL}${endpoint}`
}

const features = [
  {
    icon: 'feed',
    label: 'OPDS',
    title: 'OPDS: Open Publication Distribution System',
    link: `${apiUrlBase('/opds')}`,
  },
  {
    icon: 'catalog',
    label: 'Catalog',
    title: 'Catalog: simple interface for eReader browser',
    link: `${apiUrlBase('/catalog')}`,
  },
  {
    icon: 'ereader',
    label: 'Webreader',
    title: 'Webreader: to read an eBook directly in your browser',
    link: `${apiUrlBase('/webreader')}`,
  },
  {
    icon: 'api',
    label: 'API',
    title: 'API: share data between applications',
    link: `${apiUrlBase('/docs')}`,
  },
]
</script>

<template>
  <div class="space-y-8 xl:col-span-1">
    <div v-if="config.appName" class="items-center space-x-6 flex">
      <router-link
        :to="$localePath('/')"
        class="group flex w-max items-center lg:mx-0"
      >
        <svg-icon
          name="book"
          class="h-6 w-6 text-gray-400 transition-colors duration-100 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300 md:h-12 md:w-12"
        />
        <div
          class="dm:text-xl mt-2 ml-3 font-handlee text-lg text-gray-400 transition-colors duration-100 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300 md:text-2xl"
        >
          {{ config.appName }}
        </div>
      </router-link>
      <app-color-mode />
    </div>
    <div class="text-base text-gray-500">{{ config.metaDescription }}</div>
    <div class="sm:flex sm:items-center">
      <div class="flex space-y-0">
        <a
          v-for="(feature, id) in features"
          :key="id"
          :href="feature.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="feature.title"
          :aria-label="feature.title"
          class="mx-auto block w-20 rounded-md p-2 text-gray-400 transition-colors duration-75 hover:bg-gray-200 hover:text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <svg-icon :name="`${feature.icon}`" class="mx-auto h-6 w-6" />
          <div class="mt-2 text-center text-xs">{{ feature.label }}</div>
        </a>
        <!-- <app-language-switch /> -->
      </div>
    </div>
  </div>
</template>
