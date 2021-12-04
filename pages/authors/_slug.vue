<template>
  <main class="main-content">
    <app-header
      :title="author.name"
      :image="author.cover ? author.cover.thumbnail : null"
      :subtitle="`${author.count} eBooks`"
      :cta="author.link"
      :text="author.description"
      :entity="author"
      :border="false"
      favorite
    >
      <blocks-button-download
        :href="author.download"
        :size="author.size"
        :type="`ZIP`"
      >
        {{ author.count }} eBooks
      </blocks-button-download>
    </app-header>
    <div>
      <section v-if="series.data.length">
        <blocks-divider> Series </blocks-divider>
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
              {{ formatLanguage(serie.language).label }}
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
        <blocks-divider class="mt-16">
          Books
        </blocks-divider>
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
              {{ formatLanguage(book.language).label }}
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
    <blocks-comments-template :entity="author" />
  </main>
</template>

<script>
import qs from 'qs'
import entityCard from '~/components/blocks/entity-card.vue'
import favorites from '~/mixins/favorites'
import { formatLanguage, getHostname } from '~/plugins/utils/methods'
import LoadMore from '~/components/special/load-more.vue'

export default {
  name: 'AuthorsSlug',
  components: { entityCard, LoadMore },
  mixins: [favorites],
  async asyncData({ app, params, query }) {
    const page = query.page
    const [author, series, books] = await Promise.all([
      app.$axios.$get(`/authors/${params.slug}`),
      app.$axios.$get(
        `/authors/series/${params.slug}?${qs.stringify({
          page: page || 1,
          perPage: 32
        })}`
      ),
      app.$axios.$get(
        `/authors/books/${params.slug}?${qs.stringify({
          page: page || 1,
          perPage: 32,
          standalone: true
        })}`
      )
    ])

    return {
      author: author.data,
      series,
      books
    }
  },
  data() {
    return {
      formatLanguage,
      getHostname,
      breadcrumbs: []
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = `${this.author.name}`
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          type: 'profile',
          description: `${this.author.name} author on ${this.$config.appName} with ${this.author.count} books available.`,
          image: this.author.cover.og,
          url: this.$nuxt.$route.path,
          profileFirstName: this.author.firstname,
          profileLastName: this.author.firstname
        })
      ]
    }
  },
  created() {
    this.breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home'
      },
      {
        url: `${this.$config.baseURL}/authors`,
        text: 'Authors'
      },
      {
        url: `${this.$config.baseURL}/authors/${this.$route.params.slug}`,
        text: this.author.name
      }
    ]
  },
  methods: {
    loadSeries(data) {
      this.series.data = data
    },
    loadBooks(data) {
      this.books.data = data
    }
  },
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text
      }
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
        url: this.author.link
      }
    }
  }
}
</script>
