<script setup lang="ts">
import AppButton from '@/components/app/button.vue'
import AppLoading from '@/components/app/loading.vue'

const props = defineProps<{
  meta: ApiMeta
  endpoint: Endpoint
}>()

const emit = defineEmits<{
  (e: 'load', payload: ApiPaginateResponse<Entity[]>): void
}>()

const { nuxtFetchBase } = useFetchable()

const pending = ref(false)
const disabled = ref(false)

const load = async () => {
  pending.value = true
  const currentPage = props.meta.current_page
  const lastPage = props.meta.last_page
  const nextPage = (
    lastPage !== currentPage ? currentPage + 1 : lastPage
  ).toString()

  const list = await nuxtFetchBase<ApiPaginateResponse<Entity[]>>(
    `${props.meta.path}?page=${nextPage}&size=${props.meta.per_page}`
  )
  pending.value = false

  emit('load', list)
}
</script>

<template>
  <div>
    <div v-if="meta.current_page !== meta.last_page" class="flex">
      <transition name="fade">
        <app-button
          v-if="!disabled"
          color="primary"
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
  </div>
</template>
