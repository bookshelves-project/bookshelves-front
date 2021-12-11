<template>
  <div class="relative flex items-start">
    <div class="absolute inset-0" @click="checkbox = !checkbox"></div>
    <div class="flex items-center h-5">
      <input
        :id="name"
        v-model="checkbox"
        :aria-describedby="`${name}-description`"
        :name="name"
        type="checkbox"
        class="
          focus:ring-primary-500
          h-4
          w-4
          text-primary-600
          border-gray-300
          rounded
        "
        :value="valueData"
      />
    </div>
    <div class="ml-3 text-sm w-full">
      <label
        :for="name"
        class="font-medium text-gray-700 dark:text-gray-300 block w-full"
      >
        {{ label }}
      </label>
      <div :id="`${name}-description`" class="text-gray-500 dark:text-gray-400">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: [Boolean, Array],
      default: false
    },
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    valueData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkbox: false
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.checkbox = newValue
    },
    checkbox(newValue, oldValue) {
      this.$emit('input', this.checkbox)
    }
  },
  created() {
    this.checkbox = this.value
  }
}
</script>
