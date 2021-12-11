<template>
  <div class="flex">
    <transition name="fade">
      <app-button
        v-if="!disabled"
        :color="`secondary`"
        class="w-full max-w-lg mx-auto"
        :disabled="disabled"
        align="center"
        @click="load"
      >
        <div class="flex items-center space-x-2 relative">
          <div class="absolute top-1/2 -translate-y-1/2 transform -left-5">
            <transition name="fade">
              <app-loading v-if="pending" class="w-5 h-5" />
              <span v-else class="w-5 h-5"></span>
            </transition>
          </div>
          <span v-if="!disabled">Load more</span>
          <span v-else>End</span>
        </div>
      </app-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ApiEndpoint, Query } from '~/types'

const props = defineProps({
  pages: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  },
  endpoint: {
    type: String as () => ApiEndpoint,
    default: ApiEndpoint.Book
  }
})

const { route, $repository } = useContext()
const emit = defineEmits(['load'])

const disabled = ref(false)
const pending = ref(false)
const newPage = ref('1')

const load = async () => {
  console.log('load')
  let currentPage = props.currentPage
  currentPage++
  newPage.value = currentPage.toString(10)
  const data = await request()
  emit('load', data)
}
const request = async () => {
  pending.value = true
  const queries: Query = {
    perPage: '32',
    page: newPage.value,
    ...route.value.query
  }
  const api = await $repository(props.endpoint, false).index(queries, Object.values(route.value.params))
  if (api.meta?.current_page === api.meta?.last_page) {
    disabled.value = true
  }
  pending.value = false
  return api.data
}
</script>
