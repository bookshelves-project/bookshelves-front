declare interface FavoritableMeta {
  type: string
  for: string
  author: string
  slug: string
}

declare interface Favoritable {
  meta: FavoritableMeta
  title: string
  text?: string
  cover?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
}
