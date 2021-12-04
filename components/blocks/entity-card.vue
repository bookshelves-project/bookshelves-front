<template>
  <nuxt-link :to="ctx.localePath(route)" class="group entity-card" :title="title">
    <article
      class="relative transition-colors duration-100 rounded-md sm:grid sm:grid-cols-2 sm:gap-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 h-full"
    >
      <div class="h-32 overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
        <app-img :src="cover" :color="color" :title="title" class="cover object-cover" />
        <!-- <img :src="cover" :color="color" :title="title" class="cover object-cover" /> -->
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
    </article>
  </nuxt-link>
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
    type: [Object, String] as PropType<Location>,
    default: '/'
  }
})

const ctx = useContext()

</script>

<style lang="css" scoped>
.entity-card::v-deep .cover {
  width: 97%;
  height: 99%;
}
.entity-card::v-deep img {
  @apply rounded-sm object-top h-full w-full;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
