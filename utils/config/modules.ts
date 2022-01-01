import type { AxiosOptions } from '@nuxtjs/axios'
import type { Options } from '@nuxtjs/i18n'
import { ModuleOptions, RecursivePartial } from '@nuxtjs/auth-next'
import type { IContentOptions } from '@nuxt/content'
import metadata from '../metadata'
import { ApiEndpoint } from '../../types/index'
import pwaData from './pwa'

const axios: AxiosOptions = {
  baseURL: `${process.env.API_URL}/api`,
  credentials: true,
  // https: true,
  headers: {
    common: {
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    }
  }
}
const pwa = {
  meta: pwaData.meta,
  manifest: pwaData.manifest
}
const auth: RecursivePartial<ModuleOptions> = {
  strategies: {
    laravelSanctum: {
      provider: 'laravel/sanctum',
      url: `${process.env.API_URL}/api`,
      endpoints: {
        login: {
          url: ApiEndpoint.AuthLogin,
          method: 'post',
          propertyName: 'access_token'
        },
        logout: { url: ApiEndpoint.AuthLogout, method: 'post' },
        user: { url: ApiEndpoint.Profile, method: 'get', propertyName: false }
      },
      tokenRequired: true,
      tokenType: 'Bearer',
      globalToken: true
    }
  },
  redirect: {
    login: '/sign-in',
    logout: '/sign-in',
    callback: '/',
    home: '/profile'
  },
  cookie: {
    prefix: 'auth.',
    options: {
      path: '/',
      expires: 30,
      // 86400 // one day
      // 604800 // one week
      // 2628288 // one month
      // 31536000 // one year
      maxAge: 86400,
      secure: true
    }
  },
  plugins: ['~/plugins/modules/auth']
}
const content: IContentOptions = {
  liveEdit: false,
  // https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
  markdown: {
    prism: {
      // https://github.com/PrismJS/prism-themes
      theme: 'assets/css/code'
    }
  }
}
const robots = {
  Disallow: metadata.settings.disallow.split(','),
  Sitemap: `${process.env.BASE_URL}/sitemap.xml`
}
const sitemap = {
  path: '/sitemap.xml',
  hostname: process.env.BASE_URL,
  cacheTime: 1000 * 60 * 15,
  gzip: true,
  exclude: metadata.settings.disallow.split(',')
  // sitemaps: sitemaps(),
}
const markdownit = {
  preset: 'default',
  linkify: true,
  breaks: true
  // use: ['markdown-it-div', 'markdown-it-attrs'],
}
const i18n: Options = {
  locales: [
    {
      code: 'en',
      file: 'en.ts',
      name: 'English'
    },
    {
      code: 'fr',
      file: 'fr.ts',
      name: 'Français'
    }
  ],
  // lazy: true,
  defaultLocale: 'en',
  langDir: '~/plugins/locales/',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root' // recommended
  }
}

const modules: object = {
  axios,
  pwa,
  auth,
  content,
  robots,
  sitemap,
  markdownit,
  i18n
}

export const nuxtLazyLoad: object = {
  directiveOnly: true,
  loadingClass: 'isLoading',
  loadedClass: 'isLoaded',
  appendClass: 'lazyLoad'
}

export const matomo: object = {
  matomoUrl: process.env.MATOMO_URL ? process.env.MATOMO_URL : null,
  siteId: process.env.MATOMO_SITE_ID ? process.env.MATOMO_SITE_ID : null
}

export default modules
