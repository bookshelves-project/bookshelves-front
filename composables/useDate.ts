export const useDate = () => {
  function getDaysDiff(startDate = new Date(), endDate = new Date()) {
    if (startDate > endDate)
      [startDate, endDate] = [endDate, startDate]

    const timeDiff = endDate.getTime() - startDate.getTime()
    const timeDiffInDays = Math.floor(timeDiff / (1000 * 3600 * 24))

    return timeDiffInDays
  }

  // time difference in Months
  // function getMonthsDiff(startDate = new Date(), endDate = new Date()) {
  //   const monthsOfFullYears = getYearsDiff(startDate, endDate) * 12
  //   let months = monthsOfFullYears
  //   // the variable below is not necessary, but I kept it for understanding of code
  //   // we can use "startDate" instead of it
  //   const yearsAfterStart = new Date(
  //     startDate.getFullYear() + getYearsDiff(startDate, endDate),
  //     startDate.getMonth(),
  //     startDate.getDate()
  //   )
  //   const isDayAhead = endDate.getDate() >= yearsAfterStart.getDate()

  //   if (startDate.getMonth() === endDate.getMonth() && !isDayAhead) {
  //     months = 11
  //     return months
  //   }

  //   if (endDate.getMonth() >= yearsAfterStart.getMonth()) {
  //     const diff = endDate.getMonth() - yearsAfterStart.getMonth()
  //     months += isDayAhead ? diff : diff - 1
  //   } else {
  //     months += isDayAhead
  //       ? 12 - (startDate.getMonth() - endDate.getMonth())
  //       : 12 - (startDate.getMonth() - endDate.getMonth()) - 1
  //   }

  //   return months
  // }

  // time difference in Years
  function getYearsDiff(startDate = new Date(), endDate = new Date()) {
    if (startDate > endDate)
      [startDate, endDate] = [endDate, startDate]

    const yearB4End = new Date(
      endDate.getFullYear() - 1,
      endDate.getMonth(),
      endDate.getDate(),
    )
    let year = 0
    year
      = yearB4End > startDate
        ? yearB4End.getFullYear() - startDate.getFullYear()
        : 0
    const yearsAfterStart = new Date(
      startDate.getFullYear() + year + 1,
      startDate.getMonth(),
      startDate.getDate(),
    )

    if (endDate >= yearsAfterStart) {
      year++
    }

    return year
  }

  // time difference in format: X years, Y months, Z days
  const calExactTimeDiff = (firstDate?: Date, secondDate = new Date()) => {
    if (!firstDate)
      return ''

    firstDate = new Date(firstDate)
    secondDate = new Date(secondDate)
    if (firstDate > secondDate)
      [firstDate, secondDate] = [secondDate, firstDate]

    let monthDiff = 0
    const isDayAhead = secondDate.getDate() >= firstDate.getDate()

    if (secondDate.getMonth() >= firstDate.getMonth()) {
      const diff = secondDate.getMonth() - firstDate.getMonth()
      monthDiff += isDayAhead ? diff : diff - 1
    }
    else {
      monthDiff += isDayAhead
        ? 12 - (firstDate.getMonth() - secondDate.getMonth())
        : 12 - (firstDate.getMonth() - secondDate.getMonth()) - 1
    }

    let dayDiff = 0

    if (isDayAhead) {
      dayDiff = secondDate.getDate() - firstDate.getDate()
    }
    else {
      const b4EndDate = new Date(
        secondDate.getFullYear(),
        secondDate.getMonth() - 1,
        firstDate.getDate(),
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
      exactTimeDiffUnits.yrs === 0
      && exactTimeDiffUnits.mths === 0
      && exactTimeDiffUnits.dys === 0
    ) {
      const timeToString = firstDate.toLocaleString('fr', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: 'numeric',
        minute: 'numeric',
      })

      return `today at ${timeToString}`
    }

    let time = ''
    if (exactTimeDiffUnits.yrs > 0)
      time += `${exactTimeDiffUnits.yrs} years`

    if (exactTimeDiffUnits.mths > 0) {
      if (time !== '')
        time += ', '

      time += `${exactTimeDiffUnits.mths} months`
    }
    if (time !== '')
      time += ', '

    time += `${exactTimeDiffUnits.dys} days`
    // `${exactTimeDiffUnits.yrs} years, ${exactTimeDiffUnits.mths} months,

    return time
  }

  const date = (date?: Date) => {
    if (!date)
      return ''

    date = new Date(date)

    let userLang = 'en'

    if (process.client)
      userLang = navigator.language

    return date.toLocaleString(userLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return {
    calExactTimeDiff,
    date,
  }
}
