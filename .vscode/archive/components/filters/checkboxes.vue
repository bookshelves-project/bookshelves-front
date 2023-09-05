<script setup lang="ts">
const props = defineProps<{
  modelValue?: string[]
  options?: FilterOption[]
  value?: []
  filter?: string
}>()
const emit = defineEmits(['update:modelValue'])

const choices = ref<string[]>([])
choices.value = props.modelValue!
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal)
      choices.value = newVal
  },
)
watch(
  () => choices.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
)
</script>

<template>
  <div>
    <div
      v-for="(option, index) in options"
      :key="index"
      class="relative flex items-start py-2 px-3 transition-colors duration-75 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <field-checkbox
        v-model="choices"
        :name="option.value"
        :label="option.label"
        :current-value="option.value"
        full
      />
    </div>
  </div>
</template>
