import settings from './static/settings.json'
import settingsCustom from './static/settings-custom.json'
import {
  getRoutes,
  getBooksRoutes,
  getSeriesRoutes,
  getAuthorsRoutes,
  getGuidesRoutes,
  getPagesRoutes,
} from './plugins/sitemaps/sitemap'

export default {
  // server: {
  //   port: 3000,
  //   host: 'app.bookshelves.test',
  // },
  target: settingsCustom.production || settings.custom.production,
  generate: {},
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: settings.metadata.title,
    titleTemplate: settings.metadata.titleTemplate,
    htmlAttrs: {
      lang: settings.metadata.locale,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: settings.metadata.description,
      },
      {
        hid: 'author',
        name: 'author',
        content:
          settingsCustom.metadata.author || settings.custom.metadata.author,
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
      },
      { name: 'msapplication-TileColor', content: settings.metadata.color },
      { name: 'theme-color', content: settings.metadata.color },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index, follow',
      },
      // Open Graph
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: settings.metadata.projectName,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: settings.metadata.title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: settings.metadata.description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL}/open-graph.jpg`,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: settings.metadata.projectName,
      },
      {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: 1200,
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: 600,
      },
      {
        hid: 'og:locale',
        name: 'og:locale',
        content: settings.metadata.locale,
      },
      // Twitter Card
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: settings.metadata.title,
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content:
          settingsCustom.metadata.twitter.site ||
          settings.custom.metadata.twitter.site,
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content:
          settingsCustom.metadata.twitter.creator ||
          settings.custom.metadata.twitter.creator,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: settings.metadata.description,
      },
      {
        hid: 'twitter:image:src',
        property: 'twitter:image:src',
        content: `${process.env.BASE_URL}/open-graph.jpg`,
      },
      {
        hid: 'twitter:image:width',
        name: 'twitter:image:width',
        content: 1200,
      },
      {
        hid: 'twitter:image:height',
        name: 'twitter:image:height',
        content: 600,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: settings.metadata.projectName,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: settings.metadata.color,
    height: '2px',
  },

  plugins: [
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/trevoreyre/autocomplete
    '~/plugins/autocomplete-vue',
    // https://github.com/hilongjw/vue-lazyload
    '~/plugins/vue-lazyload',
    // load SVG from assets/icons
    '~/plugins/icons-loader',
    // global helper methods
    '~/plugins/helper',
    // https://github.com/lukaszflorczak/vue-agile
    '~/plugins/vue-agile',
  ],

  // GitHub: https://github.com/nuxt/components
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    { path: '~/components/common', pathPrefix: false },
    { path: '~/components/common/content', pathPrefix: false },
    { path: '~/components/common/icons', pathPrefix: false },
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/web-vitals-module
    // [
    //   'nuxt-vitals',
    //   {
    //     trackingID: 'G-ZFLRZXPL97',
    //     eventCategory: 'Arts',
    //     debug: 0,
    //     disabled: false,
    //   },
    // ],
    // https://image.nuxtjs.org
    // '@nuxt/image',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/svg-module
    // '@nuxtjs/svg',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    jit: true,
  },

  routerModule: {
    middleware: ['init-store'],
    keepDefaultRouter: true,
  },

  googleFonts: {
    display: 'swap',
    prefetch: true,
    families: {
      Quicksand: true,
      Handlee: true,
    },
  },

  // image: {
  //   domains: [process.env.API_URL],
  //   screens: {
  //     sm: 360,
  //     md: 600,
  //     lg: 900,
  //     xl: 1300,
  //     '2xl': 1536,
  //     '3xl': 1920,
  //   },
  // },

  colorMode: {
    classSuffix: '',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://image.nuxtjs.org/
    // '@nuxt/image',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // https://i18n.nuxtjs.org/setup
    // 'nuxt-i18n',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/recaptcha-module
    '@nuxtjs/recaptcha',
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    https: false,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
      },
    },
  },

  pwa: {
    meta: {
      name: settings.metadata.title,
      author: settingsCustom.metadata.author || settings.custom.metadata.author,
      description: settings.metadata.description,
      theme_color: settings.metadata.color,
    },
  },

  proxy: {
    '/api': {
      target: `${process.env.API_URL}`,
      pathRewrite: { '^/': '/' },
    },
  },

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
          user: { url: '/user', method: 'get', propertyName: false },
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
      home: '/dashboard',
    },
    cookie: {
      options: {
        sameSite: 'lax',
      },
    },
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    liveEdit: false,
    // https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
    // https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins
    markdown: {
      remarkPlugins: ['remark-directive'],
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
    },
  },
  robots: {
    Disallow: settingsCustom.robot.disallow || settings.custom.robot.disallow,
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  sitemap: {
    path: '/sitemap.xml', // L'emplacement de votre fichier sitemap.
    hostname: process.env.BASE_URL, // L'adresse de votre site, que vous pouvez placer comme ici dans une variable d'environnement.
    cacheTime: 1000 * 60 * 15, // La durée avant que le sitemap soit regénéré. Ici 15mn.
    gzip: true,
    generate: false, // Génère une version statique du sitemap quand activé. À utiliser avec nuxt generate.
    exclude: [
      // Les pages qu'on a pas trop envie de voir atterrir sur Google.
      '**',
    ],

    sitemaps: [
      {
        path: '/sitemaps/sitemap.xml',
        exclude: ['**'],
        routes() {
          // Nous allons utiliser une fonction personnalisée pour charger nos routes dynamiques dans le sitemap.
          return getRoutes()
        },
      },
      {
        path: '/sitemaps/books.xml',
        exclude: ['**'],
        routes: () => {
          return getBooksRoutes()
        },
      },
      {
        path: '/sitemaps/series.xml',
        exclude: ['**'],
        routes: () => {
          return getSeriesRoutes()
        },
      },
      {
        path: '/sitemaps/authors.xml',
        exclude: ['**'],
        routes: () => {
          return getAuthorsRoutes()
        },
      },
      {
        path: '/sitemaps/guides.xml',
        exclude: ['**'],
        routes: () => {
          return getGuidesRoutes()
        },
      },
      {
        path: '/sitemaps/pages.xml',
        exclude: ['**'],
        routes: () => {
          return getPagesRoutes()
        },
      },
    ],
  },
  // i18n: {
  //   locales: [
  //     {
  //       code: 'en',
  //       name: 'English',
  //     },
  //     {
  //       code: 'fr',
  //       name: 'Français',
  //     },
  //   ],
  //   defaultLocale: 'en',
  //   vueI18n: {
  //     fallbackLocale: 'en',
  //     messages: {
  //       en: {
  //         welcome: 'Welcome',
  //       },
  //       fr: {
  //         welcome: 'Bienvenue',
  //       },
  //     },
  //   },
  // },
  recaptcha: {
    hideBadge: true,
    // language: '',
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    version: 3,
    size: 'invisible',
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const readingTime = require('reading-time')
        const stats = readingTime(document.text)

        document.readingTime = stats
      }
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    analyze: true,
    transpile: ['vue-agile'],
  },
}
