import metadata from '../metadata'
import pwaData from './pwa'

const axios = {
  baseURL: process.env.API_URL,
  credentials: true,
  // https: true,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json, text/plain, */*'
    }
  }
}
const pwa = {
  meta: pwaData.meta,
  manifest: pwaData.manifest
}
const auth = {
  strategies: {
    laravelSanctum: {
      provider: 'laravel/sanctum',
      url: process.env.API_URL,
      endpoints: {
        login: {
          url: '/login',
          method: 'post',
          propertyName: 'access_token'
        },
        logout: { url: '/logout', method: 'post' },
        user: { url: '/profile', method: 'get', propertyName: false }
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
    options: {
      sameSite: 'lax',
      maxAge: 86400 // 24 hours
    }
  },
  plugins: ['~/plugins/modules/auth.js']
}
const content = {
  liveEdit: false,
  // https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
  markdown: {
    prism: {
      // https://github.com/PrismJS/prism-themes
      theme: 'assets/css/app/code'
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
const i18n = {
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
