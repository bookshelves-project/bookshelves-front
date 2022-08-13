<script setup lang="ts">
import FiltersOption from '@/components/filters/option.vue'
import FiltersQueries from '@/components/filters/queries.vue'
import FiltersClear from '@/components/filters/clear.vue'
import SvgIcon from '@/components/svg-icon.vue'

import { useApplicationStore } from '~~/store/application'
import { useFilterStore } from '~~/store/filter'

const { objectIsEmpty } = useTools()

defineProps<{
  sort?: FilterOption[]
  size?: boolean
  language?: boolean
  type?: boolean
  serie?: boolean
  negligible?: boolean
  total?: number
}>()

const sizeOptions: FilterOption[] = [
  {
    label: '32 (default)',
    value: '32'
  },
  {
    label: '64',
    value: '64'
  },
  {
    label: '128',
    value: '128'
  }
]

const route = useRoute()
const router = useRouter()
const store = useFilterStore()

const filterLanguages = computed(() => {
  const store = useApplicationStore()
  const options: FilterOption[] = []

  const type = 'filter[languages]'
  if (store.languages.length) {
    store.languages.forEach((lang) => {
      options.push({
        label: lang.name,
        value: lang.meta?.slug,
        query: { type: lang.meta?.slug },
        enabled: route.query[type]
          ? route.query[type]!.includes(lang.meta?.slug!)
          : false
      })
    })
  }
  return {
    type,
    options
  }
})
const filterTypes = computed(() => {
  const store = useApplicationStore()
  const options: FilterOption[] = []

  const type = 'filter[types]'
  if (store.enums.bookTypes) {
    for (const [key, value] of Object.entries(store.enums.bookTypes)) {
      options.push({
        label: value,
        value: key,
        query: { type: key },
        enabled: route.query[type] ? route.query[type]!.includes(key) : false
      })
    }
  }

  return {
    type,
    options
  }
})
const filterSerie = computed(() => {
  return {
    type: 'filter[disallow_serie]',
    options: []
  }
})
const reverseSort = (asc = false) => {
  let newQuery = route.query
  const order = asc ? '' : '-'
  let sort = `${order}${newQuery.sort}`
  if (asc) {
    const currentSort = newQuery.sort as string
    sort = currentSort.replace('-', '')
  }
  newQuery = { sort }
  let query = {}
  query = { ...route.query, ...newQuery }
  router.replace({ query: { ...query } })
  store.setQueries({ ...query })
}
const queryAvailable = computed(() => {
  return !objectIsEmpty(route.query)
})
</script>

<template>
  <div>
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" class="sr-only">
        Filters
      </h2>

      <div
        class="relative z-10 border-b border-gray-200 pb-4 dark:border-gray-700"
      >
        <div class="mx-auto flex items-center justify-between">
          <div class="relative flex items-center text-left">
            <filters-option
              v-if="sort && sort.length"
              filter="sort"
              label="Sort"
              :options="sort"
              type="button"
              auto-close
            />
            <filters-option
              v-if="size"
              filter="size"
              label="By page"
              :options="sizeOptions"
              type="button"
              auto-close
            />
            <button
              v-if="$route.query.sort"
              class="m-auto ml-1 rounded-md p-1.5 transition-colors duration-75 hover:bg-gray-200 dark:hover:bg-gray-700"
              @click="reverseSort(route.query.sort?.includes('-'))"
            >
              <svg-icon
                name="arrow-sm-right"
                class="h-5 w-5 transform text-gray-500 duration-75 dark:text-gray-400"
                :class="
                  route.query.sort?.includes('-') ? '-rotate-90' : 'rotate-90'
                "
              />
            </button>
          </div>

          <button
            type="button"
            class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
          >
            Filters
          </button>

          <div class="hidden sm:block">
            <div class="flow-root">
              <div
                class="-mx-4 flex items-center divide-x divide-gray-200 dark:divide-gray-700"
              >
                <div class="relative inline-block space-x-4 px-4 text-left">
                  <filters-option
                    v-if="serie"
                    :filter="filterSerie.type"
                    label="Remove series"
                    type="switch"
                  />
                  <filters-option
                    v-if="negligible"
                    filter="filter[negligible]"
                    label="Show negligible"
                    type="switch"
                  />
                  <filters-option
                    v-if="language"
                    :filter="filterLanguages.type"
                    label="Languages"
                    type="checkbox"
                    :options="filterLanguages.options"
                    align="right"
                  />
                  <filters-option
                    v-if="type"
                    :filter="filterTypes.type"
                    label="Types"
                    type="checkbox"
                    :options="filterTypes.options"
                    align="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active filters -->
      <div>
        <div class="mx-auto max-w-7xl py-2 sm:flex sm:items-center">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-gray">
            Filters
            <span class="sr-only">, active</span>
          </h3>

          <div
            aria-hidden="true"
            class="hidden h-10 w-px bg-gray-300 dark:bg-gray-700 sm:ml-4 sm:block"
          />

          <div class="mt-2 sm:mt-0 sm:ml-4">
            <div class="-m-1 flex flex-wrap items-center">
              <div v-if="!queryAvailable" class="italic text-gray-300 text-sm">
                None.
              </div>
              <filters-clear />
              <filters-queries />
            </div>
          </div>
          <div v-if="total" class="ml-auto text-sm italic">
            {{ total }} entries
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
