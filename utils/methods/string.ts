/**
 * Overflow text
 */
export const overflow = (text?: string, maxLength = 25) => {
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

/**
 * Capitalize first char of string
 */
export const capitalize = (string = '') =>
  [...string].map((char, index) => (index ? char : char.toUpperCase())).join('')

export const capitalizeEach = (string: string) => {
  const arr = string.split(' ')

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }

  return arr.join(' ')
}

/**
 * Slugify string
 */
export const slugify = (text: string) => {
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

/**
 * Generate random string
 */
export const randomString = (L: number) => {
  let s = ''
  const randomchar = function () {
    const n = Math.floor(Math.random() * 62)
    if (n < 10) {
      return n
    } // 1-10
    if (n < 36) {
      return String.fromCharCode(n + 55)
    } // A-Z
    return String.fromCharCode(n + 61) // a-z
  }
  while (s.length < L) {
    s += randomchar()
  }
  return s
}

export const getHostname = (url: string) => {
  return new URL(url).hostname
}
