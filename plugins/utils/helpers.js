import Vue from 'vue'

// Format date from API
const formatDate = (date) => {
  date = new Date(date)

  let userLang = 'en'

  if (process.client) {
    userLang = navigator.language || navigator.userLanguage
  }

  return date.toLocaleString(userLang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
Vue.prototype.$formatDate = formatDate

// Limit length of string
const overflow = (text, maxLength = 25) => {
  if (text) {
    let overflow = text
    if (text.length > maxLength) {
      overflow = text.substring(0, maxLength)
      overflow = `${overflow}...`
    }
    return overflow
  }
  return ''
}

Vue.prototype.$overflow = overflow

const apiUrlBase = (endpoint = '') => {
  let api = process.env.API_URL
  api = api.replace('/api', '')
  api = `${api}${endpoint}`
  return api
}

Vue.prototype.$apiUrlBase = apiUrlBase

const toggleOverlay = ($store, status = false) => {
  if (status) {
    $store.commit('overlay/setVisibleLayer', status)
    setTimeout(() => {
      $store.commit('overlay/setVisibleOverlay', status)
    }, 150)
  } else {
    $store.commit('overlay/setVisibleOverlay', status)
    setTimeout(() => {
      $store.commit('overlay/setVisibleLayer', status)
    }, 250)
  }
}
Vue.prototype.$toggleOverlay = toggleOverlay

// export default function ({ app, store }, inject) {
//   const helpers = {
//     getAdminLogin() {
//       return app.$config
//     },
//     getOverlayState() {
//       console.log(store.state.overlay.visibleLayer)
//     },
//   }
//   inject('helpers', helpers)
// }
// this.$helpers.getAdminLogin()
// doc: https://stackoverflow.com/questions/64564864/privateruntimeconfig-values-are-undefined-under-plugins
