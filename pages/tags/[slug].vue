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

const tag = ref<Tag>()
const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

tag.value = tagRaw.body
meta.value = entitiesRaw?.body.meta
list.value = entitiesRaw?.body.data

const paginate = (payload?: ApiResponse<Entity[]>) => {
  meta.value = payload?.meta
  if (payload?.data) {
    list.value = list.value?.concat(payload.data)
  }
}

useMetadata({
  title: `Tag ${tag.value?.name}`,
  description: `Books and series with tag ${tag.value?.name}`
})
</script>

<template>
  <div class="main-content">
    <layout-header v-if="tag" :title="tag.name" />
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
