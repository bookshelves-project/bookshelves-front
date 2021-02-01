/* eslint-disable no-unused-vars */
import Vue from 'vue'

const capitalize = (string = '') =>
  [...string]
    .map(
      // Convert to array with each item is a char of
      // string by using spread operator (...)
      (char, index) => (index ? char : char.toUpperCase()) // Index true means not equal 0, so (!index) is
      // the first character which is capitalized by
      // the `toUpperCase()` method
    )
    .join('') // Return back to string

Vue.prototype.$capitalize = capitalize

const getDate = (date) => {
  // the param is raw DateTime from API like 2020-10-16T08:18:49.000000Z
  // convert date to JS Date
  // example here date param is '2020-10-16T08:18:49.000000Z'
  date = new Date(date)

  // define options
  let userLang = 'en'
  // for Nuxt
  if (process.client) {
    userLang = navigator.language || navigator.userLanguage
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateOptions = {
    year: 'numeric',
    // weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  const hoursOptions = {
    // timeZone: 'UTC',
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  // get Date Time
  // 16/10/2020 à 10:18:49
  // const dateTimeLocale = date.toLocaleString()
  // console.log(dateTimeLocale)

  // Fri Oct 16 2020 10:18:49 GMT+0200 (heure d’été d’Europe centrale)
  // const dateTimeToStringFullLocale = date.toString()
  // console.log(dateTimeToStringFullLocale)

  // Fri, 16 Oct 2020 08:18:49 GMT
  // const dateTimeToStringFull = date.toUTCString()
  // console.log(dateTimeToStringFull)

  // vendredi 16 octobre 2020
  const dateToStringLocale = date.toLocaleString(userLang, dateOptions)
  // console.log(dateToStringLocale)

  // 08:18:49
  // const timeToString = date.toLocaleString(userLang, hoursOptions)
  // console.log(timeToString)

  // 10:18:49
  // const timeToStringLocale = date.toLocaleTimeString()
  // console.log(timeToStringLocale)

  return dateToStringLocale
}

Vue.prototype.$getDate = getDate

const shuffle = (a) => {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

Vue.prototype.$shuffle = shuffle

const overflow = (text, maxLength = 30) => {
  let overflow = text.replace(/^(.{30}[^\s]*).*/, '$1')
  if (text.length > maxLength) {
    overflow = `${overflow}...`
  }
  return overflow
}

Vue.prototype.$overflow = overflow
