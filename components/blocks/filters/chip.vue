<template>
  <button
    class="
      m-1
      inline-flex
      rounded-full
      border border-gray-200
      items-center
      py-1.5
      pl-3
      pr-2
      text-sm
      font-medium
      bg-white
      text-gray-900
      group
      hover:bg-gray-100
      transition-colors
      duration-75
    "
    @click="removeQuery"
  >
    <span>
      <slot />
    </span>
    <span
      type="button"
      class="
        flex-shrink-0
        ml-1
        h-4
        w-4
        p-1
        rounded-full
        inline-flex
        text-gray-400
        group-hover:bg-gray-200 group-hover:text-gray-500
        transition-colors
        duration-75
      "
    >
      <span class="sr-only">Remove filter for Objects</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </span>
  </button>
</template>

<script>
export default {
  name: 'FiltersChip',
  props: {
    filterType: {
      type: String,
      default: null,
    },
    filterValue: {
      type: String,
      default: null,
    },
  },
  methods: {
    removeQuery() {
      this.$emit('remove', this.filterType)
    },
  },
}
</script>
