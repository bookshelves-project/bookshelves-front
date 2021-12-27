import { defineStore } from 'pinia'
import { AppInit, Application } from '~/types'
import { Enums, Language } from '~/types/cms'
export * from './toast'

export const useIndexStore = defineStore({
  id: 'store',
  state: () => ({
    application: {} as Application,
    enums: {} as Enums,
    languages: {} as Language[],
    sidebar: false
  }),
  actions: {
    init(payload: AppInit) {
      this.$patch({
        application: payload.application,
        enums: payload.enums,
        languages: payload.languages
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
