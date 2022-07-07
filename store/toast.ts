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
      const toasts = this.toasts

      const index = toasts.findIndex((key) => key.id === payload.id)
      toasts.splice(index, 1)
      // toasts = toasts.filter((toast) => toast.id !== payload.id)

      // toasts.forEach((toast, index) => {
      //   if (toast.date === payload.date) {
      //     delete toasts[index]
      //   }
      // })

      this.$patch({
        toasts,
      })
    },
  },
})
