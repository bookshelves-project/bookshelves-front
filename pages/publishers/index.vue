<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityRelationList from '@/components/relation/list.vue'
import Filters from '@/components/filters/index.vue'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const response = ref<Publisher[]>()
const load = async () => {
  const list = await nuxtAsyncData<Publisher[]>('/publishers', [], {
    full: true,
    'filter[negligible]': false,
  })

  response.value = list
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

const title = 'Publishers'
const description = 'Discover your books by publisher'

useMeta({
  title,
})
</script>

<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters negligible />
      </template>
    </app-header>
    <entity-relation-list
      :entities="response"
      name="publishers"
      :route="{
        name: 'publishers-slug',
        paramsList: {
          slug: 'meta.slug',
        },
      }"
    />
  </main>
</template>
