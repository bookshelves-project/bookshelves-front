const link = [
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
    href: '/site.webmanifest'
  }
]
const meta = [
  {
    hid: 'robots',
    name: 'robots',
    content: process.env.META_ROBOT
  },
  { name: 'msapplication-TileColor', content: process.env.PRIMARY_COLOR_500 },
  { name: 'theme-color', content: process.env.PRIMARY_COLOR_500 },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  {
    hid: 'author',
    name: 'author',
    content: process.env.META_AUTHOR
  },
  {
    hid: 'language',
    name: 'language',
    content: process.env.META_LANG
  },
  {
    hid: 'designer',
    name: 'designer',
    content: process.env.META_AUTHOR
  },
  {
    hid: 'publisher',
    name: 'publisher',
    content: process.env.APP_NAME
  },
  {
    hid: 'copyright',
    name: 'copyright',
    content: process.env.APP_NAME
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: process.env.APP_NAME
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: process.env.META_LANG
  },
  process.env.META_TWITTER_SITE
    ? {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: process.env.META_TWITTER_SITE
      }
    : {},
  process.env.META_TWITTER_CREATOR
    ? {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: process.env.META_TWITTER_CREATOR
      }
    : {},
  process.env.GOOGLE_SITE_VERIFICATION_TOKEN
    ? {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION_TOKEN
      }
    : {},
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: process.env.BASE_URL
  },
  {
    hid: 'og:image:alt',
    property: 'og:image:alt',
    content: process.env.APP_NAME
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  }
]
const script = [
  {
    src: '/color-mode.js'
  }
]

export default { link, meta, script }
