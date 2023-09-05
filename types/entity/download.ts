export interface SizesItem {
  size: string
  count: number
}

export interface Sizes {
  cbz: SizesItem
  epub: SizesItem
  pdf: SizesItem
}

export interface DownloadFile {
  name: string
  size: string
  url: string
  reader?: string
  count?: number
  format: string
  isZip: boolean
}

export interface DownloadList {
  cbz?: DownloadFile
  epub?: DownloadFile
  pdf?: DownloadFile
  main?: DownloadFile
}
