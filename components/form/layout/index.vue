<script setup lang="ts">
import AppButton from '@/components/app/button.vue'
import SvgIcon from '@/components/svg-icon.vue'
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
const isLoading = computed(() => store.isLoading)

const fill = () => {
  store.fillData()
}
const submit = async () => {
  store.toggleLoading()
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
        :loading="isLoading"
      >
        <span v-if="isLoading">Processing...</span>
        <span v-else>{{ title ?? 'Submit' }}</span>
      </app-button>
      <app-button v-if="isDev" type="button" @click="fill">
        <svg-icon name="test" class="h-6 w-6" />
      </app-button>
    </div>
  </form>
</template>
