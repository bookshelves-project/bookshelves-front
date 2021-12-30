import { Plugin } from '@nuxt/types'
import { useToastStore } from '~/stores/toast'
import { Toast, ToastAuto, ToastType } from '~/types'

declare module 'vue/types/vue' {
  // interface Vue {
  //   $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  // }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $toastAuto(auto: ToastAuto): void
    $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  }
  interface Context {
    $toastAuto(auto: ToastAuto): void
    $toast(title?: string, text?: string, type?: ToastType): void
  }
}

declare module 'vuex/types/index' {
  // interface Store<S> {
  //   $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  // }
}

const toast: Plugin = (context, inject) => {
  inject('toastAuto', (auto: ToastAuto) => {
    const toastData: Toast = {
      title: auto === ToastAuto.success ? 'Success' : 'Error',
      text: auto === ToastAuto.success ? 'Your update has been saved!' : 'Oops! An error break something here!',
      type: auto === ToastAuto.success ? ToastType.success : ToastType.error,
      date: new Date(),
      id: Math.random().toString(36).substr(2)
    }
    const toastPinia = useToastStore()
    toastPinia.addToast(toastData)
  })
  inject('toast', (title?: string, text?: string, type?: ToastType, auto?: ToastAuto) => {
    const toastData: Toast = {
      title: title || 'Toast',
      text: text || '',
      type: type || ToastType.default,
      date: new Date(),
      id: Math.random().toString(36).substr(2)
    }
    console.log(toastData)
    const toastPinia = useToastStore()
    toastPinia.addToast(toastData)
    // nuxt.$emit('toast', toastData)
  })
}

export default toast
