<template>
  <div>
    <hero />
    <statistics
      :authors="authorsCount"
      :books="booksCount"
      :series="seriesCount"
      :langs="countLangs"
    />
    <cloud-logos />
    <features />
    <features-highlight />
    <pricing />
    <home-cta />
  </div>
</template>

<script>
import CloudLogos from '~/components/blocks/cloud-logos.vue'
import FeaturesHighlight from '~/components/blocks/features-highlight.vue'
import Features from '~/components/blocks/features.vue'
import Hero from '~/components/blocks/hero.vue'
import HomeCta from '~/components/blocks/home-cta.vue'
import Pricing from '~/components/blocks/pricing.vue'
import Statistics from '~/components/blocks/statistics.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Statistics,
    Pricing,
    Features,
    CloudLogos,
    FeaturesHighlight,
    HomeCta,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const welcome = await $content('welcome').fetch()

      const [
        booksCount,
        seriesCount,
        authorsCount,
        countLangs,
      ] = await Promise.all([
        app.$axios.$get('/api/books/count'),
        app.$axios.$get('/api/series/count'),
        app.$axios.$get('/api/authors/count'),
        app.$axios.$get('/api/books/count-langs'),
      ])
      return {
        welcome,
        booksCount,
        seriesCount,
        authorsCount,
        countLangs,
      }
    } catch (error) {
      console.error(error)

      return {
        welcome: {},
      }
    }
  },
  data() {
    return {
      pinnedProjectDropdownOpened: false,
      projectDropdownOpened: false,
      // old
      isLoading: false,
      apiData: null,
      menuIsOpen: false,
      profileDropdownIsOpen: false,
      layerMenuIsDisplayed: false,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
  head() {
    return {
      title: 'Bookshelves',
      titleTemplate: '%s : your digital library',
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}`,
        },
      ],
    }
  },
}
</script>
