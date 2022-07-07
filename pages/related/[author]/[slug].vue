<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityList from '@/components/entity/list.vue'

const { nuxtAsyncList, nuxtAsync } = useFetchable()
const route = useRoute()

const book = ref<Book>()
const response = ref<ApiPaginateResponse<Entity[]>>()

const title = ref('Related books & series for ')
const description = 'List of all results for related books & series'

const load = async () => {
  const current = route.query.page as string
  const [entity, list] = await Promise.all([
    nuxtAsync<Book>('/books', [route.params.author, route.params.slug]).then(
      (e) => e.data
    ),
    nuxtAsyncList<Entity>(
      '/entities/related',
      [route.params.author, route.params.slug],
      {
        page: parseInt(current) || 1,
        size: 6,
      }
    ),
  ])

  book.value = entity
  response.value = list
  title.value += book.value.title
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

useMetadata({
  title: title.value,
  description: book.value?.description,
  image: book.value?.cover?.simple,
})
</script>

<template>
  <main class="main-content">
    <app-header v-if="book" :title="title" :subtitle="description" />
    <entity-list
      v-if="response?.data"
      :entities="response?.data"
      type
      entity-name
    />
  </main>
</template>
