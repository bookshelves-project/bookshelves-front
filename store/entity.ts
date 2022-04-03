import { defineStore } from 'pinia'

export const useEntityStore = defineStore('entity', {
  state: () => ({
    books: {} as ApiPaginateResponse<Book[]>,
    series: {} as ApiPaginateResponse<Serie[]>,
    authors: {} as ApiPaginateResponse<Author[]>,
    tags: {} as Tag[],
    genres: {} as Tag[],
  }),
  actions: {
    booksStore(payload: ApiPaginateResponse<Book[]>) {
      this.$patch({
        books: payload,
      })
    },
    seriesStore(payload: ApiPaginateResponse<Serie[]>) {
      this.$patch({
        series: payload,
      })
    },
    authorsStore(payload: ApiPaginateResponse<Author[]>) {
      this.$patch({
        authors: payload,
      })
    },
    tagsStore(payload: Tag[]) {
      this.$patch({
        tags: payload,
      })
    },
    genresStore(payload: Tag[]) {
      this.$patch({
        genres: payload,
      })
    },
  },
})
