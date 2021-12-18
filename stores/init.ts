import { Context } from '@nuxt/types'
import { defineStore } from 'pinia'
import { useIndexStore } from '.'
import { ApiEndpoint, ApiResponse, AppInit, Application } from '~/types'
import { Enums } from '~/types/cms'

export const useInitStore = defineStore({
  id: 'init',
  actions: {
    async nuxtServerInit(context: Context) {
      await context.$axios.$get(ApiEndpoint.AppInit).then((e: ApiResponse<AppInit>) => {
        const application: Application = e.data.application
        context.$cookies.set('app', application)

        const store = useIndexStore()
        store.init(e.data)
      })
    }
  }
})
