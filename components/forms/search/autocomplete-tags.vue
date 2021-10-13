<template>
  <div v-click-outside="onClickOutside">
    <!-- <select id="tags" multiple>
      <option value="value 1">Value 1</option>
      <option value="value 2">Value 2</option>
      <option value="value 3">Value 3</option>
    </select> -->
    <div class="relative mb-3">
      <label
        id="listbox-label"
        class="block pl-1 mb-1 text-sm font-semibold text-gray-700"
      >
        Tags search
      </label>
      <div class="relative">
        <input
          v-model="tag"
          name="tag"
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
            v-if="tag !== ''"
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
              v-for="tagValue in tags"
              :key="tagValue.id"
              class="
                p-2
                py-1
                font-semibold
                transition-colors
                duration-100
                cursor-pointer
                hover:bg-gray-200
              "
              @click="valid(tagValue)"
            >
              {{ tagValue.name }}
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
  name: 'AutocompleteTags',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      showList: false,
      tag: '',
      tags: [],
      fullTags: [],
      validate: true,
      validTag: null,
    }
  },
  watch: {
    tag(newValue, oldValue) {
      if (this.tag.length >= 1) {
        this.tags = this.filterByValue(this.fullTags, this.tag)
        this.showList = true
      } else {
        this.showList = false
        this.tags = []
      }
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    // const SlimSelect = require('slim-select')
    // eslint-disable-next-line no-new
    // new SlimSelect({
    //   select: '#tags',
    // })
  },
  async created() {
    await this.getTags()
  },
  methods: {
    openList() {
      if (this.tags.length) {
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
    async getTags(query) {
      if (!this.tags.length) {
        const tags = await this.$axios.$get(`/tags`)

        this.fullTags = tags.data
      } else {
        this.showList = true
      }
    },
    onClickOutside() {
      this.showList = false
    },
    clear() {
      this.tag = ''
      this.showList = false
      this.validTag = null
      this.$emit('tag', null)
    },
    valid(tag) {
      // this.tag = tag.name
      this.validTag = tag
      this.validate = false
      setTimeout(() => {
        this.showList = false
        this.validate = true
      }, 50)
      this.$emit('tag', this.validTag)
    },
  },
}
</script>
