<template>
  <main class="container max-w-7xl">
    <div>
      <div class="items-center justify-between mb-8 lg:flex">
        <div class="items-center lg:flex">
          <img
            v-lazy="serie.picture.base"
            :alt="serie.title"
            loading="lazy"
            class="object-cover object-center w-32 h-32 mx-auto rounded-full lg:w-16 lg:h-16 lg:mx-0"
          />
          <div class="ml-4">
            <div class="flex items-center">
              <h1
                class="text-3xl font-semibold text-center font-handlee lg:text-left"
              >
                {{ serie.title }}
              </h1>
              <button
                v-if="$auth.$state.loggedIn"
                class="ml-3"
                type="button"
                aria-label="Favorite"
                @click="toggleFavorite('serie')"
              >
                <svg-icon
                  name="heart"
                  :class="isFavorite ? 'text-red-600' : 'text-gray-600'"
                  class="w-5 h-5"
                />
              </button>
            </div>
            <div class="mt-2 text-center lg:text-left lg:mt-0">
              <span
                v-for="(author, authorId) in serie.authors"
                :key="authorId"
                class="mr-1"
              >
                <nuxt-link
                  :to="{ name: 'authors-slug', params: { slug: author.slug } }"
                  class="text-gray-900 border-b border-gray-600 dark:border-gray-100 hover:text-gray-500 hover:border-gray-500"
                  >{{ author.name }}</nuxt-link
                >
                <span
                  v-if="
                    serie.authors.length > 1 &&
                    authorId !== serie.authors.length - 1
                  "
                  class="text-gray-900 dark:text-gray-100"
                  >&</span
                >
              </span>
            </div>
          </div>
        </div>
        <div class="block mt-5 lg:block lg:mt-0">
          <div class="flex">
            <a
              :href="serie.download"
              class="inline-flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-300 border border-transparent rounded-md shadow-sm bg-primary-600 lg:mx-0 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-600 sm:w-max"
            >
              <svg-icon name="download" class="w-5 h-5" />
              <div class="flex items-center ml-1">
                <div class="mx-1">Download</div>
                <div class="hidden lg:mr-1 lg:block">
                  {{ serie.title }}
                </div>
                <div>(ZIP {{ serie.size }})</div>
              </div>
            </a>
          </div>
          <div class="flex mx-auto lg:ml-auto lg:mr-0 w-max">
            <div
              v-if="serie.language"
              class="flex mt-2 w-max lg:ml-auto lg:mx-0 md:items-center lg:flex md:justify-end md:mx-0"
            >
              <span class="font-semibold text-gray-900 dark:text-gray-100"
                >Language :
              </span>
              <img
                :src="getLanguageFlag(serie.language)"
                :alt="serie.language"
                loading="lazy"
                class="ml-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="serie.tags.length" class="flex">
        <h2 class="mr-1">Tags:</h2>
        <ul>
          <li v-for="(tag, id) in serie.tags" :key="id" class="inline-block">
            <span>{{ tag.name }}</span
            ><span
              v-if="serie.tags.length > 1 && id !== serie.tags.length - 1"
              class="mr-1 text-gray-900 dark:text-gray-100"
              >,</span
            >
          </li>
        </ul>
      </div>
      <div
        v-if="serie.description"
        class="max-w-full pt-2 mb-8 prose word-wraping"
      >
        <p class="italic">
          {{ serie.description }}
        </p>
        <div v-if="serie.wikipediaLink" class="pt-1 text-right">
          To have more informations:
          <a
            :href="serie.wikipediaLink"
            target="_blank"
            rel="noopener noreferrer"
            >Wikipedia</a
          >
        </div>
      </div>
      <div class="relative mt-5 mb-10">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-2 text-gray-500 bg-white dark:bg-gray-900">
            {{ serie.books.length }} Books
          </span>
        </div>
      </div>
      <div class="space-y-6 display-grid sm:space-y-0">
        <entity-card
          v-for="book in serie.books"
          :key="book.id"
          :data="book"
          :cover="book.picture.base"
          :title="book.title"
          :route="{
            name: 'books-slug',
            params: { author: book.author, slug: book.slug },
          }"
        >
          <template #primary>
            {{ $overflow(book.title, 50) }}
          </template>
          <template #secondary>
            <span v-for="(author, authorId) in book.authors" :key="authorId">
              {{ author.name }}
              <span
                v-if="
                  book.authors.length > 1 &&
                  authorId !== book.authors.length - 1
                "
              >
                ,
              </span>
            </span>
          </template>
          <template #tertiary> Vol. {{ book.volume }} </template>
        </entity-card>
      </div>
    </div>
  </main>
</template>

<script>
import entityCard from '~/components/blocks/entity-card.vue'
import favorites from '~/mixins/favorites'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'

import {
  getLanguageFlag,
  getLanguage,
  getAuthors,
} from '~/plugins/utils/methods'

export default {
  name: 'SeriesSlug',
  components: { entityCard },
  mixins: [favorites],
  async asyncData({ app, params }) {
    try {
      const [serie] = await Promise.all([
        app.$axios.$get(`/series/${params.author}/${params.slug}`),
      ])

      return {
        serie: serie.data,
      }
    } catch (error) {
      console.error(error)

      return {
        serie: {},
      }
    }
  },
  data() {
    return {
      getLanguageFlag,
      getLanguage,
      getAuthors,
    }
  },
  head() {
    const title = `${this.serie.title} by ${this.authors}`
    const url = `${this.$config.baseURL}/series/${this.serie.author}/${this.serie.slug}`
    const dynamicMeta = dynamicMetadata({
      type: 'book',
      title,
      description: `Written by ${this.authors} with ${this.serie.count} books.`,
      url,
      image: this.serie.picture.openGraph,
    })
    return {
      title,
      meta: [...dynamicMeta],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  computed: {
    authors() {
      return getAuthors(this.serie.authors)
    },
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/series`,
        text: 'Series',
      },
      {
        url: `${this.$config.baseURL}/series/${this.$route.params.author}/${this.$route.params.slug}`,
        text: this.serie.title,
      },
    ]
    const authors = this.serie.authors.map((author, index) => ({
      '@type': 'Person',
      familyName: author.lastname,
      givenName: author.firstname,
      name: author.name,
      url: `${this.$config.baseURL}/authors/${author.slug}`,
    }))

    const items = breadcrumbs.map((item, index) => ({
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
        '@type': 'BookSeries',
        author: authors,
        bookFormat: 'http://schema.org/BookSeries',
        image: this.serie.picture.base,
        inLanguage: getLanguage(this.serie.language.slug),
        name: this.serie.title,
      },
    }
  },
}
</script>
