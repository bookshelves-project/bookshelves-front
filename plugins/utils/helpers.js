import Vue from 'vue'

// Format date from API
const formatDate = (date) => {
  date = new Date(date)

  let userLang = 'en'

  if (process.client) {
    userLang = navigator.language || navigator.userLanguage
  }
  console.log(userLang)

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
