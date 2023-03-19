import type { NuxtConfig } from 'nuxt/config'
import head from './head'

const app = {
  head: {
    link: head.link,
    meta: head.meta,
    noscript: [
      { children: 'Sorry but Javascript is required to use Bookshelves.' },
    ],
    script: head.script,
    // title: process.env.APP_NAME,
    // titleTemplate: process.env.APP_NAME
  },
} as NuxtConfig['app']

export default app
