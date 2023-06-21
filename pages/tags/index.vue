<script lang="ts" setup>
import type { Tag } from '~/types'

const response = await useHttpQuery<Tag[]>({
  name: '/tags',
  query: {
    'filter[negligible]': false,
    'full': true,
  },
})

const tags = ref<Tag[]>()
const genres = ref<Tag[]>()

function setTags() {
  genres.value = response.value?.data.filter(tag => tag.type === 'genre')
  tags.value = response.value?.data.filter(tag => tag.type === 'tag')
}
setTags()

watch(
  () => response.value,
  () => setTags(),
)

const title = 'Genres & Tags'
const description = 'Find books and series by their genres and tags.'

useMetadata({
  title,
  description,
})
</script>

<template>
  <main class="main-content">
    <layout-header :title="title" :subtitle="description">
      <!-- <template #filters>
        <filters negligible :total="response?.data.length" />
      </template> -->
    </layout-header>
    <div v-if="genres" class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">
        Genres
      </h2>
      <listing-relation
        :models="genres"
        name="genres"
        :to="{
          name: 'tags-tag_slug',
          params: {
            tag_slug: 'meta.slug',
          },
        }"
        group
      />
    </div>
    <div v-if="tags" class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">
        Tags
      </h2>
      <listing-relation
        :models="tags"
        name="tags"
        :to="{
          name: 'tags-tag_slug',
          params: {
            tag_slug: 'meta.slug',
          },
        }"
      />
    </div>
  </main>
</template>
