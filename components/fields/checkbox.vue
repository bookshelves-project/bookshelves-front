<template>
  <!-- <div class="fr-checkbox-group">
    <input :id="name" v-model="checkbox" type="checkbox" :name="name" />
    <label class="fr-label" :for="name">
      {{ label }}
    </label>
  </div> -->
  <div class="relative flex items-start">
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
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="name" class="font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </label>
      <p :id="`${name}-description`" class="text-gray-500 dark:text-gray-400">
        <slot />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      checkbox: false,
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.checkbox = newValue
    },
    checkbox(newValue, oldValue) {
      this.$emit('input', this.checkbox)
    },
  },
  created() {
    this.checkbox = this.value
  },
}
</script>
