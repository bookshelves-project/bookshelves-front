<template>
  <main class="container max-w-7xl">
    <div>
      <div class="items-center justify-between mb-3 lg:flex">
        <div class="items-center lg:flex">
          <img
            :src="author.picture ? author.picture.base : null"
            :alt="author.name"
            loading="lazy"
            class="object-cover object-center w-32 h-32 mx-auto rounded-md lg:w-16 lg:h-16 lg:mx-0"
          />
          <div class="flex items-center">
            <h1
              class="mt-2 ml-4 text-3xl font-semibold text-center lg:mt-0 font-handlee lg:text-left"
            >
              {{ author.name }}
            </h1>
            <button
              v-if="$auth.$state.loggedIn"
              class="ml-3"
              type="button"
              aria-label="Favorite"
              @click="toggleFavorite('author')"
            >
              <svg-icon
                name="heart"
                :class="isFavorite ? 'text-red-600' : 'text-gray-600'"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
        <div class="flex mt-5 lg:mt-0">
          <a
            :href="author.download"
            class="inline-flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-300 border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-600 sm:w-max"
          >
            <svg-icon name="download" class="w-5 h-5" />
            <div class="flex items-center ml-1">
              <div class="flex mx-1">
                <span class="lg:mr-1">Download</span>
                <span class="hidden md:block">{{ author.count }} eBooks</span>
              </div>
              <div>(ZIP {{ author.size }})</div>
            </div>
          </a>
        </div>
      </div>
      <div
        v-if="author.description"
        class="max-w-full pt-2 mb-8 prose word-wraping"
      >
        <p class="italic">
          {{ author.description }}
        </p>
        <div v-if="author.link" class="pt-1 text-right">
          To have more informations:
          <a :href="author.link" target="_blank" rel="noopener noreferrer">{{
            getHostname(author.link)
          }}</a>
        </div>
      </div>
      <divider v-if="series.length">
        {{ series ? series.length : null }} Series
      </divider>
      <div v-if="series.length" class="space-y-6 display-grid sm:space-y-0">
        <entity-card
          v-for="serie in series"
          :key="serie.id"
          :data="serie"
          :cover="serie.picture ? serie.picture.base : null"
          :color="serie.picture ? serie.picture.color : null"
          :title="serie.title"
          :route="{
            name: 'series-slug',
            params: { author: serie.meta.author, slug: serie.meta.slug },
          }"
        >
          <template #primary>
            {{ $overflow(serie.title, 50) }}
          </template>
          <template v-if="serie.count" #secondary>
            {{ serie.count }} books
          </template>
          <template v-if="serie.language" #tertiary>
            {{ formatLanguage(serie.language) }}
          </template>
        </entity-card>
      </div>
      <divider v-if="books.length" class="mt-16">
        {{ books.length }} Books
      </divider>
      <div class="space-y-6 display-grid sm:space-y-0">
        <entity-card
          v-for="book in books"
          :key="book.id"
          :data="book"
          :cover="book.picture.base"
          :color="book.picture.color"
          :title="book.title"
          :route="{
            name: 'books-slug',
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
        >
          <template #primary>
            {{ $overflow(book.title, 50) }}
          </template>
          <template v-if="book.serie" #secondary>
            {{ book.serie.title }},<br />
            vol. {{ book.volume }}
          </template>
          <template v-if="book.language" #tertiary>
            {{ formatLanguage(book.language) }}
          </template>
        </entity-card>
      </div>
    </div>
  </main>
</template>

<script>
import qs from 'qs'
import entityCard from '~/components/blocks/entity-card.vue'
import Divider from '~/components/special/divider.vue'
import favorites from '~/mixins/favorites'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'
import { formatLanguage, getHostname } from '~/plugins/utils/methods'

export default {
  name: 'AuthorsSlug',
  components: { entityCard, Divider },
  mixins: [favorites],
  async asyncData({ app, params }) {
    const [author, series, books] = await Promise.all([
      app.$axios.$get(`/authors/${params.slug}`),
      app.$axios.$get(`/authors/series/${params.slug}`),
      app.$axios.$get(
        `/authors/books/${params.slug}?${qs.stringify({
          standalone: true,
        })}`
      ),
    ])

    return {
      author: author.data,
      series: series.data,
      books: books.data,
    }
  },
  data() {
    return {
      formatLanguage,
      getHostname,
      breadcrumbs: [],
    }
  },
  head() {
    const title = `${this.author.name}`
    const url = `${this.$config.baseURL}/${this.$nuxt.$route.path}`
    const dynamicMeta = dynamicMetadata({
      type: 'profile',
      title,
      description: `${this.author.name} author on ${this.$config.appName} with ${this.author.count} books available.`,
      url,
      image: this.author.picture.openGraph,
    })
    return {
      title,
      meta: [
        ...dynamicMeta,
        {
          hid: 'profile:first_name',
          property: 'profile:first_name',
          content: this.author.firstname,
        },
        {
          hid: 'profile:last_name',
          property: 'profile:last_name',
          content: this.author.firstname,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  created() {
    this.breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/authors`,
        text: 'Authors',
      },
      {
        url: `${this.$config.baseURL}/authors/${this.$route.params.slug}`,
        text: this.author.name,
      },
    ]
  },
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
      mainEntity: {
        '@type': 'Person',
        image: this.author.picture.base,
        jobTitle: 'Author',
        name: this.author.name,
        url: this.author.link,
      },
    }
  },
}
</script>
