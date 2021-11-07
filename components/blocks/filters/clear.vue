<template>
  <div>
    <transition name="fade">
      <button
        v-if="queryAvailable"
        class="
          hover:bg-gray-200
          transition-colors
          duration-75
          py-2
          px-2
          rounded-md
          group
          inline-flex
          justify-center
          text-sm
          font-medium
          items-center
        "
        type="button"
        @click="clearAll"
      >
        <svg-icon
          name="trash"
          class="w-4 h-4 text-gray-700 group-hover:text-gray-900"
        />
        <span class="ml-2 text-gray-700 group-hover:text-gray-900">
          Clear all
        </span>
      </button>
    </transition>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
export default {
  name: 'FilterClear',
  data() {
    return {
      filterEnabled: false,
    }
  },
  computed: {
    queryAvailable() {
      const query = this.$route.query
      return !this.isEmpty(query)
    },
  },
  methods: {
    isEmpty,
    clearAll() {
      this.$router.push({ name: this.$route.name, query: {} })
    },
  },
}
</script>
