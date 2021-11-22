<template>
  <div>
    <lazy-blocks-home-hero class="pt-5" />
    <lazy-blocks-home-statistics />
    <lazy-blocks-home-cloud-logos />
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
    <lazy-blocks-home-cta />
  </div>
</template>

<script setup lang="ts">
import { ref, useAsync, useContext } from '@nuxtjs/composition-api'

const ctx = useContext()
const title: string = `${ctx.$config.appName}, your digital library`
const a = ref<Array<string>>(['a'])

const homePage = useAsync(async () => {
  try {
    const { data } = await ctx.$axios.get(
      'http://localhost:8000/api/cms/home-page'
    )

    return data.data
  } catch (error) {
    return {}
  }
})

const current = ref<boolean>(true)
const message = ref<String>('data')

function update() {
  if (current.value) {
    message.value = 'data'
  } else {
    message.value = 'New data'
  }
  current.value = !current.value
}

const head = () => {
  return {
    title: title,
    titleTemplate: '',
  }
}
const jsonld = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: `${ctx.$config.baseURL}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ctx.$config.baseURL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'Home',
          description: `Home of ${ctx.$config.appName}`,
          url: `${ctx.$config.baseURL}/`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'Books',
          description: 'List of all books',
          url: `${ctx.$config.baseURL}/books`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Series',
          description: 'List of all series',
          url: `${ctx.$config.baseURL}/series`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: 'Authors',
          description: 'List of all authors',
          url: `${ctx.$config.baseURL}/authors`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: 'Guides',
          description: 'List of guides',
          url: `${ctx.$config.baseURL}/guides`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 6,
          name: 'Search',
          description: 'Search books, series or authors',
          url: `${ctx.$config.baseURL}/search`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 7,
          name: 'Contact',
          description: 'Contact us',
          url: `${ctx.$config.baseURL}/contact`,
        },
      ],
    },
  }
}
</script>
