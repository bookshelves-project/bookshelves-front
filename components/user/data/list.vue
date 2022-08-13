<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'
import UserDataCard from '@/components/user/data/card.vue'
import UserDataLoading from '@/components/user/data/loading.vue'
import PaginationLoadMore from '@/components/pagination/load-more.vue'

const props = defineProps<{
  endpoint: ApiEndpoint
  title?: string
  subtitle?: string
  empty?: string
  icon?: string
  deletable?: boolean
}>()

const { request } = useHttp()
const route = useRoute()

const meta = ref<ApiMeta>()
const list = ref<UserData[]>()
const isLoading = ref(true)

const emit = defineEmits(['destroy'])

const load = async () => {
  try {
    const response = await request<ApiResponse<UserData[]>>({
      endpoint: props.endpoint,
      params: [route.params.slug]
    })
    meta.value = response?.meta
    list.value = response?.data
    isLoading.value = false
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
}

onMounted(() => {
  load()
})
const destroy = (data: UserData) => {
  if (list.value) {
    list.value = list.value.filter(
      (item: UserData) => item.meta.slug !== data.meta.slug
    )
    emit('destroy', { data })
  }
}
const paginate = (payload?: ApiResponse<any[]>) => {
  meta.value = payload?.meta
  if (payload?.data) {
    list.value = list.value?.concat(payload.data)
  }
}
</script>

<template>
  <div class="bg-white rounded-md shadow dark:bg-gray-800">
    <div
      class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6"
    >
      <h3
        class="flex items-center text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
      >
        <svg-icon
          v-if="icon"
          :name="icon"
          class="w-6 h-6 text-gray-400 dark:text-gray-300"
        />
        <div :class="icon ? 'ml-2' : ''">
          {{ title }}
        </div>
      </h3>
      <div class="mt-1 text-sm text-gray">
        {{ subtitle }}
      </div>
    </div>
    <div v-if="isLoading">
      <user-data-loading />
    </div>
    <div v-else>
      <transition-group
        v-if="list && list.length"
        tag="ul"
        class="divide-y divide-gray-200 dark:divide-gray-700 max-h-[50rem] overflow-x-hidden overflow-y-auto scrollbar-thin"
      >
        <user-data-card
          v-for="(data, id) in list"
          :key="id"
          :data="data"
          :class="id === list.length - 1 ? 'rounded-b-md' : ''"
          :deletable="deletable ?? false"
          @destroy="destroy"
        />
        <div v-if="meta" class="mt-14 mb-5">
          <pagination-load-more
            :meta="meta"
            :endpoint="endpoint"
            @load="paginate"
          />
        </div>
      </transition-group>
      <div v-else class="flex flex-wrap items-center p-4 text-gray-400">
        {{ empty }}
      </div>
    </div>
  </div>
</template>
