<template>
  <projects-layout>
    <div class="px-5 mb-5">
      <autocomplete
        ref="search"
        v-click-outside="onClickOutside"
        :search="search"
        placeholder="Search for a book, a serie or an author"
        aria-label="Search for a book, a serie or an author"
        :get-result-value="getResultValue"
        @submit="handleSubmit"
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
    </div>
    <div>
      <div v-if="false" class="grid grid-cols-5">
        <nuxt-image
          v-for="book in booksFull.data"
          :key="book.id"
          :alt="book.title"
          :src="book.cover.thumbnail"
          class="cover"
          placeholder
        />
      </div>
      <books-grid class="px-5" :books="books.data" />
      <pagination
        :link-gen="linkGen"
        :pages="pages"
        :current-page="currentPage"
        :limit="5"
        class="flex justify-center mt-8"
      >
      </pagination>
    </div>
  </projects-layout>
</template>

<script>
import qs from 'qs'
import vClickOutside from 'v-click-outside'
import ProjectsLayout from '~/components/blocks/projects-layout.vue'
import Pagination from '~/components/special/pagination.vue'
import BooksGrid from '~/components/blocks/books-grid.vue'

export default {
  name: 'Books',
  components: {
    ProjectsLayout,
    // eslint-disable-next-line vue/no-unused-components
    Pagination,
    BooksGrid,
  },
  auth: 'auth',
  layout: 'auth',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  async fetch() {
    this.booksFull = await fetch(`${process.env.API_URL}books`).then((res) =>
      res.json()
    )
  },
  async asyncData({ app, query, error, $content, store }) {
    try {
      // const booksRaw = {}
      // const booksStore = store.state.books
      // if (booksStore.length < 1) {
      //   const [books] = await Promise.all([app.$axios.$get(`books`)])
      //   store.commit('setBooks', books.data)
      // } else {
      //   console.log('detect books in store!')
      // }

      // let books = {}
      // if (booksStore.length < 1) {
      const page = query.page
      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            page: page || 1,
            perPage: 12,
          })}`
        ),
      ])
      // store.commit('setBooks', books)
      // booksRaw = books
      // } else {
      //   console.log('detect books in store!')
      //   booksRaw = booksStore
      // }
      // console.log(booksRaw)
      return {
        books,
        pages: books.meta.last_page,
        currentPage: books.meta.current_page,
      }
    } catch (error) {
      console.error(error)

      return {
        books: [],
        pages: 0,
        currentPage: 0,
      }
    }
  },
  data() {
    return {
      pinnedProjectDropdownOpened: false,
      projectDropdownOpened: false,
      // old
      isLoading: false,
      apiData: null,
      menuIsOpen: false,
      profileDropdownIsOpen: false,
      layerMenuIsDisplayed: false,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      offset: 4,
      pagination: {},
      wikiUrl: 'https://en.wikipedia.org',
      params: 'action=query&list=search&format=json&origin=*',
      booksFull: [],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    // search(input) {
    //   if (input.length < 1) {
    //     return []
    //   }
    //   // const books = []
    //   // this.books.data.forEach((book) => {
    //   //   books.push(book.title)
    //   // })
    //   // console.log(books)
    //   return this.booksSearch.data.filter((book) => {
    //     // console.log(book.title.startsWith(input.toLowerCase()))

    //     console.log(book)
    //     console.log(input.toLowerCase())
    //     return book.title.toLowerCase().startsWith(input.toLowerCase())
    //   })
    // },
    search(input) {
      const url = `${process.env.API_URL}books/search?${qs.stringify({
        'search-term': input,
      })}`

      return new Promise((resolve) => {
        if (input.length < 3) {
          return resolve([])
        }

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            resolve(data.data)
          })
      })
    },
    getResultValue(result) {
      return result.title
    },
    handleSubmit(result) {
      // window.open(
      //   `${process.env.BASE_URL}/books/${result.author.slug}/${result.slug}`
      // )
      return {
        name: 'books-slug',
        query: { author: result.author.slug, slug: result.slug },
      }
    },
    // handleUpdate(result, selectedIndex) {
    //   console.log(selectedIndex)
    //   console.log(result)
    // },
    onClickOutside(event) {
      // this.$refs.search.$el.children[0].childNodes[0]
    },
    linkGen(pageNum) {
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum },
      }
    },
  },
  watchQuery: ['page'],
}
</script>
