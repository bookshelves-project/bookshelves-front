<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: 'switch',

})

const emit = defineEmits(['update:modelValue'])
const toggled = ref(false)

watch(
  () => props.modelValue,
  (newVal) => {
    toggled.value = newVal
  },
)

const toggle = () => {
  toggled.value = !toggled.value
  emit('update:modelValue', toggled.value)
}

onMounted(() => {
  toggled.value = props.modelValue
})
</script>

<template>
  <div class="mt-1 flex items-center justify-between" :title="label">
    <span v-if="label" class="flex flex-grow flex-col">
      <span
        id="availability-label"
        class="text-sm font-medium text-gray-900 dark:text-gray-100"
      >{{ label }}</span>
    </span>
    <button
      type="button"
      :class="[
        toggled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700',
        { 'ml-3': label },
      ]"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-primary-700 dark:focus:ring-offset-gray-900"
      role="switch"
      :aria-checked="toggled"
      @click="toggle"
    >
      <span class="sr-only">{{ label }}</span>
      <span
        :class="toggled ? 'translate-x-5' : 'translate-x-0'"
        class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:bg-gray-900"
      >
        <span
          :class="
            toggled
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in'
          "
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          aria-hidden="true"
        >
          <SvgIcon
            name="cross-sm"
            class="toggle-disabled h-3 w-3 text-gray-400 dark:text-gray-700"
          />
        </span>
        <span
          :class="
            toggled
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out'
          "
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          aria-hidden="true"
        >
          <SvgIcon
            name="old/check"
            class="toggle-enabled h-3 w-3 text-primary-600"
          />
        </span>
      </span>
    </button>
  </div>
</template>
