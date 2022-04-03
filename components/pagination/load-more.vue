<script setup lang="ts">
import AppButton from '@/components/app/button.vue'
import AppLoading from '@/components/app/loading.vue'

const props = defineProps<{
  meta: ApiMeta
}>()

const { nuxtFetch } = useFetchable()

const pending = ref(false)
const disabled = ref(false)

const load = () => {
  const currentPage = props.meta.current_page
  const lastPage = props.meta.last_page
  const nextPage = (
    lastPage !== currentPage ? currentPage + 1 : lastPage
  ).toString()

  console.log(nextPage)
  console.log(props.meta)
  const route = useRoute()
  const router = useRouter()
  console.log(router)
  router.replace({
    name: route.name!,
    query: {
      page: nextPage,
    },
  })
}

defineEmits<{
  (e: 'load', payload: ApiPaginateResponse<any>): void
}>()
</script>

<template>
  <div>
    <div v-if="meta.current_page !== meta.last_page" class="flex">
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
  </div>
</template>

<!-- <script setup lang="ts">
import { ApiEndpoint, ApiMeta, Entity, Query } from '~/types'

interface Props {
  meta: ApiMeta
  size: string
  endpoint: ApiEndpoint
}
const props = withDefaults(defineProps<Props>(), {
  endpoint: ApiEndpoint.Book,
  size: '32',
})

const { route, $repository } = useContext()
const emit = defineEmits(['load'])

const disabled = ref(false)
const pending = ref(false)
const newPage = ref('1')

const load = async () => {
  if (props.meta) {
    let currentPage = props.meta.current_page
    currentPage++
    newPage.value = currentPage.toString(10)
    const data = await request()
    emit('load', data)
  }
}
const request = async () => {
  pending.value = true
  const queries: Query = {
    size: props.size,
    page: newPage.value,
    ...route.value.query,
  }
  const api = await $repository(props.endpoint, false).index<Entity>(
    queries,
    Object.values(route.value.params)
  )
  if (api.meta.current_page === api.meta.last_page) {
    disabled.value = true
  }
  pending.value = false

  return api
}
</script> -->
