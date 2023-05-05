// import type { AxiosOptions } from '@nuxtjs/axios'
// import type { Options } from '@nuxtjs/i18n'
// import { ModuleOptions, RecursivePartial } from '@nuxtjs/auth-next'
import type { VueUseNuxtOptions } from '@vueuse/nuxt'
import type { NuxtConfig } from '@nuxt/schema'

// const htmlValidator = {
//   usePrettier: false,
//   options: {
//     extends: [
//       'html-validate:document',
//       'html-validate:recommended',
//       'html-validate:standard'
//     ],
//     rules: {
//       'svg-focusable': 'off',
//       'no-unknown-elements': 'error',
//       // Conflicts or not needed as we use prettier formatting
//       'void-style': 'off',
//       'no-trailing-whitespace': 'off',
//       // Conflict with Nuxt defaults
//       'require-sri': 'off',
//       'attribute-boolean-style': 'off',
//       'doctype-style': 'off',
//       // Unreasonable rule
//       'no-inline-style': 'off'
//     }
//   }
// }
const tailwindcss: NuxtConfig['tailwindcss'] = {
  exposeConfig: true,
}
const vueuse: VueUseNuxtOptions = {
  ssrHandlers: true,
}
// const axios: AxiosOptions = {
//   baseURL: process.env.API_URL || 'http://localhost:8000',
//   credentials: true,
//   // https: true,
// headers: {
//   common: {
//     'X-Requested-With': 'XMLHttpRequest',
//     'Access-Control-Allow-Origin': '*',
//     Accept: 'application/json',
//   },
// }
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

/**
 * https://vue-schema-org.netlify.app/guide/setup/nuxt.html#_2-configure-the-module
 */
const schemaOrg: NuxtConfig['schemaOrg'] = {
  // set to your production domain
  canonicalHost: 'https://nuxtjs.org',
}

const nuxtTypedRouter: NuxtConfig['nuxtTypedRouter'] = {
  // outDir: './.nuxt/router',
}

const modules = {
  // auth: authSession,
  // robots,
  // sitemap,
  // i18n
  tailwindcss,
  vueuse,
  schemaOrg,
  nuxtTypedRouter,
}

export const matomo = {
  matomoUrl: process.env.MATOMO_URL ? process.env.MATOMO_URL : null,
  siteId: process.env.MATOMO_SITE_ID ? process.env.MATOMO_SITE_ID : null,
}

export default modules
