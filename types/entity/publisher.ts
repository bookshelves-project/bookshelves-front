// declare interface PublisherMeta {
//   slug: string
//   books: string
//   show: string
// }

export interface Publisher {
  name: string
  count: number
  firstChar: string
  meta: any // PublisherMeta
}
