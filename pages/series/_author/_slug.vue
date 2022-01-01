<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  ApiEndpoint,
  ApiMeta,
  ApiPaginateResponse,
  Book,
  MetaInfo,
  Serie,
} from '~/types'
import { formatLanguage, formatAuthors } from '@/utils/methods'

@Component({
  async asyncData({ $repository, params, query }) {
    const [api, booksApi] = await Promise.all([
      $repository(ApiEndpoint.Serie).show<Serie>([params.author, params.slug]),
      $repository(ApiEndpoint.SerieBook).index<Book>(
        {
          page: (query.page as string) || '1',
          perPage: '32',
        },
        [params.author, params.slug]
      ),
    ])

    const serie = api.data
    const authors = formatAuthors(serie.authors)
    const title = `${serie.title} by ${authors}`
    const description = `Written by ${authors} with ${serie.count} books.`

    return {
      serie,
      books: booksApi.data,
      meta: booksApi.meta,
      title,
      description,
      authors,
    }
  },
  head(this: PageSerieSlug) {
    return this.$metadata({
      title: this.title,
      description: this.description,
    })
  },
  methods: {
    formatLanguage,
    formatAuthors,
  },
  watchQuery: ['page'],
})
export default class PageSerieSlug extends Vue {
  title!: string
  description!: string
  authors!: string

  formatLanguage!: typeof formatLanguage
  formatAuthors!: typeof formatAuthors
  apiEndpoint!: typeof ApiEndpoint

  serie!: Serie
  books!: Book[]
  meta!: ApiMeta
  booksEndpoint = ApiEndpoint.SerieBook

  loadBooks(api: ApiPaginateResponse<Book>) {
    this.books = [...this.books, ...api.data]
    this.meta = api.meta
  }

  // jsonld() {
  //     const breadcrumbs = [
  //       {
  //         url: this.$config.baseURL,
  //         text: 'Home'
  //       },
  //       {
  //         url: `${this.$config.baseURL}/series`,
  //         text: 'Series'
  //       },
  //       {
  //         url: `${this.$config.baseURL}/series/${this.$route.params.author}/${this.$route.params.slug}`,
  //         text: this.entity.title
  //       }
  //     ]
  //     const authors = this.entity.authors.map((author, index) => ({
  //       '@type': 'Person',
  //       familyName: author.lastname,
  //       givenName: author.firstname,
  //       name: author.name,
  //       url: `${this.$config.baseURL}/authors/${author.meta.slug}`
  //     }))

  //     const items = breadcrumbs.map((item, index) => ({
  //       '@type': 'ListItem',
  //       position: index + 1,
  //       item: {
  //         '@id': item.url,
  //         name: item.text
  //       }
  //     }))
  //     return {
  //       '@context': 'https://schema.org',
  //       '@type': 'WebPage',
  //       itemListElement: items,
  //       mainEntity: {
  //         '@type': 'BookSeries',
  //         author: authors,
  //         bookFormat: 'http://schema.org/BookSeries',
  //         image: this.entity.cover.thumbnail,
  //         inLanguage: formatLanguage(this.entity.language),
  //         name: this.entity.title
  //       }
  //     }
  //   }
}
</script>

<template>
  <main v-if="serie" class="main-content">
    <app-header
      :title="serie.title"
      :image="serie.cover?.thumbnail"
      :color="serie.cover?.color"
      :subtitle="`${serie.count} eBooks`"
      :authors="serie.authors"
      :cta="serie.link"
      :text="serie.description"
      :entity="serie"
      favorite
    >
      <app-button :href="serie.download" color="primary" icon="download">
        Download {{ serie.count }} eBooks (ZIP {{ serie.size }})
      </app-button>
      <div class="mt-2 text-right">
        Language: {{ formatLanguage(serie.language) }}
      </div>
      <template #content>
        <block-tags-links :tags="serie.tags" />
      </template>
    </app-header>
    <div>
      <block-divider> {{ serie.count }} Books </block-divider>
      <div v-if="books" class="space-y-6 display-grid sm:space-y-0">
        <block-entity-card
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
          <template #subtitle>{{ formatAuthors(book.authors) }}</template>
          <template #extra>Vol. {{ book.volume }}</template>
        </block-entity-card>
      </div>
      <div class="mt-6 mb-5">
        <block-pagination-load
          :meta="meta"
          :endpoint="booksEndpoint"
          @load="loadBooks"
        />
      </div>
    </div>
    <block-comments-template :entity="serie" />
  </main>
</template>
