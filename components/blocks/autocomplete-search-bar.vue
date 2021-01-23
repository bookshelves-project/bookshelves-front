<template>
  <div class="relative">
    <autocomplete
      ref="search"
      v-click-outside="onClickOutside"
      :search="search"
      placeholder="Search for a book, a serie or an author"
      aria-label="Search for a book, a serie or an author"
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
              <nuxt-image
                v-if="result.cover.thumbnail"
                :alt="result.title"
                :src="result.cover.thumbnail"
                class="w-16 h-16 rounded-md"
                placeholder
              />
              <nuxt-image
                v-else
                src="/images/no-cover.webp"
                alt="bookshelves-default"
                class="w-16 h-16 rounded-md"
                placeholder
              />
            </div>
            <div class="ml-2">
              <div class="font-semibold wiki-title">{{ result.title }}</div>
              <div class="flex">
                <div v-if="result.author">by {{ result.author.name }}</div>
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
      class="absolute transform -translate-y-1/2 right-5 top-1/2"
    />
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'AutocompleteSearchBar',
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
        'search-term': input,
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
      console.log(result)
      this.$emit('searching', this.searchResults)
      if (result === undefined) {
        console.log('router push')
        this.$router.push({
          name: 'search',
          query: { 'search-terms': this.searchTerm },
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
      // this.$refs.search.$el.children[0].childNodes[0]
    },
  },
}
</script>

<style lang="postcss" scoped></style>
