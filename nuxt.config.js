import metadata from './plugins/metadata/metadata'
import sitemaps from './plugins/utils/sitemaps'

import metadataDynamic from './plugins/metadata/metadata-dynamic'
import metadataStatic from './plugins/metadata/metadata-static'

export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    moduleSocial: process.env.MODULE_SOCIAL,
    apiURL: process.env.API_URL,
  },
  privateRuntimeConfig: {},
  target: 'server',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: metadata.tags.title,
    titleTemplate: metadata.tags.titleTemplate,
    htmlAttrs: {
      lang: metadata.settings.locale,
    },
    meta: [...metadataStatic(), ...metadataDynamic()],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app.pcss', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: metadata.settings.color,
    height: '2px',
  },

  plugins: [
    // global helper methods
    '~/plugins/utils/helpers',
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/ymmooot/nuxt-jsonld
    '~/plugins/jsonld',
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
    // https://image.nuxtjs.org
    // '@nuxt/image',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/svg-module
    // '@nuxtjs/svg',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://html-validator.nuxtjs.org/
    // '@nuxtjs/html-validator',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  routerModule: {
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
  colorMode: {
    classSuffix: '',
  },
  svgSprite: {},
  htmlValidator: {
    usePrettier: false,
    options: {
      extends: [
        'html-validate:document',
        'html-validate:recommended',
        'html-validate:standard',
      ],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        // Conflicts or not needed as we use prettier formatting
        'void-style': 'off',
        'no-trailing-whitespace': 'off',
        // Conflict with Nuxt defaults
        'require-sri': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
        // Unreasonable rule
        'no-inline-style': 'off',
      },
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://image.nuxtjs.org/
    // '@nuxt/image',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // https://i18n.nuxtjs.org/setup
    // 'nuxt-i18n',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    // https://gitlab.com/broj42/nuxt-lazy-load
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true,
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',
      },
    ],
    // https://image.nuxtjs.org/getting-started/installation
    '@nuxt/image',
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
      name: metadata.tags.title,
      author: process.env.META_AUTHOR || metadata.tags.author,
      description: metadata.tags.description,
      theme_color: metadata.settings.color,
      lang: metadata.settings.lang,
      ogSiteName: metadata.og.siteName,
      ogTitle: metadata.tags.title,
      ogDescription: metadata.tags.description,
      ogImage: `${process.env.BASE_URL}/default.jpg`,
      ogUrl: process.env.BASE_URL,
      twitterSite: metadata.twitter.site,
      twitterCreator: metadata.twitter.creator,
    },
    manifest: {
      name: metadata.tags.title,
      short_name: metadata.og.siteName,
      description: metadata.tags.description,
      display: 'browser',
      lang: metadata.settings.lang,
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
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
    },
  },
  robots: {
    Disallow:
      process.env.META_ROBOT_DISALLOW.split(',') || metadata.settings.disallow,
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude:
      process.env.META_ROBOT_DISALLOW.split(',') || metadata.settings.disallow,
    sitemaps: sitemaps(),
  },
  image: {
    // Options
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
    transpile: ['vue-agile'],
  },
}
