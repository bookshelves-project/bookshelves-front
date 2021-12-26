import { Middleware } from '@nuxt/types'
import { useInitStore } from '~/stores/init'

const nuxtInit: Middleware = async (context) => {
  // const store = useInitStore(context.$pinia)
  // await store.nuxtInit(context)
}

export default nuxtInit
