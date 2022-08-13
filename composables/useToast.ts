import { useToastStore } from '~~/store/toast'

export const useToast = () => {
  const pushToast = (toast: Toast) => {
    const store = useToastStore()
    store.addToast(toast)
  }
  return {
    pushToast
  }
}
