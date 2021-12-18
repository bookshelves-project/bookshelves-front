import type { Plugin } from '@nuxt/types'
import { date, FormatDate } from './helpers/date'
import { Route } from '~/types'

type Truncater = (text: string) => string
type Overlay = (status: boolean) => void
type LocalePath = (route: Route) => void

declare module 'vue/types/vue' {
  interface Vue {
    $truncate: Truncater,
    $overlay: Overlay,
    $date: FormatDate,
    // $localePath: LocalePath
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
  inject('date', date)
  // inject('localePath', (route: Route) => {
  //   console.log(route)
  //   return '/'
  // })
}

export default helperPlugin
