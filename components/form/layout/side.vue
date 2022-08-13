<script setup lang="ts">
import AppImg from '@/components/app/img.vue'
import LayoutBreadcrumb from '@/components/layout/breadcrumb.vue'

defineProps<{
  title: string
  reverse?: boolean
  cta?: string
  ctaRoute?: Route
  image?: string
  breadcrumb?: string
}>()
</script>

<template>
  <main class="main-content relative overflow-x-hidden content-min-height">
    <svg
      class="absolute left-1/2 transform translate-x-[75%] block xl:hidden"
      width="404"
      height="404"
      fill="none"
      viewBox="0 0 404 404"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="85737c0e-0916-41d7-917f-596dc7edfa27"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-gray-200 dark:text-gray-700"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        width="404"
        height="404"
        fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
      />
    </svg>
    <svg
      class="absolute right-1/2 bottom-0 transform -translate-x-[75%] block xl:hidden"
      width="404"
      height="404"
      fill="none"
      viewBox="0 0 404 404"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="85737c0e-0916-41d7-917f-596dc7edfa27"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-gray-200 dark:text-gray-700"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        width="404"
        height="404"
        fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
      />
    </svg>
    <layout-breadcrumb :title="breadcrumb" />
    <div class="grid gap-4 xl:grid-cols-3 h-full mt-6 z-10 relative">
      <div :class="reverse ? 'order-2' : ''" class="col-span-1 flex h-full">
        <div class="m-auto w-full md:max-w-md">
          <h1
            class="text-center font-handlee text-3xl font-extrabold text-gray-900 dark:text-gray-100"
          >
            {{ title }}
          </h1>
          <div class="mt-6">
            <slot name="text" />
          </div>
          <div v-if="cta" class="relative mt-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-400"
              />
            </div>
            <div class="relative flex justify-center text-sm">
              <router-link
                :to="$localePath(ctaRoute)"
                class="bg-white px-2 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:bg-gray-900"
              >
                {{ cta }}
              </router-link>
            </div>
          </div>
          <div class="mt-8">
            <slot name="form" />
          </div>
        </div>
      </div>
      <div :class="reverse ? 'order-1' : ''" class="col-span-2 hidden xl:block">
        <app-img
          :src="image"
          class="m-auto !object-contain px-6 h-[35rem]"
          alt="Bibliophile"
        />
      </div>
    </div>
  </main>
</template>
