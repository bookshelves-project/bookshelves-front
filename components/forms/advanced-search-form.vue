<template>
  <form @submit.prevent="submit">
    <div class="mx-auto sm:flex sm:items-center w-max">
      <div class="relative md:max-w-lg w-96">
        <label for="search" class="sr-only">Search</label>
        <div
          class="
            absolute
            inset-y-0
            left-0
            flex
            items-center
            pl-3
            pointer-events-none
          "
        >
          <svg-icon name="magnify-glass" class="w-5 h-5 text-gray-300" />
        </div>
        <input
          id="search"
          v-model="search"
          type="search"
          name="search"
          class="
            block
            w-full
            pl-10
            border-gray-300
            rounded-md
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
          "
          placeholder="Advanced search"
        />
      </div>
      <button
        type="submit"
        class="
          inline-flex
          items-center
          justify-center
          w-full
          px-4
          py-2
          mt-3
          font-medium
          text-white
          bg-indigo-600
          border border-transparent
          rounded-md
          shadow-sm
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
        "
      >
        Search
      </button>
    </div>
    <p class="max-w-lg mx-auto mt-3 text-gray-400">
      On advanced search, you can define your search (any book's title, any
      series' title or ISBN) and select details with fields.
    </p>
    <div class="relative flex items-end mt-8">
      <div class="flex items-center h-5">
        <input
          id="conditions"
          v-model="form.onlySerie"
          name="conditions"
          type="checkbox"
          class="
            w-4
            h-4
            border-gray-300
            rounded
            text-primary-600
            focus:ring-primary-600
          "
        />
      </div>
      <div class="ml-3 text-sm">
        <label for="conditions" class="font-medium text-gray-700"
          >Only series ?</label
        >
      </div>
    </div>
    <div>
      <div class="grid grid-cols-3 gap-4 my-10">
        <autocomplete-authors @author="author" />
        <autocomplete-languages @lang="lang" />
        <autocomplete-tags @tag="tag" />
      </div>
      <section class="grid grid-cols-3 gap-y-32">
        <div>
          <div class="block mb-1 text-sm font-semibold text-gray-700">
            Author selected
          </div>
          <div class="flex items-center h-10 mt-2">
            <img
              :src="
                validAuthor
                  ? validAuthor.picture.thumbnail
                  : '/images/author-no-picture.svg'
              "
              :alt="validAuthor ? validAuthor.name : 'Any'"
              :title="validAuthor ? validAuthor.name : 'Any'"
              class="object-cover w-10 h-10 rounded-full"
            />
            <div class="ml-2 font-semibold">
              <span v-if="validAuthor">{{ validAuthor.name }}</span>
              <span v-else>Any author</span>
            </div>
          </div>
        </div>
        <div>
          <div class="block mb-1 text-sm font-semibold text-gray-700">
            Languages selected
          </div>
          <div class="flex items-center h-10 mt-2">
            <div class="font-semibold">
              <span v-if="validLanguages.length">
                <div class="flex flex-wrap space-x-1">
                  <span
                    v-for="languageValue in validLanguages"
                    :key="languageValue.id"
                    class="
                      flex
                      items-center
                      px-2
                      py-1
                      my-1
                      bg-gray-200
                      rounded-full
                      w-max
                    "
                  >
                    <span>{{ languageValue.name }}</span>
                    <svg-icon
                      name="cross"
                      class="w-3 h-3 ml-2"
                      @click="remove(languageValue, 'validLanguages')"
                    />
                  </span>
                </div>
              </span>
              <span v-else>Any language</span>
            </div>
          </div>
        </div>
        <div>
          <div class="block mb-1 text-sm font-semibold text-gray-700">
            Tags selected
          </div>
          <div class="flex items-center h-10 mt-2">
            <div class="w-full font-semibold">
              <span v-if="validTags.length" class="block py-1 overflow-y-auto">
                <div class="flex flex-wrap space-x-1">
                  <span
                    v-for="tagValue in validTags"
                    :key="tagValue.id"
                    class="
                      flex
                      items-center
                      px-2
                      py-1
                      my-1
                      bg-gray-200
                      rounded-full
                      w-max
                    "
                  >
                    <span>{{ tagValue.name }}</span>
                    <svg-icon
                      name="cross"
                      class="w-3 h-3 ml-2"
                      @click="remove(tagValue, 'validTags')"
                    />
                  </span>
                </div>
              </span>
              <span v-else>Any tags</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </form>
</template>

<script>
import autocompleteAuthors from './search/autocomplete-authors.vue'
import AutocompleteLanguages from './search/autocomplete-languages.vue'
import AutocompleteTags from './search/autocomplete-tags.vue'
import { containsObject } from '~/plugins/utils/methods'
export default {
  name: 'AdvancedSearchForm',
  components: { autocompleteAuthors, AutocompleteTags, AutocompleteLanguages },
  data() {
    return {
      search: null,
      validAuthor: null,
      validLanguages: [],
      validTags: [],
      validIsbn: null,
      containsObject,
      form: {
        author: null,
        languages: [],
        tags: [],
        onlySerie: false,
      },
    }
  },
  methods: {
    remove(item, array) {
      this[array] = this[array].filter(function (obj) {
        return obj.name !== item.name
      })
    },
    author(author) {
      this.validAuthor = author
    },
    lang(lang) {
      if (lang) {
        if (!this.containsObject(lang, this.validLanguages)) {
          this.validLanguages.push(lang)
        }
      }
    },
    tag(tag) {
      if (tag) {
        if (!this.containsObject(tag, this.validTags)) {
          this.validTags.push(tag)
        }
      }
    },
    submit() {
      // tags
      const tags = []
      this.validTags.forEach((validTag) => {
        tags.push(validTag.meta.slug)
      })
      // langs
      const langs = []
      this.validLanguages.forEach((validLanguage) => {
        langs.push(validLanguage.meta.slug)
      })

      const search = {
        q: this.search,
        'only-serie': this.form.onlySerie,
      }

      if (this.validAuthor) {
        search.author = this.validAuthor.meta.slug
      }
      if (tags.length) {
        search.tags = tags.join()
      }
      if (langs.length) {
        search.languages = langs.join()
      }

      this.$emit('advancedSearch', search)
    },
  },
}
</script>
