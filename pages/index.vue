<script lang="ts" setup>
import HomeHero from '@/components/home/hero.vue'
import HomeStatistics from '@/components/home/statistics.vue'
import HomeCloudLogos from '@/components/home/cloud-logos.vue'
import EntitySlider from '@/components/entity/slider/index.vue'
import HomeFeatures from '@/components/home/features.vue'
import HomeFeaturesHighlights from '@/components/home/features-highlights.vue'
import HomeCta from '@/components/home/cta.vue'

import { objectIsEmpty } from '~/utils/methods'
import { useApplicationStore } from '~~/store/application'

const { nuxtAsyncData } = useFetchable()
const homePage = ref<CmsHomePage>()

const store = useApplicationStore()

if (!objectIsEmpty(store.homePage)) {
  homePage.value = store.homePage
} else {
  const response = await nuxtAsyncData<CmsHomePage>('/cms/home-page')

  store.setHomePage(response)
  homePage.value = response
}

const selection: SelectedEntities = {
  key: 'selection',
  endpoint: '/entities/selection',
  eyebrow: 'Want to read a good book?',
  title: 'Selection of books & series',
  text: 'If you search a new book to read, check this selection of eBooks.',
}
const latest: SelectedEntities = {
  key: 'latest',
  endpoint: '/entities/latest',
  eyebrow: 'Hyped by new books?',
  title: 'Latest books & series',
  text: 'You check new books & series on? Here you have latest books!',
}

useHead({
  title: 'Home',
})
</script>

<template>
  <div>
    <div v-if="homePage">
      <home-hero :hero="homePage.hero" class="pt-5" />
      <home-statistics :statistics="homePage.statistics" />
      <home-cloud-logos :logos="homePage.logos" />
      <entity-slider class="mt-8 md:mt-16 main-block" :selection="selection" />
      <home-features :features="homePage.features" />
      <entity-slider
        class="mt-8 lg:mt-16 main-block"
        :selection="latest"
        right
      />
      <!-- <home-features-highlights :highlights="homePage.highlights" /> -->
      <home-cta />
    </div>
  </div>
</template>
