import { defineStore } from 'pinia'
import type { Application, ApplicationEnums, Language } from '~/types'

export const useApplicationStore = defineStore('application', {
  state: () => ({
  //   homePage: {} as CmsHomePage,
  //   headConfig: {} as HeadConfig,
    enums: {} as ApplicationEnums,
    languages: {} as Language[],
    available: false,
  }),
  actions: {
    async nuxtInit() {
      // const { me } = useAuth()
      // await me()

      // const cookie = useCookie('application', {
      //   sameSite: 'strict',
      // })
      // if (!this.available) {
      //   if (cookie.value !== undefined) {
      //     console.warn('init: from cookie')

      //     const data = cookie.value as unknown as Application

      //     this.$patch({
      //       headConfig: data.headConfig,
      //       enums: data.enums,
      //       languages: data.languages,
      //       available: true,
      //     })
      //   }
      //   else {
      //     console.warn('init: from api')

      //     await this.fetchApplication(cookie)
      //   }
      // }

      if (!this.available)
        await this.fetchApplication()
    },
    async fetchApplication() {
      const response = await useHttp<Application>({
        name: '/app',
        watch: false,
        // extractData: true,
      })
      // cookie.value = JSON.stringify(response.body)

      this.$patch({
        // headConfig: response?.body?.headConfig,
        enums: response?.enums,
        languages: response?.languages,
        available: true,
      })
    },
  //   setHomePage(payload?: CmsHomePage) {
  //     this.$patch({
  //       homePage: payload,
  //     })
  //   },
  },
})
