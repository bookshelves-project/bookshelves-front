<template>
  <div>
    <lazy-hydrate when-idle>
      <div>
        <lazy-blocks-home-hero class="pt-5" />
        <lazy-blocks-home-statistics />
        <lazy-blocks-home-cloud-logos />
        <lazy-blocks-selected-entities class="mt-8 lg:mt-16">
          <template #ontitle> Want to read a good book? </template>
          <template #title> Selection of books & series </template>
          <template #text>
            If you search a new book to read, check this selection of eBooks by
            the {{ $config.appName }} Team.
          </template>
        </lazy-blocks-selected-entities>
        <lazy-blocks-home-features />
        <lazy-blocks-selected-entities
          endpoint="/books/latest"
          orientation="text-right"
          class="mb-8 lg:mb-16"
        >
          <template #ontitle> Hyped by new books? </template>
          <template #title> Latest books & series </template>
          <template #text>
            You check new books & series on {{ $config.appName }}? Here you have
            latest books!
          </template>
        </lazy-blocks-selected-entities>
        <lazy-blocks-home-features-highlight />
        <!-- <lazy-blocks-home-pricing /> -->
        <app-img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
          class="h-56 object-cover rounded-md mb-5 w-1/2"
          title="Title"
          alt="alt image"
          legend="Legend"
        />
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
