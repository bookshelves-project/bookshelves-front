declare interface PublisherMeta {
  slug: string
  books: string
  show: string
}

declare interface Publisher {
  name: string
  count: number
  first_char: string
  meta: PublisherMeta
}
