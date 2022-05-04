<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityList from '@/components/entity/list.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'

const { nuxtAsyncData, nuxtAsyncList } = useFetchable()
const { params } = useRoute()

const publisher = ref<Publisher>()
const meta = ref<ApiMeta>()
const list = ref<Entity[]>()
const listRoute: Endpoint = '/publishers/books'

const title = ref<string>()
const description = ref<string>()

const load = async () => {
  const [entity, entities] = await Promise.all([
    nuxtAsyncData<Publisher>('/publishers', [params.slug]),
    nuxtAsyncList<Entity>(listRoute, [params.slug]),
  ])
  publisher.value = entity
  meta.value = entities.meta
  list.value = entities.data

  title.value = `Publisher ${entity.name}`
  description.value = `Books from ${entity.name}`
}
await load()

const paginate = (payload: ApiPaginateResponse<Entity[]>) => {
  meta.value = payload.meta
  list.value = list.value?.concat(payload.data)
}

useMetadata({
  title: title.value,
})
</script>

<template>
  <div v-if="publisher" class="main-content">
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
