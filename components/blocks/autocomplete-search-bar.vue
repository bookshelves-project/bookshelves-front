<template>
  <div v-click-outside="onClickOutside">
    <div class="relative flex items-center justify-end mr-10">
      <div class="relative w-full">
        <autocomplete
          ref="search"
          :search="search"
          placeholder="Search for a book, a series or an author"
          aria-label="Search for a book, a series or an author"
          :get-result-value="getResultValue"
          class="searchbar-navbar"
          @submit="handleSubmit"
          @update="handleUpdate"
        >
          <template #result="{ result, props }">
            <nuxt-link
              :to="{
                name: `${result.meta.entity}s-slug`,
                params: { author: result.meta.author, slug: result.meta.slug },
              }"
            >
              <div v-bind="props" class="autocomplete-result wiki-result">
                <div class="grid grid-cols-5 gap-4">
                  <div class="col-span-1">
                    <div class="overflow-hidden">
                      <img
                        v-lazy="result.picture"
                        :alt="result.title"
                        class="object-cover rounded-full h-14 w-14"
                      />
                    </div>
                  </div>
                  <div class="col-span-4 overflow-hidden dark:text-gray-700">
                    <div class="wiki-title">
                      <div class="font-semibold">
                        {{ result.title }}
                      </div>
                      <div class="italic">
                        {{ $capitalize(result.meta.entity) }}
                      </div>
                    </div>
                    <div class="">
                      <div v-if="result.serie" class="ml-1">
                        in {{ result.serie.title }}, vol.
                        {{ result.serie.number }}
                      </div>
                    </div>
                    <div class="wiki-snippet" v-html="result.snippet" />
                  </div>
                </div>
              </div>
            </nuxt-link>
          </template>
        </autocomplete>
        <button
          type="button"
          class="absolute px-2 mx-2 font-semibold text-white transform -translate-y-1/2 rounded-r-md -right-12 top-1/2 bg-primary-600"
          style="padding-top: 0.45rem; padding-bottom: 0.45rem"
          aria-label="Search"
          @click="searchWithButton"
        >
          <svg-icon name="magnify-glass" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import vClickOutside from 'v-click-outside'

export default {
  name: 'AutocompleteSearchBar',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    method: {
      type: String,
      default: 'global',
    },
  },
  data() {
    return {
      searchTerm: null,
      searchResults: [],
      searchMethod: {
        global: 'search',
        book: 'search-book',
        author: 'search-author',
        serie: 'search-serie',
      },
    }
  },
  mounted() {
    this.$refs.search.$refs.input.name = 'search'
    this.$refs.search.$refs.input.type = 'search'
  },
  methods: {
    searchWithButton() {
      const querySearch = this.$refs.search.value
      this.$router.push({
        name: 'search',
        query: { q: querySearch },
      })
    },
    search(input) {
      const method = this.searchMethod[this.method]
      const url = `${process.env.API_URL}/${method}?${qs.stringify({
        q: input,
      })}`

      this.searchTerm = input

      const searchingResults = new Promise((resolve) => {
        if (input.length < 3) {
          return resolve([])
        }

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            resolve(data.data)
          })
      })

      return searchingResults
    },
    getResultValue(result) {
      return result
    },
    handleSubmit(result) {
      if (result === undefined) {
        this.$refs.search.setValue('')
        this.$router.push({
          name: 'search',
          query: { q: this.searchTerm },
        })
      } else {
        this.$refs.search.setValue('')
        this.$router.push({
          name: `${result.meta.entity}s-slug`,
          params: { author: result.meta.author, slug: result.meta.slug },
        })
      }
    },
    handleUpdate(result) {
      this.searchResults = result
    },
    onClickOutside(event) {
      this.$refs.search.setValue('')
    },
  },
}
</script>

<style lang="postcss">
/* .searchbar-navbar {
  & input {
    @apply w-40 sm:w-48 md:w-64 ml-auto transition-all duration-300 focus:w-full !important;
  }
} */
</style>
