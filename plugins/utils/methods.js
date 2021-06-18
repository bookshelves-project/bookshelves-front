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

// get language flag url or label from slug
export const formatLanguage = (slug, type = 'label') => {
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
    const availableTypes = {
      label: language.label,
      flag: `https://www.countryflags.io/${lang}/flat/24.png`,
    }
    return availableTypes[type] || availableTypes.default
  }

  return 'unknown'
}

// get all authors into a string from array of object
export const getAuthors = (authors) => {
  if (authors) {
    let authorsToString = ''
    authors.forEach((author, authorId) => {
      authorsToString += `${author.name}`
      if (authors.length > 1 && authorId !== authors.length - 1) {
        authorsToString += ' & '
      }
    })
    return authorsToString
  }

  return 'unknown'
}

// get domain of URL
export const getHostname = (url) => {
  return new URL(url).hostname
}

// Check if an object in contain in an array
export const containsObject = (obj, list) => {
  let i
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true
    }
  }

  return false
}

// Check if object is empty
export const objectIsEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

// Capitalize first character
export const capitalize = (string = '') =>
  [...string].map((char, index) => (index ? char : char.toUpperCase())).join('')

// Slugify string
export const slugify = (text) => {
  if (text !== null && text !== undefined) {
    return text
      .toString()
      .toLowerCase()
      .replace(/["']/i, '-')
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
  }
}
