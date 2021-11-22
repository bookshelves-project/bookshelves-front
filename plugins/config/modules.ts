import pwa from './pwa'
import metadata from './metadata'

// https://nuxtjs.org/docs/configuration-glossary/configuration-modules/
const modules: object = {
  modules: [
    /**
     * Http requests, auth & PWA
     */
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org/
    '@nuxtjs/pwa', // https://go.nuxtjs.dev/pwa
    /**
     * i18n, markdown, lazy-load
     */
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org/
    '@nuxt/content', // https://go.nuxtjs.dev/content
    '@nuxtjs/markdownit', // https://www.npmjs.com/package/@nuxtjs/markdownit
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true,
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',
      },
    ], // https://gitlab.com/broj42/nuxt-lazy-load
    /**
     * sitemaps, seo
     */
    '@nuxtjs/robots', // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/sitemap', // https://sitemap.nuxtjs.org/
    [
      'nuxt-matomo',
      {
        matomoUrl: process.env.MATOMO_URL ? process.env.MATOMO_URL : null,
        siteId: process.env.MATOMO_SITE_ID ? process.env.MATOMO_SITE_ID : null,
      },
    ], // https://github.com/pimlie/nuxt-matomo
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    // https: true,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, */*',
      },
    },
  },
  pwa: {
    meta: pwa.meta,
    manifest: pwa.manifest,
  },
  // proxy: {
  //   '/api': {
  //     target: `${process.env.API_URL}`,
  //     pathRewrite: { '^/': '/' },
  //   },
  // },
  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL,
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'access_token',
          },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/profile', method: 'get', propertyName: false },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        globalToken: true,
      },
    },
    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      callback: '/',
      home: '/profile',
    },
    cookie: {
      options: {
        sameSite: 'lax',
        maxAge: 86400, // 24 hours
      },
    },
    plugins: ['~/plugins/utils/auth.js'],
  },
  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    liveEdit: false,
    // https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
    markdown: {
      prism: {
        // https://github.com/PrismJS/prism-themes
        theme: 'assets/css/app/prism-vsc-dark-plus.pcss',
      },
    },
  },
  robots: {
    Disallow: metadata.settings.disallow.split(','),
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: metadata.settings.disallow.split(','),
    // sitemaps: sitemaps(),
  },
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    // use: ['markdown-it-div', 'markdown-it-attrs'],
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English',
      },
      {
        code: 'fr',
        file: 'fr.js',
        name: 'Français',
      },
    ],
    // lazy: true,
    defaultLocale: 'en',
    langDir: '~locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
}

export default modules
