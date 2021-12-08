<template>
  <div>
    <lazy-blocks-home-hero :hero="homePage.hero" class="pt-5" />
    <lazy-blocks-home-statistics :statistics="homePage.statistics" />
    <lazy-blocks-home-cloud-logos :logos="homePage.logos" />
    <!--
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

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { stringify } from 'qs'
import { ApiResponse, HomePage } from '~/types'

@Component({
  async asyncData (ctx) {
    try {
      const homePage: HomePage = await ctx.$axios
        .$get(`/cms/home-page?${stringify({ lang: ctx.i18n.locale })}`)
        .then((e: ApiResponse<HomePage>) => e.data)

      return {
        homePage
      }
    } catch (error) {
      console.log(error)

      return {
        homePage: {}
      }
    }
  }
})
export default class PageHome extends Vue {
  homePage: HomePage = {}
}
</script>
