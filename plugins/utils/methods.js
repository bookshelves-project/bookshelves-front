// Generate random string
export const randomString = (L) => {
  let s = ''
  const randomchar = function () {
    const n = Math.floor(Math.random() * 62)
    if (n < 10) return n // 1-10
    if (n < 36) return String.fromCharCode(n + 55) // A-Z
    return String.fromCharCode(n + 61) // a-z
  }
  while (s.length < L) s += randomchar()
  return s
}

export const getLanguage = (slug) => {
  const available = [
    {
      slug: 'fr',
      label: 'French',
    },
    {
      slug: 'en',
      label: 'English',
    },
  ]

  const language = available.find((lang) => lang.slug === slug)
  if (language) {
    return language.label
  }
}

export const formatLanguage = (slug, type = 'flag') => {
  const available = [
    {
      slug: 'fr',
      id: 'fr',
      label: 'French',
    },
    {
      slug: 'en',
      id: 'gb',
      label: 'English',
    },
  ]

  const language = available.find((lang) => lang.slug === slug)
  if (language) {
    const lang = language.id
    if (type === 'flag') {
      return `https://www.countryflags.io/${lang}/flat/32.png`
    } else {
      return language.label
    }
  }

  return 'unknown'
}

export const getAuthors = (authors) => {
  let authorsToString = ''
  authors.forEach((author, authorId) => {
    authorsToString += `${author.name}`
    if (authors.length > 1 && authorId !== authors.length - 1) {
      authorsToString += ' & '
    }
  })
  return authorsToString
}

export const getHostname = (url) => {
  return new URL(url).hostname
}

export const containsObject = (obj, list) => {
  let i
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true
    }
  }

  return false
}

export const objectIsEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}
