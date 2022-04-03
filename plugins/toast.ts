import { defineNuxtPlugin } from '#app'
import { Toast } from '~~/class/toast'
import { useToastStore } from '~~/store/toast'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: (title?: string, text?: string, type?: ToastType) => {
        const store = useToastStore()
        const toast = new Toast(
          title ?? 'title',
          text ?? 'text',
          type ?? 'information'
        )
        store.addToast(toast)
      },
    },
  }
})
