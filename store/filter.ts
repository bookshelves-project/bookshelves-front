import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    queries: {},
  }),
  actions: {
    setQueries(payload: object) {
      this.$patch({
        queries: payload,
      })
    },
  },
})
