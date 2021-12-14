import { defineStore } from 'pinia'
import { Application } from '~/types'
export * from './toast'

export const useIndexStore = defineStore({
  id: 'store',
  state: () => ({
    application: {} as Application,
    sidebar: false
  }),
  actions: {
    setApplication(payload: Application) {
      this.$patch({
        application: payload
      })
    },
    toggleSidebar() {
      this.$patch({
        sidebar: !this.sidebar
      })
    },
    closeSidebar() {
      this.$patch({
        sidebar: false
      })
    },
  },
})
