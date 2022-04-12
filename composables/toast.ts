import { Toast } from '~~/class/toast'
import { useToastStore } from '~~/store/toast'

export const useToast = () => {
  const pushToast = (title?: string, text?: string, type?: ToastType) => {
    const store = useToastStore()
    const toast = new Toast(
      title ?? 'title',
      text ?? 'text',
      type ?? 'information'
    )
    store.addToast(toast)
  }
  return {
    pushToast,
  }
}
