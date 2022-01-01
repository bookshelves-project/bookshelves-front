<template>
  <div
    v-if="hero"
    class="px-4 mx-auto lg:flex lg:items-center max-w-7xl hero md:min-h-[34rem]"
  >
    <div class="max-w-2xl mx-auto lg:mx-0">
      <div class="sm:text-center lg:text-left">
        <h1
          class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 font-handlee sm:text-5xl md:text-6xl"
        >
          <span
            class="block text-primary-600 dark:text-primary-400 xl:inline"
            >{{ application.name }}</span
          ><span class="hidden xl:inline">,</span
          ><span class="block xl:inline">{{ props.hero.title }}</span>
        </h1>
        <p
          class="mx-auto mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl lg:mx-0"
        >
          {{ props.hero.text }}
        </p>
      </div>
    </div>
    <div class="mx-auto mt-5 sm:mt-10 lg:mt-0 lg:ml-auto hidden md:block">
      <div class="mx-auto lg:mx-0">
        <app-img
          :src="props.hero.picture"
          alt="Woman on books pile who is reading"
          override="md:h-[32rem] lg:h-[36rem] object-center"
          title="Woman on books pile who is reading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api'
import { NuxtConfig } from '@nuxt/types'
import { Hero } from '~/types/cms/home-page'
import { Application } from '~/types'
import { useApplicationStore } from '~/stores/application'

const props = defineProps<{
  hero: Hero
}>()

const ctx = useContext()
const store = useApplicationStore()
const application: Application = store.application
const $config: NuxtConfig = ctx.$config
</script>

<style lang="css" scoped>
.hero::v-deep {
  & img {
    object-fit: contain !important;
  }
}
</style>
