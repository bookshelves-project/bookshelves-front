export const usePagination = () => {
  const ellipsesThreshold = 3
  const limit = ref(5)

  const pages = ref(1)
  const current = ref(1)
  const numberOfLinks = ref(1)
  const startNumber = ref(1)

  const displayLastPage = computed((): boolean => {
    if (current.value <= pages.value - (limit.value - 2)) {
      return true
    }

    return false
  })

  const showAllPages = computed((): boolean => {
    return pages.value <= limit.value
  })

  const nearFromBeginning = computed((): boolean => {
    return (
      !showAllPages.value &&
      current.value < limit.value - 1 &&
      limit.value > ellipsesThreshold
    )
  })
  const nearFromEnd = computed((): boolean => {
    return (
      !showAllPages.value &&
      !nearFromBeginning.value &&
      pages.value - current.value + 2 < limit.value &&
      limit.value > ellipsesThreshold
    )
  })
  const isOnTheMiddle = computed((): boolean => {
    return (
      !showAllPages.value &&
      !nearFromBeginning.value &&
      !nearFromEnd.value &&
      limit.value > ellipsesThreshold
    )
  })
  const showFirstDots = computed((): boolean => {
    return nearFromEnd.value || isOnTheMiddle.value
  })
  const showLastDots = computed((): boolean => {
    return nearFromBeginning.value || isOnTheMiddle.value
  })

  const linkGen = (pageNum: number) => {
    const route = useRoute()
    const newQuery = { ...route.query }
    newQuery.page = pageNum.toString()
    if (pageNum === 0) {
      newQuery.page = '1'
    }
    if (pageNum === pages.value + 1) {
      newQuery.page = pages.value.toString()
    }

    const newRoute = {
      name: route.name || 'index',
      query: { ...newQuery },
    }

    return newRoute
  }

  const isActive = (pageNum: number) => {
    return current.value === pageNum
  }
  const getTag = (pageNum: number) => {
    return isActive(pageNum) ? 'em' : 'router-link'
  }

  const calcStartNumber = (): number => {
    let startNumber = 1

    if (nearFromEnd.value) {
      startNumber = pages.value - numberOfLinks.value + 1
    } else if (isOnTheMiddle.value) {
      startNumber = current.value - Math.floor(numberOfLinks.value / 2)
    }

    if (startNumber > pages.value - numberOfLinks.value) {
      startNumber = pages.value - numberOfLinks.value + 1
    }
    if (startNumber < 1) {
      startNumber = 1
    }

    return startNumber
  }

  const calcNumberOfLinks = (): number => {
    let numberOfLinks = limit.value
    if (showAllPages.value) {
      numberOfLinks = pages.value
    }
    if (nearFromBeginning.value || nearFromEnd.value) {
      numberOfLinks = limit.value - 1
    }
    if (isOnTheMiddle.value) {
      // return this.limit - 2
      numberOfLinks = limit.value
    }

    return Math.trunc(numberOfLinks)
  }

  const init = (propsPages: number, propsCurrent: number) => {
    pages.value = propsPages
    current.value = propsCurrent

    if (pages.value >= 8) {
      const limitCalc = pages.value / 3
      if (limitCalc <= 8) {
        limit.value = limitCalc
      } else {
        limit.value = 8
      }
    }

    numberOfLinks.value = calcNumberOfLinks()
    startNumber.value = calcStartNumber()
  }

  return {
    startNumber,
    numberOfLinks,
    linkGen,
    init,
    pages,
    current,
    showFirstDots,
    showLastDots,
    isActive,
    getTag,
    displayLastPage,
  }
}
