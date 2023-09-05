<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  label?: string
  name?: string
  placeholder?: string
  options?: Keyable
  required?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const selected = ref<string>()
function selectOption() {
  emit('update:modelValue', selected.value)
}

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal
  },
)
</script>

<template>
  <div class="mb-2">
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {{ label }}
      <span v-if="required" class="text-red-600 dark:text-red-500">*</span>
    </label>
    <select
      :id="name"
      v-model="selected"
      :name="name"
      :required="required"
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200"
    >
      <option v-if="placeholder" selected hidden disabled :value="null">
        {{ placeholder }}
      </option>
      <option
        v-for="(optionName, optionValue) in options"
        :key="optionValue"
        :value="optionValue"
        @click="selectOption"
      >
        {{ optionName }}
      </option>
    </select>
  </div>
</template>
