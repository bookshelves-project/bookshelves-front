import { defineStore } from 'pinia'

export const useEntityStore = defineStore('entity', {
  state: () => ({
    books: {} as ApiResponse<Book[]>,
    series: {} as ApiResponse<Serie[]>,
    authors: {} as ApiResponse<Author[]>,
    tags: {} as Tag[],
    genres: {} as Tag[]
  }),
  actions: {
    booksStore(payload: ApiResponse<Book[]>) {
      this.$patch({
        books: payload
      })
    },
    seriesStore(payload: ApiResponse<Serie[]>) {
      this.$patch({
        series: payload
      })
    },
    authorsStore(payload: ApiResponse<Author[]>) {
      this.$patch({
        authors: payload
      })
    },
    tagsStore(payload: Tag[]) {
      this.$patch({
        tags: payload
      })
    },
    genresStore(payload: Tag[]) {
      this.$patch({
        genres: payload
      })
    }
  }
})
