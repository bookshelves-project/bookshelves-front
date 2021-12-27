import { Middleware } from '@nuxt/types'
import { useApplicationStore } from '~/stores/application'

const nuxtInit: Middleware = async (context) => {
  const store = useApplicationStore(context.$pinia)
  await store.init(context)
}

export default nuxtInit
