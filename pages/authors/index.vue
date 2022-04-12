<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import Filters from '@/components/filters/index.vue'
import EntityList from '@/components/entity/list.vue'
import Pagination from '@/components/pagination/index.vue'

const { nuxtAsyncList } = useFetchable()
const route = useRoute()

const response = ref<ApiPaginateResponse<Author[]>>()

const load = async () => {
  response.value = await nuxtAsyncList<Author>('/authors')
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

const title = 'All authors available'
const description = 'Want to find all books written by specific author?'
const sortOptions = [
  {
    label: 'By lastname (default)',
    query: { sort: 'lastname' },
    value: 'lastname',
  },
  {
    label: 'By firstname',
    query: { sort: 'firstname' },
    value: 'firstname',
  },
  {
    label: 'Newest created',
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
        <filters :sort="sortOptions" paginate />
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
