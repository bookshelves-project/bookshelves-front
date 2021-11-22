<template>
  <div>
    <lazy-blocks-home-hero :hero="homePage.hero" class="pt-5" />
    <!-- <lazy-blocks-home-statistics /> -->
    <!-- <lazy-blocks-home-cloud-logos />
    <lazy-blocks-selected-entities
      class="mt-8 lg:mt-16"
      eyebrow="Want to read a good book?"
      title="Selection of books & series"
    >
      If you search a new book to read, check this selection of eBooks by the
      {{ $config.appName }} Team.
    </lazy-blocks-selected-entities>
    <lazy-blocks-home-features />
    <lazy-blocks-selected-entities
      endpoint="/books/latest"
      orientation="text-right"
      class="mb-8 lg:mb-16"
      eyebrow="Hyped by new books?"
      title="Latest books & series"
    >
      You check new books & series on {{ $config.appName }}? Here you have
      latest books!
    </lazy-blocks-selected-entities>
    <lazy-blocks-home-features-highlight />
    <lazy-blocks-home-cta /> -->
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  useFetch,
  useAsync,
  useContext,
  ref,
  onBeforeMount,
  ssrPromise,
} from '@nuxtjs/composition-api'
import { ApiResponse } from '~/types/ApiResponse'
import { HomePage } from '~/types/home-page/home-page'

// export default {
//   async asyncData() {
//     const res: ApiResponse = await ctx.$axios.$get(`/cms/home-page`)
//     console.log(res)

//     const homePage: HomePage = res.data

//     return {
//       homePage,
//     }
//   },
// }
const ctx = useContext()
const response = ref<ApiResponse>({})
const homePage = ref<HomePage>({})

useFetch(async () => {
  const { data } = await ctx.$axios.get(`/cms/home-page`)
  homePage.value = data.data
})
</script>
