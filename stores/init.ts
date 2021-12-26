import { Context } from '@nuxt/types'
import { defineStore } from 'pinia'
import { useIndexStore } from '.'
import { ApiEndpoint, ApiResponse, AppInit, Application } from '~/types'
import { Enums } from '~/types/cms'

export const useInitStore = defineStore({
  id: 'init',
  actions: {
    async nuxtInit(context: Context) {
      const store = useIndexStore()
      console.log(store.application)

      // if (!store.application) {
      await context.$repository(ApiEndpoint.AppInit, false).find<AppInit>()
        .then((e: ApiResponse<AppInit>) => {
          console.log(e.data.application.name)

          const application: Application = e.data.application
          context.$cookies.set('app', application)

          store.init(e.data)
        })
        .catch((e) => {
          console.log(e)
          console.log('init')
        })
      // }
    }
  }
})
