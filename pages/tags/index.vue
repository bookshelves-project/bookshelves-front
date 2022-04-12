<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import Filters from '@/components/filters/index.vue'
import EntityRelationList from '@/components/relation/list.vue'

const title = 'Genres & Tags'
const description = 'Find books and series by their genres and tags.'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const tags = ref<Tag[]>()
const genres = ref<Tag[]>()

const load = async () => {
  const [tagsData, genresData] = await Promise.all([
    nuxtAsyncData<Tag[]>('/tags', [], {
      'filter[type]': 'tag',
      'filter[negligible]': false,
      full: true,
    }),
    nuxtAsyncData<Tag[]>('/tags', [], {
      'filter[type]': 'genre',
      'filter[negligible]': false,
      full: true,
    }),
  ])
  tags.value = tagsData
  genres.value = genresData
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

useMetadata({
  title: title,
  description: description,
})
</script>

<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters negligible />
      </template>
    </app-header>
    <div v-if="genres" class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Genres</h2>
      <entity-relation-list
        :entities="genres"
        name="genres"
        :route="{
          name: 'tags-slug',
          paramsList: {
            slug: 'meta.slug',
          },
        }"
        group
      />
    </div>
    <div v-if="tags" class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Tags</h2>
      <entity-relation-list
        :entities="tags"
        name="tags"
        :route="{
          name: 'tags-slug',
          paramsList: {
            slug: 'meta.slug',
          },
        }"
      />
    </div>
  </div>
</template>
