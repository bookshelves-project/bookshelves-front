export interface Profile {
  // id: number
  name: string
  slug: string
  email: string
  gender: string
  about: string
  is_admin: boolean
  comments_count: number
  favorites_count: number
  avatar: string
  use_gravatar: boolean
  display_comments: boolean
  display_favorites: boolean
  display_gender: boolean
}
