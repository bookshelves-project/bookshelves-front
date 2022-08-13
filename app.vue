<script lang="ts" setup>
import { useApplicationStore } from './store/application'

const rc = useRuntimeConfig()
const isDev = process.env.NODE_ENV === 'development'

const { nuxtInit } = useApplicationStore()
nuxtInit()
</script>

<template>
  <div
    :class="{ 'debug-screens': isDev }"
    class="min-h-screen text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100"
  >
    <NuxtLoadingIndicator :color="rc.public.primaryColor500" />
    <app-toasts />
    <app-helper v-if="isDev" />
    <app-preview />
    <layout-navbar />
    <layout-sidebar />
    <div class="content-min-height pt-16">
      <NuxtPage />
    </div>
    <layout-footer />
  </div>
</template>
