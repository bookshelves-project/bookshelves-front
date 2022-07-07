import { defineStore } from 'pinia'
import { CookieRef } from '#app'

export const useApplicationStore = defineStore('application', {
  state: () => ({
    homePage: {} as CmsHomePage,
    headConfig: {} as HeadConfig,
    enums: {} as ApplicationEnums,
    languages: {} as Language[],
    available: false,
  }),
  actions: {
    async nuxtInit() {
      const cookie = useCookie('application')
      if (!this.available) {
        if (cookie.value !== undefined) {
          console.log('init: from cookie')

          const data = cookie.value as unknown as Application

          this.$patch({
            headConfig: data.headConfig,
            enums: data.enums,
            languages: data.languages,
            available: true,
          })
        } else {
          console.log('init: from api')

          await this.fetchApplication(cookie)
        }
      }
    },
    async fetchApplication(cookie: CookieRef<string>) {
      const { nuxtAsyncData } = useFetchable()

      const response = await nuxtAsyncData<Application>('/application')
      cookie.value = JSON.stringify(response)

      this.$patch({
        headConfig: response?.headConfig,
        enums: response?.enums,
        languages: response?.languages,
        available: true,
      })
    },
    setHomePage(payload: CmsHomePage) {
      this.$patch({
        homePage: payload,
      })
    },
  },
})
