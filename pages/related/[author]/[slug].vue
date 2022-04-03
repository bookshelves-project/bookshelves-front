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
  const [entity, list] = await Promise.all([
    nuxtAsync<Book>('/books', [route.params.author, route.params.slug]).then(
      (e) => e.data
    ),
    nuxtAsyncList<Entity>(
      '/entities/related',
      [route.params.author, route.params.slug],
      {
        page: (route.query.page as string) || '1',
        size: '6',
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

useMeta({
  title: title.value,
})
</script>

<template>
  <main class="main-content">
    <app-header v-if="book" :title="title" :subtitle="description" />
    <entity-list v-if="response?.data" :entities="response?.data" entity-name />
  </main>
</template>
