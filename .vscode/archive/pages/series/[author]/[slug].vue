<script lang="ts" setup>
const route = useRoute()
const { request } = useHttp()
const listRoute: ApiTypedRouteList = '/series/{author}/{slug}/books'
const { formatAuthors } = useEntityMethods()

const [serieRaw, booksRaw] = await Promise.all([
  request<Serie>({
    endpoint: '/series/{author}/{slug}',
    params: {
      author: route.params.author,
      slug: route.params.slug,
    },
    extractData: true,
  }),
  request<ApiResponse<Entity[]>>({
    endpoint: listRoute,
    params: {
      author: route.params.author,
      slug: route.params.slug,
    },
  }),
])

const serie = ref<Serie>()
const books = ref<ApiResponse<Entity[]>>()
const booksList = ref<Entity[]>()

serie.value = serieRaw.body
books.value = booksRaw.body
booksList.value = books.value?.data

const paginate = (payload?: ApiResponse<Entity[]>) => {
  const list = books.value?.data
  if (list && payload?.data) {
    books.value = payload
    booksList.value = booksList.value?.concat(payload.data)
  }
}

const crumbs: string[] = [
  'Series',
  serie.value?.authors ? `${serie.value?.authors[0].name}` : '',
  `${serie.value?.title} (${serie.value?.type})`,
]

useMetadata({
  title: `${serie.value?.title} by ${formatAuthors(serie.value?.authors)} · Series`,
  description: serie.value?.description,
  image: serie.value?.media_social,
})
</script>

<template>
  <main v-if="serie" class="main-content">
    <layout-header
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
    </layout-header>
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
