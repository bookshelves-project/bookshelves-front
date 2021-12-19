<template>
  <main class="main-content">
    <app-header
      :title="author.name"
      :image="author.cover ? author.cover.thumbnail : null"
      :subtitle="`${author.count} eBooks`"
      :cta="author.link"
      :text="author.description"
      :entity="author"
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
      <section v-if="series.length">
        <blocks-divider> {{ series.length }} Series </blocks-divider>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="(serie, id) in series"
            :key="id"
            :data="serie"
            :cover="serie.cover ? serie.cover.thumbnail : null"
            :color="serie.cover ? serie.cover.color : null"
            :title="serie.title"
            :route="{
              name: 'series-author-slug',
              params: { author: serie.meta.author, slug: serie.meta.slug },
            }"
          >
            <template #title>
              <span class="line-clamp-2">
                {{ serie.title }}
              </span>
            </template>
            <template v-if="serie.count" #subtitle>
              {{ serie.count }} books
            </template>
            <template v-if="serie.language" #extra>
              {{ formatLanguage(serie.language) }}
            </template>
          </entity-card>
        </div>
        <div class="mt-14 mb-5">
          <!-- <load-more
            :last-page="series.meta.last_page"
            :endpoint="`authors/series/${$route.params.slug}`"
            :entities="series.data"
            @load="loadSeries"
          /> -->
        </div>
      </section>
      <section v-if="books.length">
        <blocks-divider class="mt-16">
          {{ books.length }} Books
        </blocks-divider>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="(book, id) in books"
            :key="id"
            :data="book"
            :cover="book.cover?.thumbnail"
            :color="book.cover?.color"
            :title="book.title"
            :route="{
              name: 'books-author-slug',
              params: { author: book.meta.author, slug: book.meta.slug },
            }"
          >
            <template #title>
              <span class="line-clamp-2">
                {{ book.title }}
              </span>
            </template>
            <template v-if="book.serie" #subtitle>
              {{ book.serie?.title }},
              <br />
              vol. {{ book.volume }}
            </template>
            <template v-if="book.language" #extra>
              {{ formatLanguage(book.language) }}
            </template>
          </entity-card>
        </div>
        <div class="mt-14 mb-5">
          <!-- <load-more
            :last-page="books.meta.last_page"
            :endpoint="`authors/books/${$route.params.slug}`"
            :entities="books.data"
            @load="loadBooks"
          /> -->
        </div>
      </section>
    </div>
    <blocks-comments-template :entity="author" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useIndexStore } from '~/stores'
import {
  ApiEndpoint,
  Application,
  Author,
  Book,
  MetaInfo,
  Serie,
} from '~/types'
import { getHostname, formatLanguage } from '~/utils/methods'
import EntityCard from '~/components/blocks/entity-card.vue'

@Component({
  async asyncData({ $repository, params, query }) {
    const [api, seriesApi, booksApi] = await Promise.all([
      $repository(ApiEndpoint.Author).show<Author>(params.slug),
      $repository(ApiEndpoint.AuthorSerie).index<Book[]>(
        {
          page: (query.page as string) || '1',
          perPage: '32',
          ...query,
        },
        params.slug
      ),
      $repository(ApiEndpoint.AuthorBook).index<Serie[]>(
        {
          page: (query.page as string) || '1',
          perPage: '32',
          ...query,
        },
        params.slug
      ),
    ])

    const store = useIndexStore()
    const application = store.application as Application

    const author = api.data
    const title = `${author.name}`
    const description = `${author.name} author on ${application.name} with ${author.count} books available.`

    return {
      author,
      series: seriesApi.data,
      books: booksApi.data,
      title,
      description,
    }
  },
  head(this: PageAuthorsSlug): MetaInfo {
    return {
      title: this.title,
      meta: this.$metadata({
        title: this.title,
        type: 'profile',
        description: this.description,
        image: this.author.cover?.og,
        profileFirstName: this.author.firstname,
        profileLastName: this.author.firstname,
      }),
    }
  },
  methods: {
    getHostname,
    formatLanguage,
  },
  components: {
    EntityCard,
  },
})
export default class PageAuthorsSlug extends Vue {
  author!: Author
  series!: Serie[]
  books!: Book[]

  getHostname!: typeof getHostname
  formatLanguage!: typeof formatLanguage

  title!: string
  description!: string

  loadSeries(data: any) {
    this.series = data
  }

  loadBooks(data: any) {
    this.books = data
  }

  // this.breadcrumbs = [
  //       {
  //         url: this.$config.baseURL,
  //         text: 'Home',
  //       },
  //       {
  //         url: `${this.$config.baseURL}/authors`,
  //         text: 'Authors',
  //       },
  //       {
  //         url: `${this.$config.baseURL}/authors/${this.$route.params.slug}`,
  //         text: this.author.name,
  //       },
  //     ]
  // jsonld() {
  //   const items = this.breadcrumbs.map((item, index) => ({
  //     '@type': 'ListItem',
  //     position: index + 1,
  //     item: {
  //       '@id': item.url,
  //       name: item.text,
  //     },
  //   }))
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'WebPage',
  //     itemListElement: items,
  //     mainEntity: {
  //       '@type': 'Person',
  //       image: this.author.cover.thumbnail,
  //       jobTitle: 'Author',
  //       name: this.author.name,
  //       url: this.author.link,
  //     },
  //   }
}
</script>
