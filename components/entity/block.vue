<script setup lang="ts">
import AppDivider from '@/components/app/divider.vue'
import EntityCard from '@/components/entity/card.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'

const props = defineProps<{
  entities?: ApiPaginateResponse<Entity[]>
  count?: number
  name?: string
  endpoint: Endpoint
}>()

const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

meta.value = props.entities?.meta
list.value = props.entities?.data

const paginate = (payload: ApiPaginateResponse<Entity[]>) => {
  meta.value = payload.meta
  list.value = list.value?.concat(payload.data)
}
</script>

<template>
  <div v-if="list && list.length">
    <app-divider> {{ count }} {{ name }} </app-divider>
    <div class="display-grid space-y-6 sm:space-y-0">
      <entity-card
        v-for="(entity, id) in list"
        :key="id"
        :entity="entity"
        type
      />
    </div>
    <div v-if="meta" class="mt-14 mb-5">
      <pagination-load-more
        :meta="meta"
        :endpoint="endpoint"
        @load="paginate"
      />
    </div>
  </div>
</template>
