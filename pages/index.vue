<template>
  <div>
    <hero />
    <statistics />
    <cloud-logos />
    <highlight-books />
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
import HighlightBooks from '~/components/blocks/highlight-books.vue'
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
    HighlightBooks,
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
          href: `${process.env.BASE_URL}/`,
        },
      ],
    }
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${process.env.BASE_URL}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.BASE_URL}/search?q={search_term_string}`,
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
            url: `${process.env.BASE_URL}/`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 2,
            name: 'Books',
            description: 'List of all books',
            url: `${process.env.BASE_URL}/books`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 3,
            name: 'Series',
            description: 'List of all series',
            url: `${process.env.BASE_URL}/series`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 4,
            name: 'Authors',
            description: 'List of all authors',
            url: `${process.env.BASE_URL}/authors`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 5,
            name: 'Guides',
            description: 'List of guides',
            url: `${process.env.BASE_URL}/guides`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 6,
            name: 'Search',
            description: 'Search books, series or authors',
            url: `${process.env.BASE_URL}/search`,
          },
          {
            '@type': 'SiteNavigationElement',
            position: 7,
            name: 'Contact',
            description: 'Contact us',
            url: `${process.env.BASE_URL}/contact`,
          },
        ],
      },
    }
  },
}
</script>
