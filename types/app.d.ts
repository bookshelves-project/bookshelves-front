declare interface Route {
  name?: string
  params?: Keyable
  query?: Query
  paramsList?: Keyable
  queryList?: Keyable
}

declare interface Keyable {
  [key: string]: any
}
declare type Dictionary<T> = { [key: string]: T }
