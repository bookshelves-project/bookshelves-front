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
    content: 'Ewilan Rivière',
  },
  {
    hid: 'language',
    name: 'language',
    content: 'en-US',
  },
  {
    hid: 'designer',
    name: 'designer',
    content: 'Ewilan Rivière',
  },
  {
    hid: 'publisher',
    name: 'publisher',
    content: 'Ewilan Rivière Portfolio',
  },
  {
    hid: 'copyright',
    name: 'copyright',
    content: 'Ewilan Rivière Portfolio',
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Ewilan Rivière',
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'en-US',
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@ewilanriviere',
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@ewilanriviere',
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
    content: 'Ewilan Rivière',
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
  },
]

export default { link, meta, script }
