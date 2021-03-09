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
              <div
                v-bind="props"
                class="flex items-center autocomplete-result wiki-result"
              >
                <div class="grid grid-cols-3 gap-4">
                  <div class="col-span-1">
                    <img
                      v-if="result.image"
                      v-lazy="result.image"
                      :alt="result.title"
                      class="inline-block object-cover rounded-full h-14 w-14"
                    />
                  </div>
                  <div class="col-span-2 dark:text-gray-700">
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
        <!-- <icon
          name="magnify-glass"
          class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
        /> -->
        <button
          class="absolute px-2 mx-2 font-semibold text-white transform -translate-y-1/2 rounded-r-md -right-12 top-1/2 bg-primary-600"
          style="padding-top: 0.45rem; padding-bottom: 0.45rem"
          @click="searchWithButton"
        >
          <svg
            class="w-6 h-6"
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
        query: { terms: querySearch },
      })
    },
    search(input) {
      const method = this.searchMethod[this.method]
      const url = `${process.env.API_URL}/api/${method}?${qs.stringify({
        terms: input,
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
          query: { terms: this.searchTerm },
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
      // console.log('Clicked utside. Event: ', event)
      this.$refs.search.setValue('')
    },
  },
}
</script>

<style lang="postcss">
.searchbar-navbar {
  & input {
    @apply w-40 sm:w-48 md:w-64 ml-auto transition-all duration-300 focus:w-full !important;
  }
}
</style>
