export interface Author {
  name?: string
  meta?: AuthorMeta
}

export interface AuthorMeta {
  slug?: string
  show?: string
}

export interface Cover {
  thumbnail?: string
  simple?: string
  color?: string
}

export interface BookMeta {
  slug?: string
  author?: string
  show?: string
}

export interface Serie {
  title?: string
  meta?: BookMeta
}
