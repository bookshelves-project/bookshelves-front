declare interface UserMeta {
  slug: string
  show: string
  banner?: string
  show_reviews?: string
  show_favorites?: string
}

declare interface User {
  id: number
  meta: UserMeta
  name: string
  slug: string
  email: string
  role: string
  about?: string
  gender?: string
  avatar?: string
  color?: string
  use_gravatar: boolean
  reviews_count: number
  favorites_count: number
  is_admin: boolean
  display_reviews: boolean
  display_favorites: boolean
  display_gender: boolean
}
