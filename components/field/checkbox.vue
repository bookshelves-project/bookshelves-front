<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean | string[]
  name?: string
  label?: string
  currentValue?: string
  required?: boolean
  full?: boolean
  capitalize?: boolean
  capitalizeFirst?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed<any>({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <div :class="full ? 'w-full' : 'item-start'" class="relative flex">
    <div class="flex h-5 items-center">
      <input
        :id="name"
        v-model="value"
        :aria-describedby="`${name}-description`"
        :name="name"
        type="checkbox"
        class="checkbox"
        :value="currentValue"
        :required="required"
      >
    </div>
    <div class="ml-3 w-full text-sm">
      <label
        :for="name"
        :class="[
          {'capitalize': capitalize},
          {'capitalize-first': capitalizeFirst}
        ]"
        class="block w-full font-medium text-gray-700 dark:text-gray-300"
      >
        {{ label }}
        <span v-if="required" class="text-red-600 dark:text-red-500">*</span>
      </label>
      <div :id="`${name}-description`" class="text-gray">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.checkbox {
  @apply h-4 w-4 rounded;
  @apply border-gray-300 text-primary-600 focus:ring-primary-500;
  @apply dark:border-gray-700 dark:bg-gray-600 dark:text-primary-600 dark:ring-offset-gray-800 dark:focus:ring-primary-400;
}
</style>
