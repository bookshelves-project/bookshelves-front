declare interface CommentMeta {
  type?: string
  for?: string
  author?: string
  slug?: string
}

declare interface CommentUser {
  id: number
  name: string
  slug: string
  avatar: string
  color: string
}

declare interface CommentData {
  meta?: CommentMeta
  id: number
  text: string
  rating?: number
  user: CommentUser
  createdAt?: Date
  updatedAt?: Date
  title?: string
  cover?: string
}
