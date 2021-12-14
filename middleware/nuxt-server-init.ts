import { Middleware } from '@nuxt/types'
import { useInitStore } from '~/stores/init'

const nuxtServerInit: Middleware = async (context) => {
  const store = useInitStore(context.$pinia)
  await store.nuxtServerInit(context)
}

export default nuxtServerInit
