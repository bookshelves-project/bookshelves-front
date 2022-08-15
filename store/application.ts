import { defineStore } from 'pinia'
import { CookieRef } from '#app'

export const useApplicationStore = defineStore('application', {
  state: () => ({
    homePage: {} as CmsHomePage,
    headConfig: {} as HeadConfig,
    enums: {} as ApplicationEnums,
    languages: {} as Language[],
    available: false
  }),
  actions: {
    async nuxtInit() {
      const cookie = useCookie('application', {
        sameSite: 'strict'
      })
      if (!this.available) {
        if (cookie.value !== undefined) {
          console.warn('init: from cookie')

          const data = cookie.value as unknown as Application

          this.$patch({
            headConfig: data.headConfig,
            enums: data.enums,
            languages: data.languages,
            available: true
          })
        } else {
          console.warn('init: from api')

          await this.fetchApplication(cookie)
        }
      }
    },
    async fetchApplication(cookie: CookieRef<string>) {
      const { request } = useHttp()

      const response = await request<Application>({
        endpoint: '/application',
        extractData: true
      })
      cookie.value = JSON.stringify(response.body)

      this.$patch({
        headConfig: response?.body.headConfig,
        enums: response?.body.enums,
        languages: response?.body.languages,
        available: true
      })
    },
    setHomePage(payload?: CmsHomePage) {
      this.$patch({
        homePage: payload
      })
    }
  }
})
