import {
  getRoutes,
  getBooksRoutes,
  getSeriesRoutes,
  getAuthorsRoutes,
  getGuidesRoutes,
} from './helpers/sitemap'

export default {
  // server: {
  //   port: 3000,
  //   host: 'app.bookshelves.test',
  // },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Home',
    titleTemplate: '%s · Bookshelves',
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'For people with eReaders, reading in complete tranquility and freedom, your digital library that goes everywhere with you. Get eBooks (EPUB format), add it to your eReader and read!',
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Bookshelves Team',
      },
      // Open Graph
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Bookshelves',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://bookshelves.git-projects.xyz/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Bookshelves : your digital library',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'For people with eReaders, reading in complete tranquility and freedom, your digital library that goes everywhere with you. Get eBooks (EPUB format), add it to your eReader and read!',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Bookshelves',
      },
      // Twitter Card
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:domain',
        property: 'twitter:domain',
        content: 'bookshelves.git-projects.xyz',
      },
      {
        hid: 'twitter:url',
        property: 'twitter:title',
        content: 'https://bookshelves.git-projects.xyz/',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Bookshelves : your digital library',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'For people with eReaders, reading in complete tranquility and freedom, your digital library that goes everywhere with you. Get eBooks (EPUB format), add it to your eReader and read!',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Bookshelves',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: '#800080',
    height: '2px',
  },

  plugins: [
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/trevoreyre/autocomplete
    '~/plugins/autocomplete-vue',
    // https://github.com/surmon-china/vue-awesome-swiper
    '~/plugins/vue-awesome-swiper',
    // https://github.com/hilongjw/vue-lazyload
    '~/plugins/vue-lazyload',
    // load SVG from assets/icons
    '~/plugins/icons-loader',
    // global helper methods
    '~/plugins/helper',
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
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
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

  // image: {},

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
    '@nuxt/image',
    // https://http.nuxtjs.org
    '@nuxt/http',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // https://i18n.nuxtjs.org/setup
    // 'nuxt-i18n',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // https://github.com/nuxt-community/recaptcha-module
    '@nuxtjs/recaptcha',
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    https: false,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  },

  proxy: {
    '/api': {
      target: `${process.env.API_URL}/api`,
      pathRewrite: { '^/api': '/' },
    },
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL,
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
    Disallow: ['/sign-in', '/dashboard'],
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
    ],
  },
  // i18n: {},
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
  build: {},
}
