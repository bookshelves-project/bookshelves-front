import { Context } from '@nuxt/types'
import { defineStore } from 'pinia'
import { ApiEndpoint, ApiResponse, Application } from '~/types'
import { AppInit, Enums, Language } from '~/types/cms'

export const useApplicationStore = defineStore({
  id: 'application',
  state: () => ({
    application: {} as Application,
    enums: {} as Enums,
    languages: {} as Language[],
  }),
  getters: {
    getApplication() {
    }
  },
  actions: {
    async init(context: Context) {
      if (Object.keys(this.application).length === 0) {
        console.log('request')
        const api = await context.$repository(ApiEndpoint.AppInit, false)
          .find<AppInit>() as ApiResponse<AppInit>
        console.log(this.application)

        this.$patch({
          application: api.data.application,
          enums: api.data.enums,
          languages: api.data.languages
        })
      }
    }
  },
})
