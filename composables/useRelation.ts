import { getValue } from '@/utils/methods'

export const useRelation = (route?: Route) => {
  const percent = (bestCount: number, value?: number) => {
    return value ? (value * 100) / bestCount : 1
  }

  const getBestCount = (entities: Language[] | Tag[]) => {
    let minimal = 0
    entities?.forEach((element) => {
      if (minimal < element.count!) {
        minimal = element.count!
      }
    })
    return minimal
  }

  const color = (percentage?: number) => {
    let style = 'green'
    if (percentage) {
      if (percentage >= 15) { style = 'green' }
      if (percentage >= 25) { style = 'cyan' }
      if (percentage >= 35) { style = 'blue' }
      if (percentage >= 45) { style = 'purple' }
      if (percentage >= 60) { style = 'red' }
      if (percentage >= 75) { style = 'orange' }
      if (percentage >= 85) { style = 'yellow' }
    }

    return style
  }

  const getRoute = (item: Keyable): Route => {
    const params: Keyable = {}
    const query: Keyable = {}

    if (route?.paramsList) {
      for (const [key, value] of Object.entries(route?.paramsList)) {
        params[key] = getValue(item, value)
      }
    }
    if (route?.queryList) {
      for (const [key, value] of Object.entries(route?.queryList)) {
        query[key] = getValue(item, value)
      }
    }
    return {
      name: route?.name,
      params,
      query
    }
  }

  return {
    percent,
    getBestCount,
    color,
    getRoute
  }
}
