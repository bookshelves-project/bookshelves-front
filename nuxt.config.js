import metadata from './plugins/utils/metadata.json'
import sitemaps from './plugins/utils/sitemaps'

import dynamicMetadata from './plugins/utils/dynamic-metadata'
import staticMetadata from './plugins/utils/static-metadata'

export default {
  generate: {
    exclude: [/^\/content/],
  },
  target: process.env.TARGET,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: metadata.tags.title,
    titleTemplate: metadata.tags.titleTemplate,
    htmlAttrs: {
      lang: metadata.settings.locale,
    },
    meta: [...staticMetadata(), ...dynamicMetadata()],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: metadata.settings.color,
    height: '2px',
  },

  plugins: [
    // global helper methods
    '~/plugins/utils/helper',
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/trevoreyre/autocomplete
    '~/plugins/autocomplete-vue',
    // https://github.com/hilongjw/vue-lazyload
    '~/plugins/vue-lazyload',
    // https://github.com/lukaszflorczak/vue-agile
    '~/plugins/vue-agile',
    // https://github.com/ymmooot/nuxt-jsonld
    '~/plugins/jsonld',
  ],

  // GitHub: https://github.com/nuxt/components
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    { path: '~/components/common', pathPrefix: false },
    { path: '~/components/common/content', pathPrefix: false },
    { path: '~/components/common/icons', pathPrefix: false },
    { path: '~/components/common/icons-md', pathPrefix: false },
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
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    jit: true,
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
    Disallow:
      process.env.META_ROBOT_DISALLOW.split(',') || metadata.settings.disallow,
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  sitemap: {
    path: '/sitemap.xml', // L'emplacement de votre fichier sitemap.
    hostname: process.env.BASE_URL, // L'adresse de votre site, que vous pouvez placer comme ici dans une variable d'environnement.
    cacheTime: 1000 * 60 * 15, // La durée avant que le sitemap soit regénéré. Ici 15mn.
    gzip: true,
    generate: false, // Génère une version statique du sitemap quand activé. À utiliser avec nuxt generate.
    exclude:
      process.env.META_ROBOT_DISALLOW.split(',') || metadata.settings.disallow,

    sitemaps: sitemaps(),
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
    // analyze: true,
    transpile: ['vue-agile'],
  },
}
