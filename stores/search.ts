import { defineStore } from 'pinia'

interface Type {
  authors: boolean
  series: boolean
  books: boolean
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    opened: false,
    loading: false,
    firstSearch: false,
    clear: false,
    types: {
      authors: true,
      series: true,
      books: true,
    } as Type,
  }),
  getters: {
    searchOpened: state => state.opened,
    clearInput: state => state.clear,
  },
  actions: {
    setTypes(payload: Type) {
      this.$patch({
        types: payload,
      })
    },
    setFirstSearch(payload: boolean) {
      this.$patch({
        firstSearch: payload,
      })
    },
    setClear(payload: boolean) {
      this.$patch({
        clear: payload,
      })
    },
    setLoading(payload: boolean) {
      this.$patch({
        loading: payload,
      })
    },
    toggleDialog() {
      this.$patch({
        opened: !this.opened,
      })
    },
    openDialog() {
      this.$patch({
        opened: true,
      })
    },
    closeDialog() {
      this.$patch({
        opened: false,
        firstSearch: false,
      })
    },
  },
})
