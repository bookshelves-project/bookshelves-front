<script setup lang="ts">
import { useFilterStore } from '~~/store/filter'

interface Props {
  align?: 'left' | 'right'
  icon?: string
  label?: string
  filter?: string
  options?: FilterOption[]
  type?: 'checkbox' | 'radio' | 'button' | 'switch'
  autoClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  icon: undefined,
  label: undefined,
  filter: undefined,
  options: undefined,
  type: 'checkbox',
  autoClose: false
})

const route = useRoute()
const currentQuery = ref()
currentQuery.value = route.query

const checkboxes = ref<string[]>([])
const switchValue = ref(false)
const router = useRouter()
const store = useFilterStore()

const checkCurrentFilters = () => {
  const current = route.query[props.filter] as string
  if (props.type === 'checkbox' && route.query[props.filter]) {
    checkboxes.value = current.split(',')
  }
  if (props.type === 'switch') {
    switchValue.value = current ? JSON.parse(current) : false
  }
}
const filterBy = (newQuery: boolean | string | string[], replace = false) => {
  if (newQuery instanceof Array) {
    newQuery = newQuery.join(',')
  }
  const formatQuery = { [props.filter]: newQuery } as any

  if (replace) {
    router.replace({
      query: { query: formatQuery }
    })

    store.setQueries(formatQuery)
  } else {
    route.query.page = '1'
    router.push({
      name: route.name!,
      query: { ...route.query, ...formatQuery }
    })

    store.setQueries({ ...route.query, ...formatQuery })
  }
}
const optionsNumber = computed((): number => {
  return checkboxes.value.length ?? 0
})
checkCurrentFilters()

watch(
  () => checkboxes.value,
  (newVal) => {
    filterBy(newVal)
  }
)
watch(
  () => switchValue.value,
  (newVal) => {
    filterBy(newVal)
  }
)
watch(
  () => route.query,
  (newVal) => {
    currentQuery.value = newVal
  }
)

watch(
  () => store.clear,
  () => {
    checkboxes.value = []
    switchValue.value = false
    setTimeout(() => {
      router.replace({
        query: {}
      })
    }, 300)
  }
)
</script>

<template>
  <div class="relative inline-block text-left">
    <div v-if="type === 'switch'">
      <field-toggle v-model="switchValue" :label="label" />
    </div>
    <app-dropdown v-else :align="align" :auto-close="autoClose">
      <template #trigger>
        <div
          :id="`${filter}-filter`"
          :title="`${label}`"
          class="group inline-flex justify-center rounded-md py-2 px-2 text-sm font-medium text-gray-700 transition-colors duration-75 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          {{ label }}
          <span
            v-if="type === 'checkbox'"
            class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            {{ optionsNumber }}
          </span>
          <div class="ml-1">
            <svg-icon
              name="chevron-right"
              class="h-5 w-5 rotate-90 transform text-gray-400 group-hover:text-gray-500"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div
          class="w-48 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
        >
          <div class="py-1" role="none">
            <div v-if="type === 'button'">
              <button
                v-for="(option, index) in options"
                :key="index"
                class="w-full px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700"
                :class="{
                  'bg-gray-200 dark:bg-gray-600':
                    currentQuery[props.filter] === option.value,
                }"
                @click="filterBy(option.value!)"
              >
                {{ option.label! }}
              </button>
            </div>
            <div v-if="type === 'checkbox'">
              <filters-checkboxes
                v-model="checkboxes"
                :options="options"
                :filter="filter"
              />
            </div>
          </div>
        </div>
      </template>
    </app-dropdown>
  </div>
</template>
