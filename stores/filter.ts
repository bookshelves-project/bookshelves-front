import { defineStore } from 'pinia'

export const useFilterStore = defineStore({
  id: 'filter',
  state: () => ({
    queries: {}
  }),
  actions: {
    setQueries(payload: object) {
      this.$patch({
        queries: payload,
      })
    },
  },
})
