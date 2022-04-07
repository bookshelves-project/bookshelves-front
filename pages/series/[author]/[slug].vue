<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import DownloadButton from '@/components/entity/download-button.vue'
import AppDivider from '@/components/app/divider.vue'
import EntityList from '@/components/entity/list.vue'
import EntityTagsLinks from '@/components/entity/tags-links.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'
import EntityReview from '@/components/entity/review/index.vue'

const serie = ref<Serie>()
const books = ref<ApiPaginateResponse<Entity[]>>()
const booksList = ref<Entity[]>()
const breadcrumb = ref<string>()

const { nuxtAsync, nuxtAsyncList } = useFetchable()
const route = useRoute()
const listRoute: Endpoint = '/series/books'

const load = async () => {
  const [entity, list] = await Promise.all([
    nuxtAsync<Serie>('/series', [route.params.author, route.params.slug]).then(
      (e) => e.data
    ),
    nuxtAsyncList<Entity>(listRoute, [route.params.author, route.params.slug]),
  ])

  serie.value = entity
  books.value = list
  booksList.value = list.data
  breadcrumb.value = `${entity.title} (${entity.type})`
}
await load()

const paginate = (payload: ApiPaginateResponse<Entity[]>) => {
  const list = books.value?.data
  if (list) {
    books.value = payload
    booksList.value = booksList.value?.concat(payload.data)
  }
}

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
      :breadcrumb="breadcrumb"
      favorite
    >
      <div class="flex">
        <download-button
          :download="serie.download"
          :files="serie.files"
          class="mx-auto lg:mx-0"
        />
      </div>
      <div class="mt-2 text-center lg:text-right">
        Language: {{ serie.language.name }}
      </div>
      <template #content>
        <entity-tags-links :tags="serie.tags" />
      </template>
    </app-header>
    <div v-if="books">
      <app-divider> {{ serie.count }} Books </app-divider>
      <entity-list v-if="booksList?.length" :entities="booksList" />
      <pagination-load-more
        :meta="books.meta"
        :endpoint="listRoute"
        @load="paginate"
        class="mt-6 mb-5"
      />
    </div>
    <entity-review
      :entity="serie"
      class="border-t border-gray-400 dark:border-gray-700 pt-6 mt-10"
    />
  </main>
</template>
