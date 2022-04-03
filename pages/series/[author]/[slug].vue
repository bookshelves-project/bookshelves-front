<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import DownloadButton from '@/components/entity/download-button.vue'
import AppDivider from '@/components/app/divider.vue'
import EntityList from '@/components/entity/list.vue'
import EntityCard from '@/components/entity/card.vue'
import EntityTagsLinks from '@/components/entity/tags-links.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'
import EntityComment from '@/components/entity/comment/index.vue'

// const { fetch, nuxtAsyncList, nuxtAsync } = useFetchable()
// const { params, query } = useRoute()

const serie = ref<Serie>()
const books = ref<ApiPaginateResponse<Book[]>>()

const { nuxtAsync, nuxtAsyncList } = useFetchable()
const route = useRoute()

const load = async () => {
  const [entity, list] = await Promise.all([
    nuxtAsync<Serie>('/series', [route.params.author, route.params.slug]).then(
      (e) => e.data
    ),
    nuxtAsyncList<Book>(
      '/series/books',
      [route.params.author, route.params.slug],
      {
        page: (route.query.page as string) || '1',
        size: '6',
      }
    ),
  ])

  serie.value = entity
  books.value = list
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

// const fetchData = async () => {
//   ;[serie.value, books.value] = await Promise.all([
//     nuxtAsync<ApiResponse<Serie>>('serie', '/series', [
//       params.author,
//       params.slug,
//     ]).then((e) => e?.data),
//     nuxtAsyncList<Book>('/series/books', [params.author, params.slug], {
//       page: (query.page as string) || '1',
//       size: '16',
//     }),
//   ])
// }
// await fetchData()

const loadBooks = (payload: ApiPaginateResponse<Book>) => {
  //   // this.books = [...this.books, ...api.data]
  //   // this.meta = api.meta
}

// watch(
//   () => query,
//   async (newVal) => {
//     await fetchData()
//   }
// )

useMeta({
  title: serie.value?.title,
})
</script>

<template>
  <main v-if="serie" class="main-content">
    <app-header
      :title="serie.title"
      :image="serie.cover?.thumbnail"
      :color="serie.cover?.color"
      :subtitle="`${serie.count} books`"
      :type="serie.type"
      :authors="serie.authors"
      :cta="serie.link"
      :text="serie.description"
      :entity="serie"
      favorite
    >
      <download-button :download="serie.download" :files="serie.files" />
      <div class="mt-2 text-right">Language: {{ serie.language.name }}</div>
      <template #content>
        <entity-tags-links :tags="serie.tags" />
      </template>
    </app-header>
    <div v-if="books">
      <app-divider> {{ serie.count }} Books </app-divider>
      <entity-list v-if="books.data?.length" :entities="books?.data" />
      <pagination-load-more
        :meta="books.meta"
        @load="loadBooks"
        class="mt-6 mb-5"
      />
    </div>
    <entity-comment :entity="serie" />
  </main>
</template>
