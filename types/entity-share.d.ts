declare interface Cover {
  thumbnail?: string
  og?: string
  simple?: string
  original?: string
  color?: string
}

declare interface TagMeta {
  slug: string
  author?: string
  show?: string
  books?: string
}

declare interface Tag {
  name: string
  type?: string
  count?: number
  firstChar?: string
  meta: TagMeta
}

declare interface SizesItem {
  size: string
  count: number
}

declare interface Sizes {
  cbz: SizesItem
  epub: SizesItem
  pdf: SizesItem
}

declare interface DownloadList {
  cbz?: DownloadFile
  epub?: DownloadFile
  pdf?: DownloadFile
  main?: DownloadFile
}

declare interface DownloadFile {
  name: string
  size: string
  url: string
  count?: number
  format: string
  isZip: boolean
}
