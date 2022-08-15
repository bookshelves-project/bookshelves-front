<script lang="ts" setup>
const { requestPage, response } = useHttpPage<Tag[]>({
  endpoint: '/tags',
  query: {
    'filter[negligible]': false,
    full: true
  }
})
await requestPage()

const tags = ref<Tag[]>()
const genres = ref<Tag[]>()

const setTags = () => {
  genres.value = response.value?.data.filter(tag => tag.type === 'genre')
  tags.value = response.value?.data.filter(tag => tag.type === 'tag')
}
setTags()

watch(
  () => response.value,
  () => setTags()
)

const title = 'Genres & Tags'
const description = 'Find books and series by their genres and tags.'

useMetadata({
  title,
  description
})
</script>

<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters negligible :total="response?.data.length" />
      </template>
    </app-header>
    <div v-if="genres" class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">
        Genres
      </h2>
      <relation-list
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
      <h2 class="mb-6 font-handlee text-2xl">
        Tags
      </h2>
      <relation-list
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
