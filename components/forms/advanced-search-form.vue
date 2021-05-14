<template>
  <form @submit.prevent="submit">
    <div class="mb-5">
      You can define advanced search here, select details with fields, in main
      search bar you can search any book's title, any series' title or any
      author's name.
    </div>
    <div class="flex items-center pb-6 m-auto w-max">
      <label for="search" class="sr-only">Advanced search</label>
      <div
        class="relative flex text-light-primary-100 focus-within:text-gray-400"
      >
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg-icon name="magnify-glass" class="w-5 h-5 text-gray-300" />
        </div>
        <input
          id="search"
          v-model="search"
          name="search"
          class="block py-4 pl-10 pr-3 border border-gray-300 rounded-md w-96 focus:ring-0 focus:outline-none focus:ring-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
          placeholder="Search"
          type="search"
        />
        <button
          class="px-3 ml-2 text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-700"
          type="submit"
        >
          Search
        </button>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4 my-10">
      <autocomplete-authors @author="author" />
      <autocomplete-languages @author="author" />
      <autocomplete-tags @tag="tag" />
      <div>isbn</div>
      <div>serie</div>
    </div>
    <section class="grid grid-cols-3 gap-y-10">
      <div>
        <div class="block mb-1 text-sm font-semibold text-gray-700">
          Author selected
        </div>
        <div class="flex items-center h-10 mt-2">
          <img
            :src="
              validAuthor
                ? validAuthor.picture.base
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
            <span v-if="validLanguages.length"></span>
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
            <span
              v-if="validTags.length"
              class="block py-1 overflow-y-auto max-h-64"
            >
              <div class="flex flex-wrap space-x-1">
                <span
                  v-for="tagValue in validTags"
                  :key="tagValue.id"
                  class="flex items-center px-2 py-1 my-1 bg-gray-200 rounded-full w-max"
                >
                  <span>{{ tagValue.name }}</span>
                  <svg-icon name="cross" class="w-3 h-3 ml-2" />
                </span>
              </div>
            </span>
            <span v-else>Any tags</span>
          </div>
        </div>
      </div>
      <div>
        <div class="block mb-1 text-sm font-semibold text-gray-700">ISBN</div>
        <div class="flex items-center h-10 mt-2">
          <div class="font-semibold">
            <span v-if="validIsbn"></span>
            <span v-else>Any ISBN</span>
          </div>
        </div>
      </div>
      <div>
        <div class="block mb-1 text-sm font-semibold text-gray-700">
          Series selected
        </div>
        <div class="flex items-center h-10 mt-2">
          <div class="font-semibold">
            <span v-if="validSerie"></span>
            <span v-else>Any series</span>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<script>
import autocompleteAuthors from './search/autocomplete-authors.vue'
import AutocompleteLanguages from './search/autocomplete-languages.vue'
import AutocompleteTags from './search/autocomplete-tags.vue'
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
      validSerie: null,
    }
  },
  methods: {
    author(author) {
      this.validAuthor = author
    },
    tag(tag) {
      console.log(tag)
      if (!this.containsObject(tag, this.validTags)) {
        this.validTags.push(tag)
      }
    },
    submit() {},
    containsObject(obj, list) {
      let i
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true
        }
      }

      return false
    },
    advancedSearch() {},
  },
}
</script>
