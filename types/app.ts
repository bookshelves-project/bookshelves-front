declare interface Keyable {
  [key: string]: any
}

declare interface Dictionary<T> { [key: string]: T }

declare interface TocItem {
  text?: string
  level?: number
  id?: string
  parent?: TocItem
  children?: TocItem[]
}

interface TypedRoute {
  name: import('@/.nuxt/router').TypedRouteList
  params?: import('@/.nuxt/router/typed-router').TypedRouteParams[import('@/.nuxt/router').TypedRouteList]
  query?: Query
}
