import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  getters: {
    getToasts(state) {
      return state.toasts.reduce((items, item) => {
        return items
      }, [] as Toast[])
    },
  },
  actions: {
    addToast(payload: Toast) {
      const toasts = this.toasts
      toasts.push(payload)
      this.timeoutToast(payload)

      this.$patch({
        toasts,
      })
    },
    timeoutToast(payload: Toast) {
      setTimeout(() => {
        this.deleteToast(payload)
      }, 4000)
    },
    deleteToast(payload: Toast) {
      let toasts = this.toasts

      toasts.forEach((toast, index) => {
        if (toast.id === payload.id) {
          delete toasts[index]
        }
      })

      this.$patch({
        toasts,
      })
    },
  },
})
