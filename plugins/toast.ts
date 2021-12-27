import { Plugin } from '@nuxt/types'
import { useToastStore } from '~/stores'
import { Toast, ToastAuto, ToastType } from '~/types'

declare module 'vue/types/vue' {
  interface Vue {
    $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  }
  interface Context {
    $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  }
}

const toast: Plugin = (context, inject) => {
  inject('toast', (title?: string, text?: string, type?: ToastType, auto?: ToastAuto) => {
    if (auto) {
      if (ToastAuto.success) {
        title = 'Success'
        type = ToastType.success
      } else if (ToastAuto.error) {
        title = 'Error'
        type = ToastType.error
      }
    }
    const toastData: Toast = {
      title: title || 'Toast',
      text: text || '',
      type: type || ToastType.default,
      date: new Date(),
      id: Math.random().toString(36).substr(2)
    }
    const toastPinia = useToastStore()
    toastPinia.addToast(toastData)
    // nuxt.$emit('toast', toastData)
  })
}

export default toast
