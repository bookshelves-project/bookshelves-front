
export type FormatDate = (date: Date) => string

export const date = (date: Date) => {
  date = new Date(date)

  let userLang = 'en'

  if (process.client) {
    userLang = navigator.language
  }

  return date.toLocaleString(userLang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
