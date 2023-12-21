import type { Link, Meta, Script } from '@unhead/schema'

const link: Link<any['link']>[] = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/site.webmanifest',
  },
]
const meta: Meta<any['link']>[] = [
  {
    hid: 'robots',
    name: 'robots',
    content: 'index,follow',
  },
  { name: 'msapplication-TileColor', content: '#9333EA' },
  {
    name: 'theme-color',
    content: '#9333EA',
  },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  {
    hid: 'author',
    name: 'author',
    content: 'Bookshelves',
  },
  {
    hid: 'language',
    name: 'language',
    content: 'en-US',
  },
  {
    hid: 'designer',
    name: 'designer',
    content: 'Bookshelves',
  },
  {
    hid: 'publisher',
    name: 'publisher',
    content: 'Bookshelves',
  },
  {
    hid: 'copyright',
    name: 'copyright',
    content: 'Bookshelves',
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Bookshelves',
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'en-US',
  },
  {
    hid: 'google-site-verification',
    name: 'google-site-verification',
    content: 'HlYyBKngNkGks_Ys_Yebcn0UcKoCz1o-XMxuCzgMmuk',
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: process.env.NUXT_PUBLIC_SITE_URL,
  },
  {
    hid: 'og:image:alt',
    property: 'og:image:alt',
    content: 'Bookshelves',
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image',
  },
]
const script: Script<any['script']>[] = [
  {
    src: '/color-mode.js',
  },
  {
    'src': process.env.ANALYTICS_URL,
    'async': true,
    'data-website-id': process.env.ANALYTICS_ID,
    'type': 'text/javascript',
    'charset': 'utf-8',
  },
]

export default { link, meta, script }
