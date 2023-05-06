// declare interface PublisherMeta {
//   slug: string
//   books: string
//   show: string
// }

export interface Publisher {
  name: string
  count: number
  first_char: string
  meta: any // PublisherMeta
}
