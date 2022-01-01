<template>
  <div v-click-outside="onClickOutside">
    <div class="relative mb-3">
      <label
        id="listbox-label"
        class="block pl-1 mb-1 text-sm font-semibold text-gray-700"
      >
        Languages search
      </label>
      <div class="relative">
        <input
          v-model="language"
          name="language"
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
            focus:ring-primary-500
            focus:border-primary-500
            sm:text-sm
          "
          placeholder="Search any tag"
          type="search"
          autocomplete="off"
          @click="openList"
        />
        <transition name="fade">
          <button
            v-if="language !== ''"
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
              v-for="languageValue in languages"
              :key="languageValue.id"
              class="
                p-2
                py-1
                font-semibold
                transition-colors
                duration-100
                cursor-pointer
                hover:bg-gray-200
              "
              @click="valid(languageValue)"
            >
              {{ languageValue.name }}
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
  name: 'AutocompleteLanguages',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      showList: false,
      language: '',
      languages: [],
      fullLanguages: [],
      validate: true,
      validLanguage: null
    }
  },
  watch: {
    language(newValue, oldValue) {
      if (this.language.length >= 1) {
        this.languages = this.filterByValue(this.fullLanguages, this.language)
        this.showList = true
      } else {
        this.showList = false
        this.languages = []
      }
    }
  },
  async created() {
    await this.formatLanguages()
  },
  methods: {
    openList() {
      if (this.languages.length) {
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
    async formatLanguages(query) {
      if (!this.languages.length) {
        const languages = await this.$axios.$get('/languages')

        this.fullLanguages = languages.data
      } else {
        this.showList = true
      }
    },
    onClickOutside() {
      this.showList = false
    },
    clear() {
      this.language = ''
      this.showList = false
      this.validLanguage = null
      this.$emit('lang', null)
    },
    valid(language) {
      // this.language = language.name
      this.validLanguage = language
      this.validate = false
      setTimeout(() => {
        this.showList = false
        this.validate = true
      }, 50)
      this.$emit('lang', this.validLanguage)
    }
  }
}
</script>
