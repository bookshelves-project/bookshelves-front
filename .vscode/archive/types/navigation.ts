declare interface RouteLink {
  label: string
  icon?: import('@/.nuxt/types/svg-library').SvgLibrary
  route: TypedRoute
}
declare interface FooterColumn {
  title: string
  links: RouteLink[]
}
