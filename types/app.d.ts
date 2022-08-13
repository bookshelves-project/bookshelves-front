declare interface Keyable {
  [key: string]: any
}
declare interface Route {
  name?: string
  params?: Keyable
  query?: Query
  paramsList?: Keyable
  queryList?: Keyable
}

declare type Dictionary<T> = { [key: string]: T }

declare interface TocItem {
  text?: string
  level?: number
  id?: string
  parent?: TocItem
  children?: TocItem[]
}
