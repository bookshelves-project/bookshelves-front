<template>
  <div v-if="homePage">
    <lazy-blocks-home-hero :hero="homePage.hero" class="pt-5" />
    <lazy-blocks-home-statistics :statistics="homePage.statistics" />
    <lazy-blocks-home-cloud-logos :logos="homePage.logos" />
    <lazy-blocks-selected-entities
      class="mt-8 lg:mt-16"
      :selection="selection"
    />
    <lazy-blocks-home-features :features="homePage.features" />
    <lazy-blocks-selected-entities class="mt-8 lg:mt-16" :selection="latest" />
    <lazy-blocks-home-features-highlights :highlights="homePage.highlights" />
    <lazy-blocks-home-cta />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { useApplicationStore } from '~/stores/application'
import {
  ApiEndpoint,
  ApiResponse,
  Application,
  HomePage,
  SelectedEntities,
} from '~/types'

@Component({
  async asyncData({ $repository, $cookies, i18n, $pinia }) {
    const api: ApiResponse<HomePage> = await $repository(
      ApiEndpoint.CmsHomePage,
      false
    ).find({ lang: i18n.locale })
    const store = useApplicationStore($pinia)

    return {
      homePage: api.data,
      application: store.application,
    }
  },
  head(this: PageIndex) {
    return this.$metadata({
      title: this.application.name,
    })
  },
})
export default class PageIndex extends Vue {
  application: Application = {}
  homePage: HomePage = {}
  axios = this.$axios
  latest: SelectedEntities = {
    endpoint: ApiEndpoint.BookLatest,
    eyebrow: 'Hyped by new books?',
    right: true,
    title: 'Latest books & series',
    text: 'You check new books & series on? Here you have latest books!',
  }

  selection: SelectedEntities = {
    endpoint: ApiEndpoint.BookSelection,
    eyebrow: 'Want to read a good book?',
    right: false,
    title: 'Selection of books & series',
    text: 'If you search a new book to read, check this selection of eBooks.',
  }

  get computedMessage(): HomePage {
    return this.homePage
  }
}

/**
 * Composition API
 */
// export default defineComponent({
//   async asyncData({ $repository }) {
//     const api: ApiResponse<HomePage> = await $repository(
//       ApiEndpoint.CmsHomePage
//     ).find()

//     return {
//       homePage: api.data,
//     }
//   },
// })

/**
 * Composition API `script setup`
 */
// const { $repository } = useContext()
// const data = useAsync(
//   async () => await $repository(ApiEndpoint.CmsHomePage).find(),
//   'homePage'
// )
// const homePage = computed<HomePage>(() => data.value?.data)
</script>
