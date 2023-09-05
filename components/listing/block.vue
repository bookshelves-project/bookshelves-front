<script setup lang="ts">
import type { ApiBaseRoute, ApiData, ApiMeta, Entity } from '~/types'

const props = defineProps<{
  entities: ApiData<Entity[]>
  count?: number
  name?: string
  endpoint: ApiBaseRoute
}>()

const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

meta.value = props.entities?.meta
list.value = props.entities?.data

function paginate(payload?: ApiData<Entity[]>) {
  meta.value = payload?.meta
  if (payload?.data)
    list.value = list.value?.concat(payload.data)
}
</script>

<template>
  <div v-if="entities && entities.data?.length">
    <app-divider> {{ count }} {{ name }} </app-divider>
    <div class="display-grid space-y-6 sm:space-y-0">
      <listing-card
        v-for="(entity, id) in entities.data"
        :key="id"
        :entity="entity"
      />
    </div>
    <div v-if="meta" class="mt-14 mb-5">
      <!-- <pagination-load-more
        :meta="meta"
        :endpoint="endpoint"
        @load="paginate"
      /> -->
    </div>
  </div>
</template>
