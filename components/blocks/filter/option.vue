<template>
  <app-dropdown align="right" :width="48">
    <template #trigger>
      <button
        :id="`${filter}-filter`"
        :title="`${capitalize(filter)} filter`"
        type="button"
        class="
          inline-flex
          justify-center
          w-full
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          dark:text-gray-300
          transition-colors
          duration-100
          bg-white
          border border-gray-300
          rounded-md
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-offset-gray-100
          focus:ring-primary-500
          dark:bg-gray-800 dark:border-gray-700
          hover:bg-gray-100
        "
        aria-haspopup="true"
        aria-expanded="true"
        aria-label="Filter"
        @click="openedFilter = !openedFilter"
      >
        <svg-icon :name="icon" class="w-6 h-6" />
        <svg-icon name="arrow-chevron-bottom" class="w-5 h-5 ml-1" />
      </button>
    </template>
    <template #content>
      <div class="py-1 dark:bg-gray-700">
        <div
          class="
            block
            w-full
            px-4
            py-2
            text-sm
            font-semibold
            text-left text-gray-800
            dark:text-gray-200
          "
        >
          {{ capitalize(filter) }} filter
        </div>
        <button
          v-for="option in options"
          :key="option.slug"
          :class="{ 'bg-gray-100': $route.query[filter] === option.slug }"
          type="button"
          class="
            block
            w-full
            px-4
            py-2
            text-sm text-left text-gray-700
            hover:bg-gray-200 hover:text-gray-900
            dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800
          "
          role="menuitem"
          :aria-label="`Filter by ${option.name}`"
          @click="
            filterBy(filter, option.meta ? option.meta.slug : option.slug)
          "
        >
          {{ option.name }}
        </button>
      </div>
    </template>
  </app-dropdown>
</template>

<script>
import { capitalize } from '@/plugins/utils/methods'
export default {
  name: 'FilterOption',
  props: {
    filter: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'collection',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openedFilter: false,
    }
  },
  methods: {
    capitalize,
    filterBy(type, data) {
      this.filterEnabled = true
      this.openedFilter = false
      this.$emit('filter', { type, data })
    },
  },
}
</script>
