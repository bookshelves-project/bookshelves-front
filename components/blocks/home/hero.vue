<template>
  <main v-if="hero" class="px-4 mx-auto lg:flex lg:items-center max-w-7xl hero">
    <div class="max-w-2xl mx-auto lg:mx-0">
      <div class="sm:text-center lg:text-left">
        <h1
          class="
            text-4xl
            font-extrabold
            tracking-tight
            text-gray-900
            dark:text-gray-100
            font-handlee
            sm:text-5xl
            md:text-6xl
          "
        >
          <span
            class="block text-primary-600 dark:text-primary-400 xl:inline"
            >{{ $config.appName }}</span
          ><span class="hidden xl:inline">, </span
          ><span class="block xl:inline">{{ hero.title }}</span>
        </h1>
        <p
          class="
            mx-auto
            mt-3
            text-base text-gray-500
            dark:text-gray-400
            sm:mt-5 sm:text-lg sm:max-w-xl
            md:mt-5 md:text-xl
            lg:mx-0
          "
        >
          {{ hero.text }}
        </p>
      </div>
    </div>
    <div class="mx-auto mt-5 sm:mt-10 lg:mt-0 lg:ml-auto hidden md:block">
      <div class="mx-auto lg:mx-0">
        <app-img
          :src="hero.picture"
          alt="Woman on books pile who is reading"
          class="h-64 md:h-[32rem]"
          title="Woman on books pile who is reading"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { Hero } from '~/types/home-page/hero'

const props = defineProps({
  hero: {
    type: Object as () => Hero,
  },
})
</script>

<style lang="postcss" scoped>
.hero::v-deep {
  & img {
    object-fit: contain !important;
  }
}
</style>
