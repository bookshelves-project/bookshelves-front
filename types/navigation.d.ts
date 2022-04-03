declare interface RouteLink {
  label: string
  icon?: string
  route: Route
}
declare interface FooterColumn {
  title: string
  links: RouteLink[]
}
