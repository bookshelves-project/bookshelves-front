<template>
  <div v-click-outside="onClickOutside">
    <div class="relative mb-3">
      <label
        id="listbox-label"
        class="block pl-1 mb-1 text-sm font-semibold text-gray-700"
      >
        Author search
      </label>
      <div class="relative">
        <input
          v-model="author"
          name="author"
          :class="showList ? '' : 'rounded-b-md'"
          class="
            relative
            w-full
            py-2
            pl-3
            pr-10
            text-left
            transition-transform
            duration-100
            transform
            bg-white
            border border-gray-300
            shadow-sm
            rounded-t-md
            focus:outline-none
            focus:ring-1
            focus:ring-indigo-500
            focus:border-indigo-500
            sm:text-sm
          "
          placeholder="Search an author by name"
          type="search"
          autocomplete="off"
          @click="openList"
        />
        <transition name="fade">
          <button
            v-if="author !== ''"
            type="button"
            class="
              absolute
              p-1
              transition-colors
              duration-100
              transform
              -translate-y-1/2
              bg-gray-100
              rounded-full
              hover:bg-gray-200
              right-2
              top-1/2
            "
            @click="clear"
          >
            <svg-icon name="cross" class="w-4 h-4 text-gray-700" />
          </button>
        </transition>
      </div>
      <transition name="fade">
        <div
          v-if="showList && validate"
          class="
            absolute
            w-full
            overflow-y-auto
            border border-gray-500
            max-h-64
            rounded-b-md
          "
        >
          <ul class="bg-white shadow-sm">
            <li
              v-for="authorValue in authors"
              :key="authorValue.id"
              class="
                p-2
                py-1
                font-semibold
                transition-colors
                duration-100
                cursor-pointer
                hover:bg-gray-200
              "
              @click="valid(authorValue)"
            >
              <div class="flex items-center">
                <img
                  :src="authorValue.cover.thumbnail"
                  :alt="authorValue.name"
                  :title="authorValue.name"
                  class="object-cover w-10 h-10 rounded-full"
                />
                <div class="ml-2">
                  {{ authorValue.lastname }} {{ authorValue.firstname }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import { filter, flow, values, partialRight, some, method } from 'lodash'

export default {
  name: 'AutocompleteAuthors',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      showList: false,
      author: '',
      authors: [],
      fullAuthors: [],
      validate: true,
      validAuthor: null,
    }
  },
  watch: {
    author(newValue, oldValue) {
      if (this.author.length >= 1) {
        this.authors = this.filterByValue(this.fullAuthors, this.author)
        this.showList = true
      } else {
        this.showList = false
        this.authors = []
      }
    },
  },
  async created() {
    await this.formatAuthors()
  },
  methods: {
    openList() {
      if (this.authors.length) {
        this.showList = true
      }
    },
    filterByValue(coll, value) {
      return filter(
        coll,
        flow(
          values,
          partialRight(some, method('match', new RegExp(value, 'i')))
        )
      )
    },
    async formatAuthors(query) {
      if (!this.authors.length) {
        const authors = await this.$axios.$get(`/authors?limit=full`)

        this.fullAuthors = authors.data
      } else {
        this.showList = true
      }
    },
    onClickOutside() {
      this.showList = false
    },
    clear() {
      this.author = ''
      this.showList = false
      this.validAuthor = null
      this.$emit('author', null)
    },
    valid(author) {
      // this.author = author.name
      this.validAuthor = author
      this.validate = false
      setTimeout(() => {
        this.showList = false
        this.validate = true
      }, 50)
      this.$emit('author', this.validAuthor)
    },
  },
}
</script>
