import type { Context, Plugin } from '@nuxt/types'

type Truncater = (text: string) => string
type Overlay = (status: boolean) => void

declare module 'vue/types/vue' {
  interface Vue {
    $truncate: Truncater,
    $overlay: Overlay,

  }
}

const truncater: Truncater = (text: string) => text.length > 15 ? text.substring(0, 15) : text
const helperPlugin: Plugin = (_context, inject) => {
  inject('truncate', truncater)
  inject('overlay', (status: boolean) => {
    const store = _context.store
    if (status) {
      store.commit('overlay/setVisibleLayer', status)
      setTimeout(() => {
        store.commit('overlay/setVisibleOverlay', status)
      }, 150)
    } else {
      store.commit('overlay/setVisibleOverlay', status)
      setTimeout(() => {
        store.commit('overlay/setVisibleLayer', status)
      }, 250)
    }
  })
}

export default helperPlugin
