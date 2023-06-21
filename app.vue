<script lang="ts" setup>
const config = useRuntimeConfig()
const isDev = process.env.NODE_ENV === 'development'

// const config = useRuntimeConfig()
// console.log(config)

// const { nuxtInit } = useApplicationStore()
// nuxtInit()

const localePath = useLocalePath()

// navigateTo(localePath({
//   name: 'user-id',
// }, 'fr'))
// navigateTo(localePath({
//   name: 'authors-author_slug',
//   params: {
//     id: 1,
//   },
// }, 'fr'))
</script>

<template>
  <div
    :class="{ 'debug-screens': isDev }"
    class="min-h-screen text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100"
  >
    <NuxtLoadingIndicator :color="config.public.primaryColor500" />
    <!-- <app-toasts /> -->
    <!-- <app-helper v-if="isDev" /> -->
    <layout-navbar />
    <layout-sidebar />
    <div class="content-min-height pt-16">
      <NuxtPage />
    </div>
    <layout-footer />
  </div>
</template>
