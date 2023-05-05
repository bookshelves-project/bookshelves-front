<script setup lang="ts">
const props = defineProps<{
  entities?: ApiResponse<Entity[]>
  count?: number
  name?: string
  endpoint: ApiEndpoint
}>()

const meta = ref<ApiMeta>()
const list = ref<Entity[]>()

meta.value = props.entities?.meta
list.value = props.entities?.data

const paginate = (payload?: ApiResponse<Entity[]>) => {
  meta.value = payload?.meta
  if (payload?.data)
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
