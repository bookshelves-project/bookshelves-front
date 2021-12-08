<template>
  <main class="main-content relative">
    <app-header :title="title" :subtitle="description" :border="false">
      <template #filters>
        <blocks-filters has-serie languages :sort="sortOptions" paginate />
      </template>
    </app-header>

    <div role="list" class="display-grid">
      <EntityCard
        v-for="(book,id) in books"
        :key="id"
        :cover="book.cover.thumbnail"
        :color="book.cover.color"
        :title="book.title"
        :route="{
          name: 'books-author-slug',
          params: { author: book.meta.author, slug: book.meta.slug },
        }"
      >
        <template #title>
          <span>{{ overflow(book.title, 50) }}</span>
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
          <span class="mt-1 block">{{ formatLanguage(book.language)?.label }}</span>
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
      <Pagination v-if="meta" :current-page="meta.current_page" :pages="meta.last_page" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ApiEndpoint } from '~/composables/repository'
import { overflow } from '@/plugins/utils/methods'
import { formatLanguage, formatAuthors } from '~/plugins/utils/entities'
import { Book, ApiMeta, ApiPaginateResponse } from '~/types'
import EntityCard from '~/components/blocks/entity-card.vue'
import Pagination from '~/components/blocks/pagination.vue'

const { $config, route } = useContext()
const router = useRouter()

if (!route.value.query.perPage) {
  router.replace({
    query: {
      perPage: '32',
      page: '1',
      'filter[allow_serie]': 'true',
      sort: 'title_sort'
    }
  })
}

const books = ref<Book[]>()
const meta = ref<ApiMeta>()

const title = `All books available on ${$config.appName}`
const description = 'Discover all available books sorted by title and serie\'s title'
const sortOptions = [
  {
    label: "By series' title (default)",
    value: 'title_sort'
  },
  {
    label: 'By title',
    value: 'title'
  },
  {
    label: 'Most recently published',
    value: '-date'
  },
  {
    label: 'Newest uploaded',
    value: '-created_at'
  }
]

useMeta(() => ({
  title
}))
</script>

<script lang="ts">
export default defineComponent({
  async asyncData({ query, $repository }) {
    const api = await $repository(ApiEndpoint.Book).index({
      page: query.page as string || '1',
      perPage: '32',
      ...query
    })

    return {
      books: api.data,
      meta: api.meta
    }
  },
  head: {},
  watchQuery: ['page', 'filter[allow_serie]', 'filter[languages]', 'sort']
  // jsonld() {
  //   const breadcrumbs = [
  //     {
  //       url: this.$config.baseURL,
  //       text: 'Home'
  //     },
  //     {
  //       url: `${this.$config.baseURL}/books`,
  //       text: 'Books'
  //     }
  //   ]
  //   const items = breadcrumbs.map((item, index) => ({
  //     '@type': 'ListItem',
  //     position: index + 1,
  //     item: {
  //       '@id': item.url,
  //       name: item.text
  //     }
  //   }))
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'WebPage',
  //     itemListElement: items
  //   }
  // }
})
</script>
