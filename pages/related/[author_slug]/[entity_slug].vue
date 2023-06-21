<script lang="ts" setup>
import type { ApiData, Book, Entity } from '~/types'

const { params } = useRoute()

const [entity, entities] = await Promise.all([
  useHttp<Book>({
    name: '/books/{author}/{book}',
    params: {
      author: params.author_slug,
      book: params.entity_slug,
    },
    auto: true,
  }),
  useHttp<ApiData<Entity[]>>({
    name: '/entities/related/{author}/{entity}',
    params: {
      author: params.author_slug,
      entity: params.entity_slug,
    },
    auto: false,
  }),
])

const title = `Related to ${entity?.title}`
const description = `Books and series related to ${entity?.title}`

useMetadata({
  title,
  description,
})
</script>

<template>
  <main class="main-content">
    <layout-header :title="title" :subtitle="description" />
    <section v-if="entities">
      <listing v-if="entities.data?.length" :entities="entities.data" type />
    </section>
  </main>
</template>
