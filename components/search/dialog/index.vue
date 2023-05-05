<script setup lang="ts">
import type { Search } from '~/types/search'
import { useSearchStore } from '~~/stores/search'

const { request } = useHttp()

const search = ref<HTMLInputElement>()
const query = ref('')
const results = ref<Search>()
const searchStore = useSearchStore()

watch(
  () => query.value,
  (newVal) => {
    if (newVal.length >= 3)
      fetchResults(newVal)
  },
)

watch(
  () => searchStore.types,
  () => {
    if (query.value.length >= 3)
      fetchResults(query.value)
  },
  { deep: true },
)

async function fetchResults(input: string) {
  searchStore.setLoading(true)
  const types = []
  for (const [key, value] of Object.entries(searchStore.types)) {
    if (value)
      types.push(key)
  }

  try {
    searchStore.setFirstSearch(true)
    results.value = {
      count: 0,
      query: query.value,
      type: 'meilisearch',
    }
    const response = await request<Search>({
      endpoint: '/search',
      query: {
        q: input,
        types: types.join(','),
      },
      extractData: true,
    })

    results.value = response.body
  }
  catch (error) {
    console.error(error)
  }
  searchStore.setLoading(false)
}

onMounted(() => {
  search.value?.focus()
})
</script>

<template>
  <app-dialog :open="searchStore.opened" size="2xl" @close="searchStore.closeDialog()">
    <div class="mx-auto max-w-3xl transform divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-xl bg-white dark:bg-gray-800 md:shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
      <div class="absolute top-0 right-0">
        <span
          style="opacity: 1"
          class="rounded-md border border-gray-300 dark:border-gray-600 py-0.5 px-1.5 text-sm leading-5 text-gray-400 block m-2"
        >
          <span class="sr-only">Press</span>
          <kbd class="font-sans">
            <abbr title="Escape" class="no-underline">Esc</abbr>
          </kbd>
          <span class="sr-only">to quit search</span>
        </span>
      </div>
      <search-dialog-bar v-model="query" />
      <div v-if="results">
        <search-dialog-results v-if="results.count && results.count > 0" :search="results" />
        <search-dialog-empty-state v-if="searchStore.firstSearch && results.count === 0" />
      </div>
    </div>
  </app-dialog>
</template>

<style lang="css" scoped>
abbr {
  @apply no-underline;
}
.search {
  @apply block w-full rounded-md border py-2 pl-10 pr-3 leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm;
  @apply border-gray-200 text-gray-900 placeholder-gray-500 focus:border-white focus:ring-white focus:ring-offset-gray-600;
}
.dark .search {
  @apply border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-gray-400;
}
</style>
