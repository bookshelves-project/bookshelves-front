<script setup lang="ts">
const { request } = useHttp()
const route = useRoute()

const book = ref<Book>()
const entities = ref<ApiResponse<Entity[]>>()

const title = ref('Related books & series for ')
const description = 'List of all results for related books & series'

const fetchApi = async () => {
  const current = route.query.page as string
  const [bookRaw, entitiesRaw] = await Promise.all([
    request<Book>({
      endpoint: '/books',
      params: [
        route.params.author,
        route.params.slug
      ],
      extractData: true
    }),
    request<ApiResponse<Entity[]>>({
      endpoint: '/entities/related',
      params: [
        route.params.author,
        route.params.slug
      ],
      query: {
        page: parseInt(current) || 1,
        size: 6
      }
    })
  ])

  book.value = bookRaw
  entities.value = entitiesRaw
  title.value += book.value?.title
}
await fetchApi()

watch(
  () => route.query,
  async () => {
    await fetchApi()
  }
)

useMetadata({
  title: title.value,
  description: book.value?.description,
  image: book.value?.media_social
})
</script>

<template>
  <main class="main-content">
    <app-header v-if="book" :title="title" :subtitle="description" />
    <entity-list
      v-if="entities?.data"
      :entities="entities?.data"
      type
      entity-name
    />
  </main>
</template>
