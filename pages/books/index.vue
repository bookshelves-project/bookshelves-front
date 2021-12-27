<template>
  <main class="main-content relative">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <blocks-filters has-serie languages :sort="sortOptions" paginate />
      </template>
    </app-header>

    <div role="list" class="display-grid">
      <EntityCard
        v-for="(book, id) in books"
        :key="id"
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
        <template #subtitle>
          <span>{{ formatAuthors(book.authors) }}</span>
        </template>
        <template #extra>
          <span v-if="book.serie" class="italic">
            {{ book.serie.title }},
            <br />
            vol. {{ book.volume }}
          </span>
          <span class="mt-1 block">
            {{ formatLanguage(book.language) }}
          </span>
        </template>
      </EntityCard>
    </div>

    <div class="mt-14 mb-5">
      <!-- <Pagination
        v-if="meta"
        :current-page="meta.current_page"
        :per-page="meta.per_page"
        :total="meta.total"
      />-->
      <Pagination
        v-if="meta"
        :current-page="meta.current_page"
        :pages="meta.last_page"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { useIndexStore } from '~/stores'
import { ApiEndpoint, ApiMeta, Application, Book } from '~/types'
import { formatLanguage, formatAuthors } from '@/utils/methods'
import EntityCard from '~/components/blocks/entity-card.vue'
import Pagination from '~/components/blocks/pagination.vue'
import { useApplicationStore } from '~/stores/application'

@Component({
  async asyncData({ query, $repository }) {
    const api = await $repository(ApiEndpoint.Book).index<Book>({
      page: (query.page as string) || '1',
      perPage: '32',
      ...query,
    })
    const store = useApplicationStore()
    const application = store.application as Application
    const title = `All books available on ${application.name}`

    return {
      books: api.data,
      meta: api.meta,
      application,
      title,
    }
  },
  head(this: PageBooksIndex) {
    return this.$metadata({
      title: this.title,
      description: this.description,
    })
  },
  watchQuery: ['page', 'filter[disallow_serie]', 'filter[languages]', 'sort'],
  methods: {
    formatLanguage,
    formatAuthors,
  },
  components: {
    EntityCard,
    Pagination,
  },
})
export default class PageBooksIndex extends Vue {
  books!: Book[]
  meta!: ApiMeta
  application!: Application
  title!: string
  formatLanguage!: typeof formatLanguage
  formatAuthors!: typeof formatAuthors

  description = "Discover all available books sorted by title and serie's title"
  sortOptions = [
    {
      label: "By series' title (default)",
      value: 'title_sort',
    },
    {
      label: 'By title',
      value: 'title',
    },
    {
      label: 'Most recently published',
      value: '-date',
    },
    {
      label: 'Newest uploaded',
      value: '-created_at',
    },
  ]
}
</script>
