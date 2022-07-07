<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  name?: string
  placeholder?: string
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  required?: boolean
  multiline?: boolean
  minlength?: number
  maxlength?: number
  disabled?: boolean
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: undefined,
  name: 'field',
  placeholder: undefined,
  type: 'text',
  required: false,
  multiline: false,
  minlength: 0,
  maxlength: 0,
  disabled: false,
  autocomplete: undefined,
})

const emit = defineEmits(['update:modelValue'])

const value = computed<string>({
  get() {
    return props.modelValue as string
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {{ label }}
      <span v-if="required" class="text-red-600 dark:text-red-500">*</span>
    </label>
    <div class="mt-1">
      <textarea
        v-if="multiline"
        :id="name"
        v-model="value"
        :name="name"
        :placeholder="placeholder"
        rows="4"
        :minlength="minlength > 0 ? minlength : ''"
        :maxlength="maxlength > 0 ? maxlength : ''"
        :autocomplete="autocomplete"
        class="block w-full rounded-md border border-gray-300 p-3 placeholder-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-100 sm:text-sm"
        :required="required"
      ></textarea>
      <input
        v-else
        :id="name"
        v-model="value"
        :type="type ? type : 'text'"
        :name="name"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white sm:text-sm"
        :placeholder="placeholder"
        :aria-describedby="`${name}-description`"
        :autocomplete="autocomplete"
        :required="required"
      />
    </div>
    <div id="email-description" class="mt-2 text-sm text-gray">
      <slot />
    </div>
  </div>
</template>
