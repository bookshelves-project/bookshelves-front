import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  getters: {
    getToasts(state) {
      return state.toasts.reduce((items) => {
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

      const index = toasts.findIndex(key => key.id === payload.id)
      toasts.splice(index, 1)

      this.$patch({
        toasts,
      })
    },
  },
})
