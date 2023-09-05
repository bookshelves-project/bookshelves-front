import { useApplicationStore } from '~/stores/application'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { nuxtInit } = useApplicationStore()
  await nuxtInit()
})
