<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import Filters from '@/components/filters/index.vue'
import EntityList from '@/components/entity/list.vue'
import Pagination from '@/components/pagination/index.vue'

const { nuxtAsyncList } = useFetchable()
const route = useRoute()

const response = ref<ApiPaginateResponse<Serie[]>>()

const load = async () => {
  response.value = await nuxtAsyncList<Serie>('/series')
}
await load()

watch(
  () => route.query,
  async () => {
    await load()
  }
)

const title = 'All series available'
const description = 'Discover all series'
const sortOptions = [
  {
    label: "By series' title (default)",
    query: { sort: 'title_sort' },
    value: 'title_sort',
  },
  {
    label: 'By title',
    query: { sort: 'title' },
    value: 'title',
  },
  {
    label: 'Newest uploaded',
    query: { sort: '-created_at' },
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
          language
          type
          :sort="sortOptions"
          paginate
          size
          :total="response?.meta.total"
        />
      </template>
    </app-header>
    <entity-list :entities="response?.data" />
    <pagination
      v-if="response?.meta"
      :pages="response?.meta.last_page"
      :current="response?.meta.current_page"
    />
  </div>
</template>
