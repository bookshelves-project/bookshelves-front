// export default (ctx, inject) => {
//   // inject the repository in the context (ctx.app.$repository)
//   // And in the Vue instances (this.$repository in your components)

//   inject('bookRepository', repositoryWithAxios('/books'))

//   // You can reuse the repositoryWithAxios object:
//   // inject("userRepository", repositoryWithAxios('/users'));
// }

import { Plugin } from '@nuxt/types'
import { stringify } from 'qs'
import createRepository from '~/api/repository'
import { ApiResponse } from '~/types/ApiResponse'
import { Book } from '~/types/books/book'
import { ModelEnum, Model } from '~/types/repository'

declare module '@nuxt/types' {
  interface Context {
    $repository(model: Model, query?: object): Promise<any>
  }
}

const repository: Plugin = (context) => {
  const instance = createRepository(context.$axios)

  context.$repository = (model: Model, query: object = {}): Promise<any> => {
    const queryList = `?${stringify({ ...query })}`
    model.http = context.$axios
    model.query = queryList
    try {
      return model[model.type]()
    } catch (error) {
      console.log(error)
    }
  }
}

export default repository
