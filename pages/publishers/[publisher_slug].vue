<script lang="ts" setup>
import type { ApiData, Entity, Publisher } from '~/types'

const { params } = useRoute()

const [publisher, books] = await Promise.all([
  useHttp<Publisher>({
    name: '/publishers/{publisher}',
    params: {
      publisher: params.publisher_slug,
    },
  }),
  useHttp<ApiData<Entity[]>>({
    name: '/publishers/{publisher}/books',
    params: {
      publisher: params.publisher_slug,
    },
    auto: false,
  }),
])

const crumbs: string[] = [
  'Publishers',
  `${publisher?.name}`,
]

useMetadata({
  title: `${publisher?.name} · Publishers`,
  description: `Books from ${publisher?.name}`,
})
</script>

<template>
  <main v-if="publisher" class="main-content">
    <layout-header
      :title="publisher.name"
      :subtitle="`Books from ${publisher.name}`"
      :entity="publisher"
      :crumbs="crumbs"
    />
    <section v-if="books">
      <listing v-if="books.data?.length" :entities="books.data" type />
    </section>
  </main>
</template>
