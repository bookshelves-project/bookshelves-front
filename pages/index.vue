<template>
  <div>
    <lazy-hydrate when-idle>
      <div>
        <lazy-blocks-home-hero class="pt-5" />
        <lazy-blocks-home-statistics />
        <lazy-blocks-home-cloud-logos />
        <lazy-blocks-selected-entities
          class="mt-8 lg:mt-16"
          eyebrow="Want to read a good book?"
          title="Selection of books & series"
        >
          If you search a new book to read, check this selection of eBooks by
          the {{ $config.appName }} Team.
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
        <!-- <lazy-blocks-home-pricing /> -->
        <lazy-blocks-home-cta />
      </div>
    </lazy-hydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  name: 'Home',
  components: {
    LazyHydrate,
  },
  auth: 'auth',
  layout: 'auth',
  data() {
    return {
      pinnedProjectDropdownOpened: false,
      projectDropdownOpened: false,
      title: `${this.$config.appName}, your digital library`,
    }
  },
  head() {
    return {
      title: this.title,
      titleTemplate: '',
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
            description: `Home of ${this.$config.appName}`,
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
