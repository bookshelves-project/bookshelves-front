// Global page headers (https://go.nuxtjs.dev/config-head)
import metadata from '../metadata'
import metadataDynamic from '../metadata/dynamic'
import metadataStatic from '../metadata/static'

const head: object = {
  title: metadata.website.title,
  titleTemplate: metadata.website.titleTemplate,
  htmlAttrs: {
    lang: metadata.settings.locale
  },
  meta: [
    ...metadataStatic(),
    ...metadataDynamic({}, { baseURL: process.env.BASE_URL })
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      href: '/apple-touch-icon.png'
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'manifest',
      crossorigin: 'use-credentials',
      href: '/manifest.webmanifest'
    }
  ]
}

export default head
