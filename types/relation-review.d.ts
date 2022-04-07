declare interface ReviewMeta {
  type?: string
  for?: string
  author?: string
  slug: string
}

declare interface Review {
  meta: ReviewMeta
  id: number
  text: string
  rating?: number
  user: User
  createdAt?: Date
  updatedAt?: Date
  title?: string
  cover?: string
  color?: string
}
