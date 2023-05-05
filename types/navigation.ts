export type AppRoute = import('@/.nuxt/typed-link').RouteType

export interface RouteLink {
  label: string
  icon?: import('@/.nuxt/svg-transformer').IconType
  route: AppRoute
}

export interface FooterColumn {
  title: string
  links: RouteLink[]
}
