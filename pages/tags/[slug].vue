<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityList from '@/components/entity/list.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'

const { nuxtAsyncData, nuxtAsyncList } = useFetchable()
const { params } = useRoute()

const [tag, entities] = await Promise.all([
  nuxtAsyncData<Tag>('/tags', [params.slug]),
  nuxtAsyncList<Entity>('/tags/books', [params.slug]),
])

const title = `Tag ${tag.name}`
const description = `Books and series with tag ${tag.name}`

const load = () => {}
</script>

<template>
  <div v-if="tag && entities" class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div>
      <entity-list :entities="entities?.data" />
      <!-- <pagination-load-more
        class="mt-14 mb-5"
        :last-page="entities.meta.last_page"
        :endpoint="`tags/books/${tag.meta.slug}`"
        :entities="entities.data"
        @load="load"
      /> -->
    </div>
  </div>
</template>
