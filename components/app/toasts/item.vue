<script setup lang="ts">
import { useToastStore } from '~/store/toast'

const props = defineProps<{
  toast?: Toast
}>()

const type = props.toast?.type ? props.toast.type : 'default'
const bgColor = computed(() => {
  const colors = {
    success: 'bg-green-100',
    warning: 'bg-orange-100',
    error: 'bg-red-100',
    information: 'bg-blue-100',
    default: 'bg-blue-100'
  }
  return colors[type] || colors.default
})
const color = computed(() => {
  const colors = {
    success: 'text-green-400',
    warning: 'text-orange-400',
    error: 'text-red-400',
    information: 'text-blue-400',
    default: 'text-blue-400'
  }
  return colors[type]
})
const clear = () => {
  const toast = useToastStore()
  toast.deleteToast(props.toast!)
}
</script>

<template>
  <section
    v-if="toast"
    class="pointer-events-auto m-5 w-64 max-w-sm overflow-hidden rounded-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700 sm:w-96 relative"
    :class="bgColor"
  >
    <span
      class="absolute inset-x-0 bottom-0 h-1 bg-primary-500 dark:bg-primary-600 animate-life"
    />
    <div class="p-4">
      <div class="flex items-start">
        <div class="shrink-0">
          <svg-icon
            :name="toast.type ? `toast-${toast.type}` : 'information'"
            :class="color"
            class="h-6 w-6"
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
            {{ toast.title }}
          </p>
          <p class="mt-1 text-sm text-gray">
            {{ toast.text }}
          </p>
        </div>
        <div class="ml-4 flex shrink-0">
          <button
            class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300"
            @click="clear"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
