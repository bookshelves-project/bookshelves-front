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
