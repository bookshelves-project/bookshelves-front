import { Plugin } from '@nuxt/types'
import { wrapProperty } from '@nuxtjs/composition-api'
import { ApiEndpoint, Repository } from '~/composables/repository'
import { Notification, NotificationType } from '~/types'
import { namespace, actionType } from '~/store/notification'

declare module '@nuxt/types' {
  interface Context {
    /**
     * A Repository can execute requests
     */
    $repository(endpoint: ApiEndpoint, handleError?: boolean): Repository
    $notification(notification?: Notification): void
  }
}

const repository: Plugin = (ctx) => {
  ctx.$repository = (endpoint: ApiEndpoint, handleError = true) => {
    return new Repository(ctx.$axios, ctx.error, handleError, endpoint)
  }
  ctx.$notification = (notification?: Notification) => {
    const notif = {
      title: notification ? notification.title : 'Demo notification',
      text: notification ? notification.text : '',
      type: notification ? notification.type : NotificationType.default
    }
    ctx.store.dispatch(`${namespace}/${actionType.DISPLAY_NOTIFICATION}`, new Notification(
      'Check your console',
      'List of all routes is available.',
      NotificationType.success
    ))
    // nuxt.$emit('notification', notif)
  }
}

export default repository
