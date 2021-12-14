import { defineStore } from 'pinia'
import { Toast } from '~/types'

export const useToastStore = defineStore({
  id: 'toast',
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
      setTimeout(() => {
        this.deleteToast(payload)
      }, 4000)

      this.$patch({
        toasts
      })
    },
    deleteToast(payload: Toast) {
      let toasts = this.toasts
      toasts = toasts.filter(toast => toast.id !== payload.id)

      this.$patch({
        toasts
      })
    }
  },
})
