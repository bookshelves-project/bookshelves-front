// import { Ref } from '@vue/runtime-dom'
// import { stringify } from 'qs'
// import { ApiFormated, ApiPaginateResponse, Book, BooksApiPaginateResponse, Pagination, QueryBooks } from '~/types'

import { stringify } from 'qs'
import { BooksApiPaginateResponse, QueryBooks } from '~/types'

export const fetchBooks = async (query: QueryBooks): Promise<BooksApiPaginateResponse> => {
  if (!query.perPage) {
    query.perPage = '32'
  }
  // const queryList: QueryBooks = {
  //   page: query.page as string || '1',
  //   perPage: '32',
  //   ...query
  // }
  console.log(query)

  return await $axios.$get(
    `/books?${stringify({
      ...query
    })}`
  ) as BooksApiPaginateResponse
}
