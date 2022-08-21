import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    queries: {},
    clear: false
  }),
  actions: {
    setQueries(payload: object) {
      this.$patch({
        queries: payload
      })
    },
    clearQueries() {
      this.$patch({
        clear: true
      })
      setTimeout(() => {
        this.$patch({
          clear: false
        })
      }, 300)
    }
  }
})
