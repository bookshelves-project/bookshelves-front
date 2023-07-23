<script lang="ts" setup>
// import { useApplicationStore } from '~~/stores/application'

const statistics = await useHttp({
  name: '/app/stats',
})

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
useMetadata({
  title: 'APP_NAME, reading in complete tranquility',
})
</script>

<template>
  <home-hero class="pt-5" />
  <home-statistics :statistics="statistics" />
  <home-cloud-logos />
  <listing-slider
    class="mt-8 lg:mt-16 main-block"
    :selection="{
      key: 'latest',
      endpoint: '/entities/latest',
      eyebrow: 'Hyped by new books?',
      title: 'Latest books & series',
      text: 'You check new books & series on? Here you have latest books!',
    }"
    right
  />
  <home-features />
  <!-- <entity-group-slider
    class="mt-8 md:mt-16 main-block"
    :selection="selection"
  /> -->
  <home-highlights />
  <home-cta />
</template>
