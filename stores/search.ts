import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    modalOpened: false
  }),
  actions: {
    setModalOpened(payload: boolean) {
      this.$patch({
        modalOpened: payload,
      })
    },
  },
})
