<template>
  <form class="space-y-6" @submit.prevent="submit">
    <slot />
    <div class="flex items-center justify-center space-x-2">
      <app-button type="submit" align="center" color="primary" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading">
            {{ button }}
          </span>
          <span v-else class="flex items-center space-x-1">
            <app-loading class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </app-button>
      <app-button v-if="isDev" type="button" @click="fill">
        <svg-icon name="test" class="w-6 h-6" />
      </app-button>
    </div>
    <slot name="extra" />
  </form>
</template>

<script setup lang="ts">
import { useFormStore } from '~/stores/form'

interface Props {
  loaded: boolean
}
const props = withDefaults(defineProps<Props>(), {
  loaded: true,
})

const { isDev } = useContext()
const isLoading = ref(false)

const store = useFormStore()

const button = computed(() => store.button)
const form = computed(() => store.form)
const test = computed(() => store.test)

const fill = () => {
  store.fillForm()
}
const submit = async () => {
  isLoading.value = true
  const api = await store.request(form.value)
  if (api) {
    store.setResponse(api)
    if (api.status === 200) {
      store.resetForm()
    }
  }
  if (props.loaded) {
    isLoading.value = false
  } else if (!api || (api && api.status !== 200)) {
    isLoading.value = false
  }
}
</script>
