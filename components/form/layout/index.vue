<script setup lang="ts">
import { useFormStore } from '~/store/form'

defineProps<{
  title?: string
  loaded?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', status: boolean): void
}>()

const isDev = process.dev
const store = useFormStore()

const fill = () => {
  store.fillData()
}
const submit = () => {
  store.enableLoading()
  emit('submit', true)
}
</script>

<template>
  <form @submit.prevent="submit">
    <slot />
    <div class="mt-10 flex items-center justify-center space-x-2">
      <app-button
        type="submit"
        align="center"
        color="primary"
        class="w-full"
        :loading="store.isLoading"
      >
        <span v-if="store.isLoading">Processing...</span>
        <span v-else>{{ title ?? 'Submit' }}</span>
      </app-button>
      <app-button v-if="isDev" type="button" @click="fill">
        <svg-icon name="test" class="h-6 w-6" />
      </app-button>
    </div>
  </form>
</template>
