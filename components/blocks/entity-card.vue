<template>
  <!-- <li>
    <div class="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-4">
      <div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4 h-full">
        <img class="object-cover h-full" :src="cover" />
      </div>
      <div class="sm:col-span-2">
        <div class="space-y-4">
          <div class="text-lg leading-6 font-medium space-y-1">
            <h3>{{ title }}</h3>
            <p class="text-indigo-600">Subtitle</p>
          </div>
          <div class="text-lg">
            <p class="text-gray-500">Extra</p>
          </div>
        </div>
      </div>
    </div>
  </li>-->
  <div
    class="relative rounded-sm shadow-sm flex items-center space-x-3 h-56 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-75 focus"
    :title="title"
  >
    <div class="shrink-0 h-full">
      <app-img class="w-36 h-full object-cover" :src="cover" :color="color" :alt="title" />
    </div>
    <div class="flex-1 min-w-0 h-full mt-2">
      <nuxt-link :to="ctx.localePath(route)" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true"></span>
        <h2 class="font-semibold">
          <slot name="title" />
        </h2>
        <h3 class="italic">
          <slot name="subtitle" />
        </h3>
        <div class="mt-1 text-sm sm:mt-3">
          <slot name="extra" />
        </div>
      </nuxt-link>
    </div>
  </div>
  <!-- <article
      class="relative transition-colors duration-100 rounded-md sm:grid sm:grid-cols-2 sm:gap-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 h-full"
    >
      <div class="h-64">
        <app-img :src="cover" :color="color" :title="title" class="cover" />
      </div>
      <div>
        <h2 class="font-semibold">
          <slot name="primary" />
        </h2>
        <h3 class="italic">
          <slot name="secondary" />
        </h3>
        <div class="mt-1 text-sm sm:mt-3">
          <slot name="tertiary" />
        </div>
      </div>
  </article>-->
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-dom'
import { Location } from 'vue-router'

const props = defineProps({
  cover: {
    type: String,
    default: '/images/no-cover.webp'
  },
  color: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  route: {
    type: [
      Object,
      String
    ] as PropType<Location>,
    default: '/'
  }
})

const ctx = useContext()

</script>

<style lang="css" scoped>
.focus {
  @apply focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-primary-800 dark:focus-within:ring-offset-gray-900;
}
>>> .app-img {
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
