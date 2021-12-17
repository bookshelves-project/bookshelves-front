import { Plugin } from '@nuxt/types'
import { Repository } from '~/composables/repository'
import { ApiEndpoint } from '~/types'

declare module '@nuxt/types' {
  interface Context {
    /**
     * A Repository can execute requests
     */
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
  }
}

const repository: Plugin = (ctx) => {
  ctx.$repository = (endpoint: ApiEndpoint, handleError = true) => {
    return new Repository(ctx.$axios, ctx.error, handleError, endpoint)
  }
}

export default repository
