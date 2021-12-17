<template>
  <div>
    <div v-if="app" class="flex items-center space-x-10">
      <nuxt-link
        :to="localePath('/')"
        class="flex items-center lg:mx-0 w-max group"
      >
        <svg-icon
          name="book"
          class="w-12 h-12 text-gray-400 transition-colors duration-100 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
        />
        <div
          class="mt-2 ml-3 text-2xl text-gray-400 transition-colors duration-100 md:text-xl font-handlee dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
        >
          {{ app.name }}
        </div>
      </nuxt-link>
      <layout-color-mode />
    </div>
    <div class="text-base text-gray-500">{{ desc }}</div>
    <div class="flex items-center space-x-6">
      <div class="flex space-x-6">
        <a
          v-for="(feature, id) in features"
          :key="id"
          :href="feature.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="feature.title"
          :aria-label="feature.title"
          class="block text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 dark:text-gray-400"
        >
          <svg-icon :name="`${feature.icon}`" class="w-6 h-6 mx-auto" />
          <div class="text-xs text-center mt-2">{{ feature.label }}</div>
        </a>
        <app-language-switch />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import metadata from '@/utils/metadata'
import { Application } from '~/types'

const ctx = useContext()
const app: Application = ctx.$cookies.get('app')

const apiUrlBase = (endpoint: string) => {
  const api = ctx.$config.apiURL.replace('/api', '')
  return `${api}${endpoint}`
}

const features = [
  {
    icon: 'feed',
    label: 'OPDS',
    title: 'OPDS: Open Publication Distribution System',
    link: `${apiUrlBase('/features/opds')}`,
  },
  {
    icon: 'catalog',
    label: 'Catalog',
    title: 'Catalog: simple interface for eReader browser',
    link: `${apiUrlBase('/features/catalog')}`,
  },
  {
    icon: 'ereader',
    label: 'Webreader',
    title: 'Webreader: to read an eBook directly in your browser',
    link: `${apiUrlBase('/features/webreader')}`,
  },
]
const desc = computed(() => metadata.website.description)
</script>
