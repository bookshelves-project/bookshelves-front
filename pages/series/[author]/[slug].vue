<script lang="ts" setup>
const route = useRoute()
const { request } = useHttp()
const listRoute: ApiEndpoint = '/series/books'

const [serieRaw, booksRaw] = await Promise.all([
  request<Serie>({
    endpoint: '/series',
    params: [
      route.params.author,
      route.params.slug
    ],
    extractData: true
  }),
  request<ApiResponse<Entity[]>>({
    endpoint: listRoute,
    params: [
      route.params.author,
      route.params.slug
    ]
  })
])

const serie = ref<Serie>()
const books = ref<ApiResponse<Entity[]>>()
const booksList = ref<Entity[]>()
const crumbs = ref<string[]>()

serie.value = serieRaw.body
books.value = booksRaw.body
booksList.value = books.value?.data
crumbs.value = ['Series', `${serie.value.authors[0].name}`, `${serie.value?.title} (${serie.value?.type})`]

const paginate = (payload?: ApiResponse<Entity[]>) => {
  const list = books.value?.data
  if (list && payload?.data) {
    books.value = payload
    booksList.value = booksList.value?.concat(payload.data)
  }
}

useMetadata({
  title: serie.value?.title,
  description: serie.value?.description,
  image: serie.value?.media_social
})
</script>

<template>
  <main v-if="serie" class="main-content">
    <app-header
      :title="serie.title"
      :image="serie.media?.url"
      :color="serie.media?.color"
      :subtitle="`${serie.count} books`"
      :type="serie.type"
      :authors="serie.authors"
      :cta="serie.link"
      :text="serie.description"
      :entity="serie"
      :crumbs="crumbs"
      favorite
    >
      <div class="flex">
        <entity-download-button
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
    <div v-if="books && books.data?.length && books.meta">
      <app-divider> {{ serie.count }} Books </app-divider>
      <entity-list v-if="booksList?.length" :entities="booksList" type />
      <pagination-load-more
        :meta="books.meta"
        :endpoint="listRoute"
        class="mt-6 mb-5"
        @load="paginate"
      />
    </div>
    <entity-review
      :entity="serie"
      class="border-t border-gray-400 dark:border-gray-700 pt-6 mt-10"
    />
  </main>
</template>
