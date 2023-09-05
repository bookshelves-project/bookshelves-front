import type { Language, Publisher, Tag } from '~/types'

export function useRelation(route?: AppRoute) {
  const { objectGetValue } = useTools()

  const percent = (bestCount: number, value?: number) => {
    return value ? (value * 100) / bestCount : 1
  }

  const getBestCount = (entities: Language[] | Tag[] | Publisher[]) => {
    let minimal = 0
    entities?.forEach((element) => {
      if (minimal < element.count!)
        minimal = element.count!
    })
    return minimal
  }

  const color = (percentage?: number) => {
    let style = 'green'
    if (percentage) {
      if (percentage >= 15)
        style = 'green'
      if (percentage >= 25)
        style = 'cyan'
      if (percentage >= 35)
        style = 'blue'
      if (percentage >= 45)
        style = 'purple'
      if (percentage >= 60)
        style = 'red'
      if (percentage >= 75)
        style = 'orange'
      if (percentage >= 85)
        style = 'yellow'
    }

    return style
  }

  const getRoute = (item: Keyable): AppRoute => {
    const params: Keyable = {}
    const query: Keyable = {}

    if (route?.params) {
      for (const [key, value] of Object.entries(route?.params))
        params[key] = objectGetValue(item, value as string | number)
    }
    if (route?.query) {
      for (const [key, value] of Object.entries(route?.query))
        query[key] = objectGetValue(item, (value as string | number))
    }

    return {
      name: route?.name,
      params,
      query,
    } as AppRoute
  }

  return {
    percent,
    getBestCount,
    color,
    getRoute,
  }
}
