import { useApplicationStore } from '~~/store/application'

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    'application',
    () => {
      const { nuxtInit } = useApplicationStore()
      nuxtInit()
    },
    { global: true }
  )
})
