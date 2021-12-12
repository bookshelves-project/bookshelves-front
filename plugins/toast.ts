import { Plugin } from '@nuxt/types'
import { namespace, actionType } from '~/store/toast'
import { Toast, ToastAuto, ToastType } from '~/types'

declare module '@nuxt/types' {
  interface Context {
    /**
     * Send a toast
     */
    $toast(title?: string, text?: string, type?: ToastType, auto?: ToastAuto): void
  }
}

const repository: Plugin = (ctx) => {
  ctx.$toast = (title?: string, text?: string, type?: ToastType, auto?: ToastAuto) => {
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
      type: type || ToastType.default
    }
    ctx.store.dispatch(`${namespace}/${actionType.DISPLAY_TOAST}`, toastData)
    // nuxt.$emit('toast', toastData)
  }
}

export default repository
