<template>
  <main class="main-content">
    <div>
      <div class="items-center justify-between mb-3 lg:flex">
        <div class="items-center lg:flex">
          <img
            :src="author.cover ? author.cover.thumbnail : null"
            :alt="author.name"
            loading="lazy"
            class="
              object-cover object-center
              w-32
              h-32
              mx-auto
              rounded-md
              lg:w-16 lg:h-16 lg:mx-0
            "
          />
          <div class="flex mt-6 lg:mt-0">
            <div class="flex items-center mx-auto">
              <h1
                class="
                  mt-2
                  ml-4
                  text-3xl
                  font-semibold
                  text-center
                  lg:mt-0
                  font-handlee
                  lg:text-left
                "
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
        </div>
        <div class="flex mt-5 lg:mt-0">
          <app-button :href="author.download" color="primary" class="mx-auto">
            <div class="flex items-center">
              <svg-icon name="download" class="w-5 h-5" />
              <div class="flex items-center ml-1">
                <div class="flex mx-1">
                  <span class="lg:mr-1">Download</span>
                  <span class="hidden md:block">{{ author.count }} eBooks</span>
                </div>
                <div>(ZIP {{ author.size }})</div>
              </div>
            </div>
          </app-button>
        </div>
      </div>
      <div
        v-if="author.description"
        class="max-w-full pt-2 mb-8 prose word-wraping dark:text-gray-100"
      >
        <p class="italic line-clamp-6">
          {{ author.description }}
        </p>
        <div v-if="author.link" class="pt-1 text-right">
          To have more informations:
          <a :href="author.link" target="_blank" rel="noopener noreferrer">{{
            getHostname(author.link)
          }}</a>
        </div>
      </div>
      <section v-if="series.data.length">
        <divider> Series </divider>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="serie in series.data"
            :key="serie.id"
            :data="serie"
            :cover="serie.cover ? serie.cover.thumbnail : null"
            :color="serie.cover ? serie.cover.color : null"
            :title="serie.title"
            :route="{
              name: 'series-author-slug',
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
        <div class="mt-14 mb-5">
          <load-more
            :last-page="series.meta.last_page"
            :endpoint="`authors/series/${$route.params.slug}`"
            :entities="series.data"
            @load="loadSeries"
          />
        </div>
      </section>
      <section v-if="books.data.length">
        <divider class="mt-16"> Books </divider>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="book in books.data"
            :key="book.id"
            :data="book"
            :cover="book.cover.thumbnail"
            :color="book.cover.color"
            :title="book.title"
            :route="{
              name: 'books-author-slug',
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
        <div class="mt-14 mb-5">
          <load-more
            :last-page="books.meta.last_page"
            :endpoint="`authors/books/${$route.params.slug}`"
            :entities="books.data"
            @load="loadBooks"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import qs from 'qs'
import entityCard from '~/components/blocks/entity-card.vue'
import Divider from '~/components/special/divider.vue'
import favorites from '~/mixins/favorites'
import { formatLanguage, getHostname } from '~/plugins/utils/methods'
import LoadMore from '~/components/special/load-more.vue'
import AppButton from '~/components/app/button.vue'

export default {
  name: 'AuthorsSlug',
  components: { entityCard, Divider, LoadMore, AppButton },
  mixins: [favorites],
  async asyncData({ app, params, query }) {
    const page = query.page
    const [author, series, books] = await Promise.all([
      app.$axios.$get(`/authors/${params.slug}`),
      app.$axios.$get(
        `/authors/series/${params.slug}?${qs.stringify({
          page: page || 1,
          'per-page': 32,
        })}`
      ),
      app.$axios.$get(
        `/authors/books/${params.slug}?${qs.stringify({
          page: page || 1,
          'per-page': 32,
          standalone: true,
        })}`
      ),
    ])

    return {
      author: author.data,
      series,
      books,
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
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = `${this.author.name}`
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          type: 'profile',
          description: `${this.author.name} author on ${this.$config.appName} with ${this.author.count} books available.`,
          image: this.author.cover.og,
          url: this.$nuxt.$route.path,
          profileFirstName: this.author.firstname,
          profileLastName: this.author.firstname,
        }),
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
  methods: {
    loadSeries(data) {
      this.series.data = data
    },
    loadBooks(data) {
      this.books.data = data
    },
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
        image: this.author.cover.thumbnail,
        jobTitle: 'Author',
        name: this.author.name,
        url: this.author.link,
      },
    }
  },
}
</script>
