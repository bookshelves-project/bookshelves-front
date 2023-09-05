<script lang="ts" setup>
import { useSearchStore } from '~~/stores/search'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const search = ref<HTMLInputElement>()
const searchStore = useSearchStore()

const value = computed<string>({
  get() {
    return props.modelValue as string
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

onMounted(() => {
  search.value?.focus()
})
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400">
      <app-loading v-if="searchStore.loading" />
      <svg
        v-if="!searchStore.loading"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>
    </div>

    <input
      ref="search"
      v-model="value"
      type="text"
      class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm dark:text-gray-200 dark:placeholder-gray-600"
      placeholder="Search (3 char. min.) authors, series, books or ISBN"
      role="combobox"
      aria-expanded="false"
      aria-controls="options"
    >
    <div
      class="flex items-center justify-end space-x-4 p-3"
    >
      <field-checkbox
        v-for="(item, index) in searchStore.types"
        :key="index"
        v-model="searchStore.types[index]"
        :name="index"
        :label="index"
        capitalize
      />
    </div>
  </div>
</template>
