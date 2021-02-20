<template>
  <div>
    <hero />
    <statistics />
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
  data() {
    return {
      pinnedProjectDropdownOpened: false,
      projectDropdownOpened: false,
    }
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
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
