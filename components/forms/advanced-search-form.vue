<template>
  <form @submit.prevent="advancedSearch">
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
        <div class="flex items-center h-10 mt-4">
          <div class="w-full font-semibold">
            <span
              v-if="validTags.length"
              class="block py-1 overflow-y-auto max-h-20"
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
    <div class="grid grid-cols-5 my-10">
      <div class="max-w-xs">
        <autocomplete-authors @author="author" />
      </div>
      <div>lang</div>
      <autocomplete-tags @tag="tag" />
      <div>isbn</div>
      <div>serie</div>
    </div>
  </form>
</template>

<script>
import autocompleteAuthors from './search/autocomplete-authors.vue'
import AutocompleteTags from './search/autocomplete-tags.vue'
export default {
  name: 'AdvancedSearchForm',
  components: { autocompleteAuthors, AutocompleteTags },
  data() {
    return {
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
