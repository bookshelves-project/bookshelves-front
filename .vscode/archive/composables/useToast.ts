import { useToastStore } from '~~/stores/toast'

export function useToast() {
  const pushToast = (toast: Toast) => {
    const store = useToastStore()
    store.addToast(toast)
  }
  return {
    pushToast,
  }
}
