<script setup lang="ts">
import LayoutSearchResults from '@/components/layout/search/results.vue'
import FieldCheckbox from '@/components/field/checkbox.vue'
import AppLoading from '@/components/app/loading.vue'

const { nuxtAsyncData } = useFetchable()

const emit = defineEmits<{
  (e: 'close', status: boolean): void
}>()

const search = ref<HTMLInputElement>()
const query = ref('')
const loading = ref(false)
const results = ref<Search>()
const firstSearch = ref(false)
const form = ref({
  authors: true,
  series: true,
  books: true,
})

watch(
  () => query.value,
  (newVal) => {
    if (newVal.length >= 3) {
      fetchResults(newVal)
    }
  }
)

const fetchResults = async (input: string) => {
  loading.value = true
  const types = []
  for (const [key, value] of Object.entries(form.value)) {
    if (value) {
      types.push(key)
    }
  }

  try {
    firstSearch.value = true
    const data = await nuxtAsyncData<Search>('/entities/search', [], {
      q: input,
      types: types.join(','),
    })

    results.value = data
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}
const close = () => {
  emit('close', false)
}
const list = computed(() => [
  {
    key: results.value?.relevant?.authors,
    title: 'More relevant authors',
  },
  {
    key: results.value?.relevant?.series,
    title: 'More relevant series',
  },
  {
    key: results.value?.relevant?.books,
    title: 'More relevant authors',
  },
  {
    key: results.value?.other?.authors,
    title: 'Other authors',
  },
  {
    key: results.value?.other?.series,
    title: 'Other series',
  },
  {
    key: results.value?.other?.books,
    title: 'Other books',
  },
])

onMounted(() => {
  search.value?.focus()
})
</script>

<template>
  <div class="relative">
    <div class="relative m-2 md:mx-4 md:my-5">
      <h2
        class="mb-2 font-handlee text-2xl font-semibold text-primary-600 dark:text-primary-500"
      >
        Search
      </h2>
      <div class="italic text-gray-600 dark:text-gray-400">
        You can search an
        <b>author's name</b>, a <b>series' title</b>, a <b>book's title</b> or
        <b>ISBN</b>. You will have some results sorted by relevance, three best
        results in each type and other results.
      </div>
      <div class="absolute top-0 right-0">
        <span
          style="opacity: 1"
          class="hidden rounded-md border border-gray-300 py-0.5 px-1.5 text-sm leading-5 text-gray-400 sm:block"
        >
          <span class="sr-only">Press</span>
          <kbd class="font-sans">
            <abbr title="Escape" class="no-underline">Esc</abbr>
          </kbd>
          <span class="sr-only">to quit search</span>
        </span>
      </div>
    </div>
    <div class="m-2 md:m-4 md:mt-6">
      <div
        class="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-500"
      >
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          id="search"
          ref="search"
          v-model="query"
          class="search"
          aria-autocomplete="list"
          aria-labelledby="books-label"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          placeholder="Search (3 characters min.)"
          maxlength="64"
          type="search"
          enterkeyhint="go"
        />
        <transition name="fade">
          <div
            v-if="loading"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 transform"
          >
            <app-loading class="h-5 w-5" />
          </div>
        </transition>
      </div>
      <div
        class="mt-3 items-center justify-end space-y-3 text-gray-400 md:flex md:space-y-0 md:space-x-3"
      >
        <div>Keep results in types</div>
        <field-checkbox v-model="form.authors" name="authors" label="Authors" />
        <field-checkbox v-model="form.series" name="series" label="Series" />
        <field-checkbox v-model="form.books" name="books" label="Books" />
      </div>
    </div>
    <div
      v-if="results"
      class="mt-6"
      :class="{
        'border-t border-b border-gray-200 dark:border-gray-700': results,
      }"
    >
      <div
        v-if="results.count"
        class="mb-3 mt-2 text-center text-gray-600 dark:text-gray-400"
      >
        {{ results.count }} results
      </div>
      <div
        class="h-full px-2 scrollbar-thin md:max-h-[30rem] md:overflow-y-scroll md:px-6"
      >
        <layout-search-results
          v-for="(item, index) in list"
          :key="index"
          :entities="item.key"
          :title="item.title"
          @close="close"
        />
      </div>
    </div>
    <!-- <div v-if="results" class="hidden md:mx-6 md:my-4 md:block">
      <div v-if="results.type" class="flex items-center">
        <div class="ml-auto mr-1 font-semibold">Powered by</div>
        <a
          v-if="results.type === 'meilisearch'"
          href="https://www.meilisearch.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            src="/images/search/meilisearch-logo.svg"
            alt="MeiliSearch-logo"
            class="h-6 object-contain"
          />
          <img
            src="/images/search/meilisearch-text.svg"
            alt="MeiliSearch"
            class="ml-1 h-3 object-contain"
          />
        </a>
        <a
          v-else
          href="https://laravel.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            src="/images/search/laravel.svg"
            alt="MeiliSearch-logo"
            class="h-6 object-contain"
          />
        </a>
      </div>
    </div> -->
  </div>
</template>
