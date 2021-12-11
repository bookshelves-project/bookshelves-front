<template>
  <section
    class="max-w-sm bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden lg:w-96 w-64 m-5"
    :class="bgColor"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="shrink-0">
          <svg-icon :name="`toast/${toast.type}`" :class="color" class="w-6 h-6" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ toast.title }}</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ toast.text }}</p>
        </div>
        <div class="ml-4 shrink-0 flex">
          <button
            class="rounded-md inline-flex text-gray-400 dark:text-gray-300 dark:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="clear"
          >
            <span class="sr-only">Close</span>
            <svg-icon name="cross" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { namespace, actionType } from '~/store/toast'
import { Toast } from '~/types'

const props = defineProps<{
  toast: Toast
}>()

const ctx = useContext()

const type = props.toast.type ? props.toast.type : 'default'
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
  ctx.store.dispatch(`${namespace}/${actionType.REMOVE_TOAST}`, props.toast)
}
</script>
