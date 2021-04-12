<template>
  <main class="container max-w-7xl">
    <div>
      <div class="items-center justify-between mb-3 lg:flex">
        <div class="items-center lg:flex">
          <!-- <nuxt-picture
          :src="author.picture"
          :alt="author.name"
          class="object-cover object-center w-32 h-32 mx-auto rounded-full"
          placeholder="/images/author-no-cover.png"
        /> -->
          <img
            v-lazy="author.picture ? author.picture.base : null"
            :alt="author.name"
            class="object-cover object-center w-32 h-32 mx-auto rounded-full lg:w-16 lg:h-16 lg:mx-0"
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
              @click="toggleFavorite('author')"
            >
              <icon-heart
                title="Favorite"
                class="text-red-600"
                :is-full="isFavorite"
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
        <div v-if="author.wikipediaLink" class="pt-1 text-right">
          To have more informations:
          <a
            :href="author.wikipediaLink"
            target="_blank"
            rel="noopener noreferrer"
            >Wikipedia</a
          >
        </div>
      </div>
      <divider>
        {{ author.series ? author.series.length : null }} Series
      </divider>
      <div v-if="author.series" class="space-y-6 display-grid sm:space-y-0">
        <entity-card
          v-for="serie in author.series"
          :key="serie.id"
          :data="serie"
          :cover="serie.picture ? serie.picture.base : null"
          :route="{
            name: 'series-slug',
            params: { author: author.slug, slug: serie.slug },
          }"
        >
          <template #primary>
            {{ $overflow(serie.title, 50) }}
          </template>
          <template v-if="serie.count" #secondary>
            {{ serie.count }} books
          </template>
          <template v-if="serie.language" #tertiary>
            {{ $getLanguage(serie.language) }}
          </template>
        </entity-card>
      </div>
      <divider class="mt-16"> {{ author.count }} Books </divider>
      <div class="space-y-6 display-grid sm:space-y-0">
        <entity-card
          v-for="book in author.books"
          :key="book.id"
          :data="book"
          :cover="book.picture.base"
          :route="{
            name: 'books-slug',
            params: { author: book.author, slug: book.slug },
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
            {{ $getLanguage(book.language) }}
          </template>
        </entity-card>
      </div>
    </div>
  </main>
</template>

<script>
import entityCard from '~/components/blocks/entity-card.vue'
import Divider from '~/components/special/divider.vue'
import favorites from '~/mixins/favorites'
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'AuthorsSlug',
  components: { entityCard, Divider },
  mixins: [favorites],
  async asyncData({ app, params }) {
    try {
      const [author] = await Promise.all([
        app.$axios.$get(`/authors/${params.slug}`),
      ])

      return {
        author: author.data,
      }
    } catch (error) {
      console.error(error)

      return {
        author: {},
      }
    }
  },
  data() {
    return {
      componentKey: 0,
      breadcrumbs: [],
    }
  },
  head() {
    const title = `${this.author.name} - Authors`
    const url = `${process.env.BASE_URL}/authors/${this.author.slug}`
    const dynamicMeta = dynamicMetadata({
      type: 'profile',
      title,
      description: `${this.author.name} author on Bookshelves with ${this.author.count} books available.`,
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
        url: process.env.BASE_URL,
        text: 'Home',
      },
      {
        url: `${process.env.BASE_URL}/authors`,
        text: 'Authors',
      },
      {
        url: `${process.env.BASE_URL}/authors/${this.$route.params.slug}`,
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
        url: this.author.wikipediaLink,
      },
    }
  },
}
</script>
