import { NuxtConfig } from 'nuxt'

const app = {
  head: {
    // bodyAttrs: {},
    // htmlAttrs: {},
    // link: [],
    // meta: [],
    noscript: [
      { children: 'Sorry but Javascript is required to use Bookshelves.' }
    ]
    // script: [],
    // style: [],
    // title: process.env.APP_NAME,
    // titleTemplate: process.env.APP_NAME
  }
} as NuxtConfig['app']

export default app
