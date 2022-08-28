<script lang="ts" setup>
const { request } = useHttp()
const listRoute: ApiTypedRouteList = '/publishers/{slug}/books'
const route = useRoute()

const [publisherRaw, entitiesRaw] = await Promise.all([
  request<Publisher>({
    endpoint: '/publishers/{slug}',
    params: {
      slug: route.params.slug
    },
    extractData: true
  }),
  request<ApiResponse<Entity[]>>({
    endpoint: listRoute,
    params: {
      slug: route.params.slug
    }
  })
])

const publisher = ref<Publisher>()
const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

publisher.value = publisherRaw.body
meta.value = entitiesRaw?.body?.meta
list.value = entitiesRaw?.body?.data

const paginate = (payload?: ApiResponse<Entity[]>) => {
  meta.value = payload?.meta
  if (payload?.data) {
    list.value = list.value?.concat(payload.data)
  }
}

useMetadata({
  title: `Publisher ${publisher.value?.name}`,
  description: `Books from ${publisher.value?.name}`
})
</script>

<template>
  <div class="main-content">
    <layout-header :title="publisher?.name" />
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
