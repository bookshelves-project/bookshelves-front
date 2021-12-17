import { Context } from '@nuxt/types'
import { defineStore } from 'pinia'
import { useIndexStore } from '.'
import { ApiEndpoint, ApiResponse, Application } from '~/types'

export const useInitStore = defineStore({
  id: 'init',
  actions: {
    async nuxtServerInit(context: Context) {
      await context.$axios.$get(ApiEndpoint.CmsApplication).then((e: ApiResponse<Application>) => {
        const application: Application = e.data
        context.$cookies.set('app', application)
        const applicationStore = useIndexStore()
        applicationStore.setApplication(application)
      })
    }
  }
})
