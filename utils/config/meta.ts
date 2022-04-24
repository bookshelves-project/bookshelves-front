import { MetaObject } from '#app'

const meta: MetaObject = {
  link: [
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      href: '/apple-touch-icon.png',
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'manifest',
      crossorigin: 'use-credentials',
      href: '/manifest.webmanifest',
    },
  ],
  meta: [
    process.env.GOOGLE_SITE_VERIFICATION_TOKEN
      ? {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
        }
      : {},
  ],
  script: [
    {
      src: '/color-mode.js',
    },
  ],
  titleTemplate: 'Bookshelves',
}

export default meta
