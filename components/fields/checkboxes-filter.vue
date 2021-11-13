<template>
  <div>
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
        dark:hover:bg-gray-700
        transition-colors
        duration-75
      "
    >
      <div class="absolute inset-0" @click="toggleCheckbox(option.value)"></div>
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
import { pushIfNotExist } from '@/plugins/utils/methods'
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
      checkboxes: [],
      blockWatch: false,
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.checkboxes = newValue
    },
    checkboxes() {
      if (!this.blockWatch) {
        this.$emit('input', this.checkboxes)
      }
    },
    '$route.query'(newValue) {
      this.blockWatch = true
      const query = this.$route.query[this.filter]
      if (query === undefined) {
        this.checkboxes = []
      }
      this.blockWatch = false
    },
  },
  created() {
    this.checkbox = this.value
  },
  methods: {
    toggleCheckbox(value) {
      if (this.checkboxes.includes(value)) {
        const index = this.checkboxes.indexOf(value)
        if (index !== -1) {
          this.checkboxes.splice(index, 1)
        }
      } else {
        pushIfNotExist(this.checkboxes, value)
      }
    },
  },
}
</script>
