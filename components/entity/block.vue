<script setup lang="ts">
import AppDivider from '@/components/app/divider.vue'
import EntityCard from '@/components/entity/card.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'

const props = defineProps<{
  entities?: ApiPaginateResponse<Entity[]>
  count?: number
  name?: string
  endpoint?: Endpoint
}>()

const local = ref<ApiPaginateResponse<Entity[]>>()
local.value = props.entities

const load = (api: ApiPaginateResponse<Entity>) => {
  // this.series = [...this.series, ...api.data]
  // this.seriesMeta = api.meta
}
</script>

<template>
  <div>
    <app-divider> {{ count }} {{ name }} </app-divider>
    <div class="display-grid space-y-6 sm:space-y-0">
      <entity-card
        v-for="(entity, id) in local?.data"
        :key="id"
        :entity="entity"
      />
    </div>
    <div class="mt-14 mb-5">
      <pagination-load-more
        :meta="entities?.meta"
        :endpoint="endpoint"
        @load="load"
      />
    </div>
  </div>
</template>
