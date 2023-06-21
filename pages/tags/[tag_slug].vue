<script lang="ts" setup>
import type { ApiData, Entity, Tag } from '~/types'

const { params } = useRoute()

const [tag, entities] = await Promise.all([
  useHttp<Tag>({
    name: '/tags/{tag}',
    params: {
      tag: params.tag_slug,
    },
    auto: true,
  }),
  useHttp<ApiData<Entity[]>>({
    name: '/tags/{tag}/books',
    params: {
      tag: params.tag_slug,
    },
    auto: false,
  }),
])

const title = `Tag ${tag?.name}`
const description = `Books and series with tag ${tag?.name}`

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
