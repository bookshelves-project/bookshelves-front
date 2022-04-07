declare interface UserDataMeta {
  type: string
  for: string
  author: string
  slug: string
}

declare interface UserData {
  meta: UserDataMeta
  title: string
  text?: string
  cover?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
}

declare interface Favoritable extends UserData {}

declare interface Review extends UserData {
  id: number
  text: string
  rating?: number
  user: User
}
