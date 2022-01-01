<template>
  <div v-if="logos" class="bg-gray-100 dark:bg-gray-800">
    <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p
        class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
      >
        {{ logos.title }}
      </p>
      <div
        class="grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5"
      >
        <a
          v-for="(logo, id) in logos.list"
          :key="id"
          :href="logo.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="logo.label"
          class="flex justify-center col-span-1 transition-all duration-300 md:col-span-2 lg:col-span-1 hover:zoom"
        >
          <app-img :src="logo.picture" :title="logo.label" class="w-32" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Logos } from '~/types/cms/home-page'

@Component
export default class HomeCloudLogos extends Vue {
  @Prop({ type: Object, required: true }) logos!: Logos
}
</script>
