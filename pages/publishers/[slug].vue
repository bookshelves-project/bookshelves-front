<script lang="ts" setup>
const { request } = useHttp()
const listRoute: ApiEndpoint = '/publishers/books'
const route = useRoute()

const [publisherRaw, entitiesRaw] = await Promise.all([
  request<Publisher>({
    endpoint: '/publishers',
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
const publisher = ref<Publisher>()
const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

publisher.value = publisherRaw
meta.value = entitiesRaw?.meta
list.value = entitiesRaw?.data

title.value = `Publisher ${publisher.value?.name}`
description.value = `Books from ${publisher.value?.name}`

const paginate = (payload?: ApiResponse<Entity[]>) => {
  meta.value = payload?.meta
  if (payload?.data) {
    list.value = list.value?.concat(payload.data)
  }
}

useMetadata({
  title: title.value,
  description: description.value
})
</script>

<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div>
      <entity-list :entities="list" type />
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
