<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'
import { objectIsEmpty } from '~/utils/methods'
import { useFilterStore } from '~~/store/filter'

const props = defineProps<{
  paginate?: boolean
}>()

const route = useRoute()
const router = useRouter()
const store = useFilterStore()

const queryAvailable = computed(() => !objectIsEmpty(route.query))

const clearAll = () => {
  // store.setQueries({})
  const query = {
    size: '32',
    page: '1',
  }
  router.replace({
    name: route.name!,
    query: props.paginate ? query : {},
  })
}
</script>

<template>
  <div>
    <Transition>
      <button
        v-if="queryAvailable"
        class="group inline-flex items-center justify-center rounded-md py-2 px-2 text-sm font-medium transition-colors duration-75 hover:bg-gray-200 dark:hover:bg-gray-800"
        type="button"
        @click="clearAll"
      >
        <svg-icon
          name="trash"
          class="h-4 w-4 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
        />
        <span
          class="ml-2 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
        >
          Clear all
        </span>
      </button>
    </Transition>
  </div>
</template>
