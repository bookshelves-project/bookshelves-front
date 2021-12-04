import { Plugin } from '@nuxt/types'
import { ApiEndpoint, Repository } from '~/composables/repository'

declare module '@nuxt/types' {
  interface Context {
    /**
     * A Repository can execute requests
     */
    $repository(endpoint: ApiEndpoint): Repository
  }
}

const repository: Plugin = (ctx) => {
  ctx.$repository = (endpoint: ApiEndpoint) => {
    return new Repository(ctx.$axios, endpoint)
  }
}

export default repository
