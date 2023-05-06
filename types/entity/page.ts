// declare interface PageMeta {
//   slug: string
//   title?: string
//   description?: string
//   show: string
// }
export interface Page {
  title: string
  meta: any // PageMeta
  cover?: string
  summary?: string
  publishedAt?: Date
  updatedAt?: Date
  body?: string
}
