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
import CloudLogos from '~/components/blocks/home/cloud-logos.vue'
import FeaturesHighlight from '~/components/blocks/home/features-highlight.vue'
import Features from '~/components/blocks/home/features.vue'
import Hero from '~/components/blocks/home/hero.vue'
import HomeCta from '~/components/blocks/home/cta.vue'
import Pricing from '~/components/blocks/home/pricing.vue'
import Statistics from '~/components/blocks/home/statistics.vue'

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
      title: `Bookshelves, your digital library`,
    }
  },
  head() {
    return {
      title: this.title,
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.baseURL}/`,
        },
      ],
    }
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${this.$config.baseURL}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.$config.baseURL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'SiteNavigationElement',
            position: 1,
            name: 'Home',
            description: 'Home of Bookshelves',
            url: `${this.$config.baseURL}/`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 2,
            name: 'Books',
            description: 'List of all books',
            url: `${this.$config.baseURL}/books`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 3,
            name: 'Series',
            description: 'List of all series',
            url: `${this.$config.baseURL}/series`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 4,
            name: 'Authors',
            description: 'List of all authors',
            url: `${this.$config.baseURL}/authors`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 5,
            name: 'Guides',
            description: 'List of guides',
            url: `${this.$config.baseURL}/guides`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 6,
            name: 'Search',
            description: 'Search books, series or authors',
            url: `${this.$config.baseURL}/search`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 7,
            name: 'Contact',
            description: 'Contact us',
            url: `${this.$config.baseURL}/contact`,
          },
        ],
      },
    }
  },
}
</script>
