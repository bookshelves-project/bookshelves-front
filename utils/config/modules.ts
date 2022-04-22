// import type { AxiosOptions } from '@nuxtjs/axios'
// import type { Options } from '@nuxtjs/i18n'
// import { ModuleOptions, RecursivePartial } from '@nuxtjs/auth-next'
// import type { IContentOptions } from '@nuxt/content'
// import { ModuleOptions } from '@nuxtjs/color-mode/dist/module'
import { ModuleOptions } from '@nuxt/schema'
// import { ApiEndpoint } from '../../types/index'
// import pwaData from './pwa'

const headers = {
  common: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
}

// const axios: AxiosOptions = {
//   baseURL: process.env.API_URL || 'http://localhost:8000',
//   credentials: true,
//   // https: true,
//   headers
// }
// const pwa = {
//   meta: pwaData.meta,
//   manifest: pwaData.manifest
// }
// const authToken: RecursivePartial<ModuleOptions> = {
//   redirect: {
//     login: '/sign-in',
//     logout: '/',
//     callback: '/sign-in',
//     home: '/profile'
//   },
//   strategies: {
//     laravelSanctum: {
//       provider: 'laravel/sanctum',
//       url: process.env.API_URL || 'http://localhost:8000',
//       endpoints: {
//         login: { url: '/api/v1/login/token', method: 'post' },
//         user: { url: '/api/v1/user', method: 'get' },
//         logout: { url: '/api/v1/logout/token', method: 'post' }
//       },
//       tokenRequired: false,
//       tokenType: false
//     }
//   },
//   localStorage: false
// }
// const authSession: RecursivePartial<ModuleOptions> = {
//   redirect: {
//     login: '/sign-in',
//     logout: '/',
//     callback: '/sign-in',
//     home: '/profile'
//   },
//   strategies: {
//     laravelSantum: {
//       provider: 'laravel/sanctum',
//       url: process.env.API_URL || 'http://localhost:8000',
//       endpoints: {
//         login: { url: '/api/v1/login', methods: 'post' },
//         user: { url: '/api/v1/user', methods: 'get' },
//         logout: { url: '/api/v1/logout', methods: 'post' }
//       },
//       user: {
//         property: false
//       },
//     }
//   },
//   cookie: {
//     prefix: 'web'
//   },
// }
// const content: IContentOptions = {
//   liveEdit: false,
//   // https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
//   markdown: {
//     prism: {
//       // https://github.com/PrismJS/prism-themes
//       theme: 'assets/css/code'
//     }
//   }
// }
// const robots = {
//   Disallow: metadata.settings.disallow.split(','),
//   Sitemap: `${process.env.BASE_URL}/sitemap.xml`
// }
// const sitemap = {
//   path: '/sitemap.xml',
//   hostname: process.env.BASE_URL,
//   cacheTime: 1000 * 60 * 15,
//   gzip: true,
//   exclude: metadata.settings.disallow.split(',')
//   // sitemaps: sitemaps(),
// }
// const markdownit = {
//   preset: 'default',
//   linkify: true,
//   breaks: true
//   // use: ['markdown-it-div', 'markdown-it-attrs'],
// }
// const i18n: Options = {
//   locales: [
//     {
//       code: 'en',
//       file: 'en.ts',
//       name: 'English'
//     },
//     {
//       code: 'fr',
//       file: 'fr.ts',
//       name: 'Français'
//     }
//   ],
//   // lazy: true,
//   defaultLocale: 'en',
//   langDir: '~/plugins/locales/',
//   detectBrowserLanguage: {
//     useCookie: true,
//     cookieKey: 'i18n_redirected',
//     redirectOn: 'root' // recommended
//   }
// }
// const markdownit = {
//   preset: 'default',
//   linkify: true,
//   breaks: true,
//   use: ['markdown-it-div', 'markdown-it-attrs'],
// }

const modules: ModuleOptions = {
  // colorMode,
  // axios,
  // pwa,
  // auth: authSession,
  // content,
  // robots,
  // sitemap,
  // markdownit,
  // i18n
}

export const matomo = {
  matomoUrl: process.env.MATOMO_URL ? process.env.MATOMO_URL : null,
  siteId: process.env.MATOMO_SITE_ID ? process.env.MATOMO_SITE_ID : null,
}

export default modules
