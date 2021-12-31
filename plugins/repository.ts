import { Plugin } from '@nuxt/types'
import { Repository } from '~/composables/repository'
import { ApiEndpoint, ApiMessage } from '~/types'

// declare module 'vue/types/vue' {
//   interface Vue {
//     $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
//   }
// }
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
    $apiMessage(apiMessage: ApiMessage): string
  }
  interface Context {
    /**
     * A Repository can execute requests
     */
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
    $apiMessage(apiMessage: ApiMessage): string
  }
}

// declare module 'vuex/types/index' {
//   interface Store<S> {
//     $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
//   }
// }

const repository: Plugin = (context, inject) => {
  inject('repository', (endpoint: ApiEndpoint, handleError = true): Repository => {
    return new Repository(context.$axios, context.error, handleError, endpoint)
  })
  inject('apiMessage', (apiMessage: ApiMessage): string => {
    let errors = ''
    if (apiMessage.errors) {
      Object.values(apiMessage.errors).forEach(error => {
        if (error instanceof Array) {
          error = error[0]
        }
        errors += `${error} `
      })
    }

    return `${apiMessage.message} ${errors.trimEnd()}.`
  })
}

export default repository
