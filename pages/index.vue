<script lang="ts" setup>
// import { useApplicationStore } from '~~/stores/application'

// const { request } = useHttp()
// const { objectIsEmpty } = useTools()
// const homePage = ref<CmsHomePage>()

// const store = useApplicationStore()

// if (!objectIsEmpty(store.homePage)) {
//   homePage.value = store.homePage
// }
// else {
//   const response = await request<CmsHomePage>({
//     endpoint: '/pages/{slug}',
//     params: {
//       slug: 'homepage-en',
//     },
//     extractData: true,
//   })
//   if (response.success) {
//     store.setHomePage(response.body)
//     homePage.value = response.body
//   }
// }

// const selection: SelectedEntities = {
//   key: 'selection',
//   endpoint: '/entities/selection',
//   eyebrow: 'Want to read a good book?',
//   title: 'Selection of books & series',
//   text: 'If you search a new book to read, check this selection of eBooks.',
// }
// const latest: SelectedEntities = {
//   key: 'latest',
//   endpoint: '/entities/latest',
//   eyebrow: 'Hyped by new books?',
//   title: 'Latest books & series',
//   text: 'You check new books & series on? Here you have latest books!',
// }
// useMetadata({
//   title: 'APP_NAME, reading in complete tranquility',
// })
</script>

<template>
  <home-hero class="pt-5" />
  <!-- <home-statistics :statistics="homePage.statistics" /> -->
  <!-- <home-cloud-logos :logos="homePage.logos" /> -->
  <!-- <entity-group-slider
      class="mt-8 md:mt-16 main-block"
      :selection="selection"
    /> -->
  <!-- <home-features :features="homePage.features" /> -->
  <!-- <entity-group-slider
      class="mt-8 lg:mt-16 main-block"
      :selection="latest"
      right
    /> -->
  <!-- <home-features-highlights :highlights="homePage.highlights" /> -->
  <!-- <home-cta /> -->
</template>
