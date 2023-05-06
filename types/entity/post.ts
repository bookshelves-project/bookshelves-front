// interface PostMeta {
//   slug: string
//   title?: string
//   description?: string
//   show: string
// }

export interface Post {
  title: string
  meta: any // PostMeta
  cover?: string
  category?: string
  user?: string
  summary?: string
  publishedAt?: Date
  updatedAt?: Date
  pin?: boolean
  body?: string
}
