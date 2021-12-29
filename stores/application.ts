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
        if (context.$cookies.get('application')) {
          const data: AppInit = context.$cookies.get('application')

          this.$patch({
            application: data.application,
            enums: data.enums,
            languages: data.languages
          })
        } else {
          const api = await context.$repository(ApiEndpoint.AppInit, false)
            .find<AppInit>() as ApiResponse<AppInit>
          const data = api.data

          context.$cookies.set('application', data)

          this.$patch({
            application: data.application,
            enums: data.enums,
            languages: data.languages
          })
        }
      }
    }
  },
})
