<template>
  <div role="group" :aria-labelledby="`label-${name}`">
    <div>
      <div
        v-if="label"
        :id="`label-${name}`"
        class="
          text-base
          font-medium
          text-gray-900
          sm:text-sm sm:text-gray-700
          dark:text-gray-300
        "
      >
        {{ label }}
      </div>
      <div :class="label ? 'mt-1' : ''">
        <div class="max-w-lg">
          <p v-if="helper" class="text-sm text-gray-500 dark:text-gray-400">
            {{ helper }}
          </p>
          <div class="mt-4 gap-4 grid grid-cols-2">
            <div
              v-for="option in options"
              :key="option.id"
              class="flex items-center"
              @click="$emit('input', option.value)"
            >
              <input
                :id="option.value"
                v-model="radioValue"
                :name="name"
                type="radio"
                class="
                  focus:ring-primary-500
                  h-4
                  w-4
                  text-primary-600
                  border-gray-300
                "
              />
              <label
                :for="option.value"
                class="
                  ml-3
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-300
                "
              >
                {{ option.label }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldRadios',
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    helper: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      radioValue: 'none',
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.radioValue = newValue
    },
  },
}
</script>
