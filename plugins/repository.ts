import { Plugin } from '@nuxt/types'
import { Repository } from '~/composables/repository'
import { ApiEndpoint } from '~/types'

declare module 'vue/types/vue' {
  interface Vue {
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
  }
}
declare module '@nuxt/types' {
  interface Context {
    /**
     * A Repository can execute requests
     */
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
  }
}

const repository: Plugin = (context, inject) => {
  inject('repository', (endpoint: ApiEndpoint, handleError = true) => {
    return new Repository(context.$axios, context.error, handleError, endpoint)
  })
}

export default repository
