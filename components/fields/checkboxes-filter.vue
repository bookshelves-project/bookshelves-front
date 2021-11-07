<template>
  <div>
    {{ $route.query[filter] }}
    <div
      v-for="option in options"
      :key="option.id"
      class="
        relative
        flex
        items-start
        py-2
        px-3
        hover:bg-gray-200
        transition-colors
        duration-75
      "
    >
      <div class="flex items-center h-5">
        <input
          :id="option.value"
          v-model="checkboxes"
          type="checkbox"
          :name="option.value"
          :value="option.value"
          class="
            focus:ring-primary-500
            h-4
            w-4
            text-primary-600
            border-gray-300
            rounded
          "
        />
      </div>
      <div class="ml-3 text-sm w-full">
        <label
          :for="option.value"
          class="font-medium text-gray-700 dark:text-gray-300 block w-full"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxesFilter',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      checkbox: false,
      checkboxes: [],
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.checkboxes = newValue
    },
    checkboxes() {
      this.$emit('input', this.checkboxes)
    },
    '$route.query'(newValue) {
      const query = this.$route.query[this.filter]
      if (query === undefined) {
        this.checkboxes = []
      }
      console.clear()
    },
  },
  created() {
    this.checkbox = this.value
  },
}
</script>
