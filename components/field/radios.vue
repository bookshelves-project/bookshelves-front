<template>
  <fieldset role="group" :aria-labelledby="`label-${name}`">
    <div
      v-if="label"
      :id="`label-${name}`"
      class="font-medium text-gray-700 dark:text-white"
    >
      {{ label }}
      <span v-if="required" class="text-red-600">*</span>
    </div>
    <div :class="label ? 'mt-1' : ''">
      <div class="max-w-lg">
        <div v-if="helper" class="text-sm text-gray-500 dark:text-gray-400">
          {{ helper }}
        </div>
        <div :class="[{ 'grid grid-cols-4 gap-4': flex }, { 'mt-4': label }]">
          <div
            v-for="(option, id) in options"
            :key="id"
            class="flex items-center"
            :class="[
              { 'py-2': !flex },
              { 'transition-colors duration-75 hover:bg-gray-200': hover },
            ]"
            @click="$emit('input', id)"
          >
            <input
              :id="id"
              v-model="radioValue"
              :value="id"
              :name="name"
              :required="required"
              type="radio"
              class="focus:ring-primary-600 dark:focus:ring-primary-600 h-4 w-4 text-primary-600 dark:text-primary-600 border-gray-300 dark:border-primary-600 dark:focus:ring-offset-gray-800"
            />
            <label
              :for="id"
              class="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
            >
              {{ option }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
interface Props {
  // modelValue: string
  value: string
  options: object
  name: string
  label: string
  helper: string
  flex: boolean
  hover: boolean
  required: boolean
}
const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  label: undefined,
  helper: undefined,
  flex: false,
  hover: false,
  required: false,
})

const radioValue = ref<string>()

watch(
  () => props.value,
  (newVal) => {
    radioValue.value = newVal
  }
)

onMounted(() => {
  if (!props.value && Object.values(props.options).length) {
    radioValue.value = Object.keys(props.options)[0]
  } else {
    radioValue.value = props.value
  }
})
</script>
