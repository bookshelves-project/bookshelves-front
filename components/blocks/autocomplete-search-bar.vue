<template>
  <div v-click-outside="onClickOutside" class="relative">
    <autocomplete
      ref="search"
      :search="search"
      placeholder="Search for a book, a series or an author"
      aria-label="Search for a book, a series or an author"
      :get-result-value="getResultValue"
      @submit="handleSubmit"
      @update="handleUpdate"
    >
      <template #result="{ result, props }">
        <nuxt-link
          :to="{
            name: 'books-slug',
            params: { author: result.author.slug, slug: result.slug },
          }"
        >
          <div
            v-bind="props"
            class="flex items-center autocomplete-result wiki-result"
          >
            <div class="w-16 h-full">
              <!-- <nuxt-picture
                v-if="result.cover.thumbnail"
                :alt="result.title"
                :src="result.cover.thumbnail"
                class="w-16 h-16 rounded-md"
                placeholder
              />
              <nuxt-picture
                v-else
                src="/images/no-cover.webp"
                alt="bookshelves-default"
                class="w-16 h-16 rounded-md"
                placeholder
              /> -->
              <img
                v-if="result.cover.thumbnail"
                v-lazy="result.cover.thumbnail"
                :alt="result.title"
                class="w-16 h-full rounded-md"
              />
              <img
                v-else
                src="/images/bookshelves.png"
                alt="bookshelves-default"
                class="w-16 h-16 rounded-md"
              />
            </div>
            <div class="ml-2">
              <div class="font-semibold wiki-title">
                {{ result.title }}
                <span v-if="result.author">by {{ result.author.name }}</span>
              </div>
              <div class="">
                <div v-if="result.serie" class="ml-1">
                  in {{ result.serie.title }}, vol. {{ result.serie.number }}
                </div>
              </div>
              <div class="wiki-snippet" v-html="result.snippet" />
            </div>
          </div>
        </nuxt-link>
      </template>
    </autocomplete>
    <icon
      name="magnify-glass"
      class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
    />
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
  methods: {
    search(input) {
      const method = this.searchMethod[this.method]
      const url = `${process.env.API_URL}${method}?${qs.stringify({
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
      return result.title
    },
    handleSubmit(result) {
      if (result === undefined) {
        this.$refs.search.setValue({ name: '', code: '' })
        this.$router.push({
          name: 'search',
          query: { terms: this.searchTerm },
        })
      } else {
        this.$router.push({
          name: 'books-slug',
          params: { author: result.author.slug, slug: result.slug },
        })
      }
    },
    handleUpdate(result) {
      this.searchResults = result
    },
    onClickOutside(event) {
      // console.log('Clicked utside. Event: ', event)
      this.$refs.search.setValue({ name: '', code: '' })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
