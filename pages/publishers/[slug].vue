<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityList from '@/components/entity/list.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'

const { nuxtAsyncData, nuxtAsyncList } = useFetchable()
const { params } = useRoute()

const [publisher, entities] = await Promise.all([
  nuxtAsyncData<Publisher>('/publishers', [params.slug]),
  nuxtAsyncList<Entity>('/publishers/books', [params.slug]),
])

const title = `Publisher ${publisher.name}`
const description = `Books from ${publisher.name}`

const load = () => {}
</script>

<template>
  <div v-if="publisher && entities" class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div>
      <entity-list :entities="entities?.data" />
      <div class="mt-14 mb-5">
        <pagination-load-more :meta="entities.meta" @load="load" />
      </div>
    </div>
  </div>
</template>
