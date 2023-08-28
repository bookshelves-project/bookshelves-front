<script setup lang="ts">
import AppImg from '@/components/app/img.vue'

const items = [
  {
    label: 'Calibre',
    slug: 'calibre',
    link: 'https://calibre-ebook.com',
    media: '/images/cloud/logo-calibre.webp',
  },
  {
    label: 'Pandoc',
    slug: 'pandoc',
    link: 'https://pandoc.org',
    media: '/images/cloud/logo-pandoc.webp',
  },
  // {
  //   label: 'Team AlexandriZ',
  //   slug: 'team-alexandriz',
  //   link: 'https://twitter.com/teamalexandriz',
  //   media: '/images/cloud/logo-team-alexandriz.webp',
  // },
  {
    label: 'Kodoo',
    slug: 'kodoo',
    link: 'https://github.com/troyeguo/koodo-reader',
    media: '/images/cloud/logo-kodoo.webp',
  },
  {
    label: 'EDRLab',
    slug: 'edrlab',
    link: 'https://www.edrlab.org',
    media: '/images/cloud/logo-edrlab.webp',
  },
  {
    label: 'OPDS',
    slug: 'opds',
    link: 'https://opds.io',
    media: '/images/cloud/logo-opds.webp',
  },
]
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p
        class="text-center text-sm font-semibold uppercase tracking-wide text-gray-500"
      >
        Special thanks to these softwares or websites because they help our work.
      </p>
      <div
        class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5"
      >
        <a
          v-for="(logo, id) in items"
          :key="id"
          :href="logo.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="logo.label"
          class="hover:zoom col-span-1 flex justify-center transition-all duration-300 md:col-span-2 lg:col-span-1"
        >
          <AppImg :src="logo.media" :title="logo.label" class="w-16 md:w-32" />
        </a>
      </div>
    </div>
  </div>
</template>
