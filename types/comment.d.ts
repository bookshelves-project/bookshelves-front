declare interface CommentMeta {
  type?: string
  for?: string
  author?: string
  slug?: string
}

declare interface CommentData {
  meta?: CommentMeta
  id?: number
  text?: string
  rating?: number
  user?: User
  createdAt?: Date
  updatedAt?: Date
  title?: string
  cover?: string
}
