export * from './api'
export * from './application'
export * from './entity'
export * from './navigation'
export * from './search'
export * from './toast'
export * from './utils'

export { }

declare global {
  type AppRoute = import('@/.nuxt/typed-link').RouteType

  interface Keyable {
    [key: string]: any
  }
}
