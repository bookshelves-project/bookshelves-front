<script lang="ts" setup>
const { request } = useHttp()
const listRoute: ApiEndpoint = '/tags/books'
const route = useRoute()

const [tagRaw, entitiesRaw] = await Promise.all([
  request<Tag>({
    endpoint: '/tags',
    params: [
      route.params.slug
    ],
    extractData: true
  }),
  request<ApiResponse<Entity[]>>({
    endpoint: listRoute,
    params: [
      route.params.slug
    ]
  })
])

const title = ref<string>()
const description = ref<string>()
const tag = ref<Tag>()
const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

tag.value = tagRaw
meta.value = entitiesRaw?.meta
list.value = entitiesRaw?.data
title.value = `Tag ${tag.value?.name}`
description.value = `Books and series with tag ${tag.value?.name}`

const paginate = (payload?: ApiResponse<Entity[]>) => {
  meta.value = payload?.meta
  if (payload?.data) {
    list.value = list.value?.concat(payload.data)
  }
}

useMetadata({
  title: title.value
})
</script>

<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div>
      <entity-list :entities="list" type entity-name />
      <div v-if="meta" class="mt-14 mb-5">
        <pagination-load-more
          :meta="meta"
          :endpoint="listRoute"
          @load="paginate"
        />
      </div>
    </div>
  </div>
</template>
