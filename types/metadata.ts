declare interface MetadataBase {
  settings: {
    robots: string
    disallow: string
    color: string
    locale: string
    lang: string
    googleToken: string
  }
  website: {
    title: string
    titleTemplate: string
    description: string
    rating: string
    keywords: string[]
    author: string
    publisher: string
    copyright: string
    language: string
    designer: string
  }
  og: {
    type: string
    siteName: string
  }
  twitter: {
    creator?: string
    site?: string
    url?: string
  }
}

declare interface HeadMeta {
  description?: string
  route?: string
  image?: string
  type?: string
  url?: string
  title?: string
  articlePublishedTime?: string
  articleAuthor?: string
  articleSection?: string
  bookISBN?: string
  bookAuthor?: string
  bookReleaseDate?: string
  bookTag?: string
  profileFirstName?: string
  profileLastName?: string
}

declare interface HeadElement {
  hid?: string
  name?: string
  property?: string
  content?: string
}
