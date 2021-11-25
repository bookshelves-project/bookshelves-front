<template>
  <div class="relative">
    <div class="relative mx-6 my-8">
      <h2 class="text-2xl font-semibold font-handlee text-primary-600 mb-2">
        Search
      </h2>
      <div class="italic text-gray-600 dark:text-gray-400">
        You can search an <b>author's name</b>, a <b>series' title</b>, a
        <b>book's title</b> or <b>ISBN</b>. You will have some results sorted by
        relevance, three best results in each type and other results.
      </div>
      <div class="absolute top-0 right-0">
        <span
          style="opacity: 1"
          class="
            hidden
            sm:block
            text-gray-400 text-sm
            leading-5
            py-0.5
            px-1.5
            border border-gray-300
            rounded-md
          "
          ><span class="sr-only">Press </span
          ><kbd class="font-sans"
            ><abbr title="Escape" class="no-underline">Esc </abbr></kbd
          ><span class="sr-only"> to quit search</span></span
        >
      </div>
    </div>
    <div class="mt-6 m-4">
      <div
        class="
          relative
          w-full
          text-gray-400
          focus-within:text-gray-600
          dark:focus-within:text-gray-500
        "
      >
        <div
          class="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            pl-3
            flex
            items-center
          "
        >
          <svg-icon name="magnify-glass" class="w-5 h-5" />
        </div>
        <input
          id="search"
          ref="search"
          v-model="search"
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
            class="absolute right-2.5 top-1/2 transform -translate-y-1/2"
          >
            <app-loading class="w-5 h-5" />
          </div>
        </transition>
      </div>
      <div class="mt-3 flex items-center justify-end space-x-3 text-gray-400">
        <div>Keep results in types</div>
        <fields-checkbox
          v-model="form.authors"
          name="authors"
          label="Authors"
        />
        <fields-checkbox v-model="form.series" name="series" label="Series" />
        <fields-checkbox v-model="form.books" name="books" label="Books" />
      </div>
    </div>
    <div
      class="mt-6"
      :class="{ 'border-t border-b border-gray-200': results.length }"
    >
      <div
        v-if="results.count"
        class="mb-3 text-center text-gray-600 dark:text-gray-400 mt-2"
      >
        {{ results.count }} results
      </div>
      <div class="max-h-[30rem] overflow-y-scroll scrollbar-thin px-6">
        <layout-search-bar-results
          :results="results"
          title="More relevant authors"
        />
        <layout-search-bar-results
          :results="results"
          type="series"
          title="More relevant series"
        />
        <layout-search-bar-results
          :results="results"
          type="books"
          title="More relevant books"
        />
        <layout-search-bar-results
          :results="results"
          category="other"
          title="Other authors"
        />
        <layout-search-bar-results
          :results="results"
          category="other"
          type="series"
          title="Other series"
        />
        <layout-search-bar-results
          :results="results"
          category="other"
          type="books"
          title="Other books"
        />
      </div>
    </div>
    <div class="mx-6 my-4">
      <div v-if="results.type" class="flex items-center">
        <div class="ml-auto font-semibold">Powered by</div>
        <a
          v-if="results.type === 'meilisearch'"
          href="https://www.meilisearch.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center hover:bg-gray-100 p-1 rounded-md"
        >
          <img
            src="/images/search/meilisearch.svg"
            alt="MeiliSearch-logo"
            class="object-contain h-8"
          />
          <img
            src="/images/search/meilisearch-text.svg"
            alt="MeiliSearch"
            class="object-contain h-3 ml-1"
          />
        </a>
        <a
          v-else
          href="https://laravel.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center hover:bg-gray-100 p-1 rounded-md"
        >
          <img
            src="/images/search/laravel.svg"
            alt="MeiliSearch-logo"
            class="object-contain h-6"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'LayoutSearchBarModal',
  data() {
    return {
      search: '',
      loading: false,
      results: [],
      firstSearch: false,
      form: {
        authors: true,
        series: true,
        books: true,
      },
    }
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue.length >= 3) {
        this.searchResults(newValue)
      }
    },
  },
  mounted() {
    this.$refs.search.focus()
  },
  methods: {
    async searchResults(input) {
      this.loading = true
      const types = []
      for (const [key, value] of Object.entries(this.form)) {
        if (value) {
          types.push(key)
        }
      }

      try {
        this.firstSearch = true
        const data = await this.$axios.$get(
          `/search?${qs.stringify({
            q: input,
            types: types.join(','),
          })}`
        )
        this.results = data.data
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
  },
}
</script>
