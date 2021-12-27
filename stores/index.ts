import { defineStore } from 'pinia'

export const useIndexStore = defineStore({
  id: 'store',
  state: () => ({
    sidebar: false
  }),
  actions: {
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
