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
export const formatAuthors = (authors) => {
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

// get all authors into a string from array of object
export const formatTags = (tags) => {
  if (tags) {
    let entitiesToString = ''
    tags.forEach((tag, tagId) => {
      entitiesToString += `${tag.name}`
      if (tags.length > 1 && tagId !== tags.length - 1) {
        entitiesToString += ' & '
      }
    })
    return entitiesToString
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

// time difference in Days
function getDaysDiff(startDate = new Date(), endDate = new Date()) {
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate]

  const timeDiff = endDate - startDate
  const timeDiffInDays = Math.floor(timeDiff / (1000 * 3600 * 24))

  return timeDiffInDays
}

// time difference in Months
// eslint-disable-next-line no-unused-vars
function getMonthsDiff(startDate = new Date(), endDate = new Date()) {
  const monthsOfFullYears = getYearsDiff(startDate, endDate) * 12
  let months = monthsOfFullYears
  // the variable below is not necessary, but I kept it for understanding of code
  // we can use "startDate" instead of it
  const yearsAfterStart = new Date(
    startDate.getFullYear() + getYearsDiff(startDate, endDate),
    startDate.getMonth(),
    startDate.getDate()
  )
  const isDayAhead = endDate.getDate() >= yearsAfterStart.getDate()

  if (startDate.getMonth() === endDate.getMonth() && !isDayAhead) {
    months = 11
    return months
  }

  if (endDate.getMonth() >= yearsAfterStart.getMonth()) {
    const diff = endDate.getMonth() - yearsAfterStart.getMonth()
    months += isDayAhead ? diff : diff - 1
  } else {
    months += isDayAhead
      ? 12 - (startDate.getMonth() - endDate.getMonth())
      : 12 - (startDate.getMonth() - endDate.getMonth()) - 1
  }

  return months
}

// time difference in Years
function getYearsDiff(startDate = new Date(), endDate = new Date()) {
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate]

  const yearB4End = new Date(
    endDate.getFullYear() - 1,
    endDate.getMonth(),
    endDate.getDate()
  )
  let year = 0
  year =
    yearB4End > startDate
      ? yearB4End.getFullYear() - startDate.getFullYear()
      : 0
  const yearsAfterStart = new Date(
    startDate.getFullYear() + year + 1,
    startDate.getMonth(),
    startDate.getDate()
  )

  if (endDate >= yearsAfterStart) year++

  return year
}

// time difference in format: X years, Y months, Z days
export const calExactTimeDiff = (firstDate, secondDate = new Date()) => {
  firstDate = new Date(firstDate)
  secondDate = new Date(secondDate)
  if (firstDate > secondDate) [firstDate, secondDate] = [secondDate, firstDate]

  let monthDiff = 0
  const isDayAhead = secondDate.getDate() >= firstDate.getDate()

  if (secondDate.getMonth() >= firstDate.getMonth()) {
    const diff = secondDate.getMonth() - firstDate.getMonth()
    monthDiff += isDayAhead ? diff : diff - 1
  } else {
    monthDiff += isDayAhead
      ? 12 - (firstDate.getMonth() - secondDate.getMonth())
      : 12 - (firstDate.getMonth() - secondDate.getMonth()) - 1
  }

  let dayDiff = 0

  if (isDayAhead) {
    dayDiff = secondDate.getDate() - firstDate.getDate()
  } else {
    const b4EndDate = new Date(
      secondDate.getFullYear(),
      secondDate.getMonth() - 1,
      firstDate.getDate()
    )
    dayDiff = getDaysDiff(b4EndDate, secondDate)
  }

  if (firstDate.getMonth() === secondDate.getMonth() && !isDayAhead)
    monthDiff = 11

  const exactTimeDiffUnits = {
    yrs: getYearsDiff(firstDate, secondDate),
    mths: monthDiff,
    dys: dayDiff,
  }

  if (exactTimeDiffUnits.yrs > 3) {
    const dateTimeLocale = firstDate.toLocaleString('fr', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    return dateTimeLocale
  }

  if (
    exactTimeDiffUnits.yrs === 0 &&
    exactTimeDiffUnits.mths === 0 &&
    exactTimeDiffUnits.dys === 0
  ) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const hoursOptions = {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
    }

    const timeToString = firstDate.toLocaleString('fr', hoursOptions)

    return `today at ${timeToString}`
  }

  let time = ''
  if (exactTimeDiffUnits.yrs > 0) {
    time += `${exactTimeDiffUnits.yrs} years`
  }
  if (exactTimeDiffUnits.mths > 0) {
    if (time !== '') {
      time += ', '
    }
    time += `${exactTimeDiffUnits.mths} months`
  }
  if (time !== '') {
    time += ', '
  }
  time += `${exactTimeDiffUnits.dys} days`
  // `${exactTimeDiffUnits.yrs} years, ${exactTimeDiffUnits.mths} months,

  return time
}
