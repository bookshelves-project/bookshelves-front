<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import Filters from '@/components/filters/index.vue'
import EntityList from '@/components/entity/list.vue'
import Pagination from '@/components/pagination/index.vue'

const { nuxtAsyncList } = useFetchable()
const route = useRoute()

const response = ref<ApiPaginateResponse<Book[]>>()

const load = async () => {
  response.value = await nuxtAsyncList<Book>('/books')
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

const title = 'All books available'
const description =
  "Discover all available books sorted by title and serie's title"
const sortOptions: FilterOption[] = [
  {
    label: "By series' title (default)",
    value: 'slug_sort',
  },
  {
    label: 'By title',
    value: 'title',
  },
  {
    label: 'Most recently published',
    value: '-released_on',
  },
  {
    label: 'Newest uploaded',
    value: '-created_at',
  },
]

useMetadata({
  title: title,
  description: description,
})
</script>

<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters
          serie
          language
          type
          :sort="sortOptions"
          paginate
          size
          :total="response?.meta.total"
        />
      </template>
    </app-header>
    <entity-list :entities="response?.data" type />
    <pagination
      v-if="response?.meta"
      :pages="response?.meta.last_page"
      :current="response?.meta.current_page"
    />
  </div>
</template>
