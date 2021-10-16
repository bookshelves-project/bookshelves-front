<template>
  <div v-click-outside="onClickOutside">
    <div class="relative mb-3">
      <label
        id="listbox-label"
        class="block pl-1 mb-1 text-sm font-semibold text-gray-700"
      >
        Entities search
      </label>
      <div class="relative">
        <input
          v-model="entity"
          name="entity"
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
          placeholder="Search an entity by name"
          type="search"
          autocomplete="off"
          @click="openList"
        />
        <transition name="fade">
          <button
            v-if="entity !== ''"
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
              v-for="entityValue in entities"
              :key="entityValue.id"
              class="
                p-2
                py-1
                font-semibold
                transition-colors
                duration-100
                cursor-pointer
                hover:bg-gray-200
              "
              @click="valid(entityValue)"
            >
              <div class="flex items-center">
                <app-img
                  :src="entityValue.cover.thumbnail"
                  :alt="entityValue.name"
                  :title="entityValue.name"
                  class="object-cover w-10 h-10 rounded-full"
                />
                <div class="ml-2">
                  {{ entityValue.lastname }} {{ entityValue.firstname }}
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
  name: 'AutocompleteEntity',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      showList: false,
      entity: '',
      entities: [],
      fullEntities: [],
      validate: true,
      validEntity: null,
    }
  },
  watch: {
    entity(newValue, oldValue) {
      if (this.entity.length >= 1) {
        this.entities = this.filterByValue(this.fullEntities, this.entity)
        this.showList = true
      } else {
        this.showList = false
        this.entities = []
      }
    },
  },
  async created() {
    await this.getEntitys()
  },
  methods: {
    openList() {
      if (this.entities.length) {
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
    async getEntitys(query) {
      if (!this.entities.length) {
        const entities = await this.$axios.$get(`/entities?limit=full`)

        this.fullEntities = entities.data
      } else {
        this.showList = true
      }
    },
    onClickOutside() {
      this.showList = false
    },
    clear() {
      this.entity = ''
      this.showList = false
      this.validEntity = null
      this.$emit('entity', null)
    },
    valid(entity) {
      // this.entity = entity.name
      this.validEntity = entity
      this.validate = false
      setTimeout(() => {
        this.showList = false
        this.validate = true
      }, 50)
      this.$emit('entity', this.validEntity)
    },
  },
}
</script>
