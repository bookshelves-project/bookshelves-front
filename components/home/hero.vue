<script setup lang="ts">
import AppImg from '@/components/app/img.vue'

defineProps<{
  hero?: CmsHero
}>()

const config = useRuntimeConfig()
const appName: string = config.appName || 'Bookshelves'
</script>

<template>
  <div
    v-if="hero"
    class="hero mx-auto max-w-7xl px-4 md:min-h-[34rem] lg:flex lg:items-center"
  >
    <div class="mx-auto max-w-2xl lg:mx-0">
      <div class="sm:text-center lg:text-left">
        <h1
          class="font-handlee text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl"
        >
          <span
            class="block text-primary-600 dark:text-primary-400 xl:inline"
          >{{ appName }}</span><span class="hidden xl:inline">, </span><span class="block xl:inline">{{ hero.title }}</span>
        </h1>
        <p
          class="mx-auto mt-3 text-base text-gray sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0"
        >
          {{ hero.text }}
        </p>
      </div>
    </div>
    <div class="mx-auto mt-5 hidden sm:mt-10 md:block lg:mt-0 lg:ml-auto">
      <div class="mx-auto lg:mx-0">
        <app-img
          :src="hero.picture"
          alt="Woman on books pile who is reading"
          override="md:h-[32rem] lg:h-[36rem] object-center"
          title="Woman on books pile who is reading"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.hero :deep(img) {
  object-fit: contain !important;
}
</style>
