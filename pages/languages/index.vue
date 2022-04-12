<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityRelationList from '@/components/relation/list.vue'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const response = ref<Language[]>()
const load = async () => {
  const list = await nuxtAsyncData<Language[]>('/languages')
  response.value = list
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

const title = 'Languages of books and series'
const description =
  'You can read your books in many languages, browse each possibilities!'

useMetadata({
  title: title,
  description: description,
})
</script>

<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description" />
    <entity-relation-list
      :entities="response"
      name="languages"
      :route="{
        name: 'books',
        queryList: {
          'filter[languages]': 'meta.slug',
        },
      }"
      group
    />
  </main>
</template>
