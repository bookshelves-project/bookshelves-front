import type { NuxtConfig } from '@nuxt/types'
import buildModules from './utils/config/build-modules'
import modules, { nuxtLazyLoad, matomo } from './utils/config/modules'
import head from './utils/config/head'
import hooks from './utils/config/hooks'
import loading from './utils/config/loading'

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-build
  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler')
      }
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {}
      }
    },
  },
  // https://nuxtjs.org/docs/configuration-glossary/configuration-css
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  // GitHub: https://github.com/nuxt/components
  components: true,
  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    baseURL: process.env.BASE_URL,
    moduleSocial: process.env.MODULE_SOCIAL,
    moduleSocialRating: process.env.MODULE_SOCIAL_RATING,
    apiURL: process.env.API_URL,
    axios: {
      baseURL: `${process.env.API_URL}/api`
    }
  },
  privateRuntimeConfig: {},
  // https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware
  // serverMiddleware: ['~/server-middleware/init'],
  // router: {
  //   middleware: ['nuxt-server-init']
  // },
  // https://nuxtjs.org/docs/configuration-glossary/configuration-head
  head,
  loading,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-modules#buildmodules
  buildModules: [
    [
      '@nuxt/typescript-build', // https://typescript.nuxtjs.org
      { typeCheck: false }
    ],
    // '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org/
    ['@pinia/nuxt', { disableVuex: false }], // https://github.com/posva/pinia
    // 'unplugin-vue2-script-setup/nuxt', // https://github.com/antfu/unplugin-vue2-script-setup
    // '@nuxtjs/html-validator', // https://html-validator.nuxtjs.org/
    '@nuxt/postcss8', // https://github.com/nuxt/postcss8 & https://tailwindcss.com/docs/guides/nuxtjs
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxtjs/svg-sprite', // https://github.com/nuxt-community/svg-sprite-module
    // ['@pinia/nuxt', { disableVuex: false }], // https://pinia.esm.dev/
    [
      'unplugin-auto-import/nuxt', // https://github.com/antfu/unplugin-auto-import
      { imports: ['@nuxtjs/composition-api'] }
    ],
  ],
  ...buildModules,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-modules/
  modules: [
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    // '@nuxtjs/auth-next', // https://auth.nuxtjs.org/
    '@nuxtjs/pwa', // https://go.nuxtjs.dev/pwa
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org/
    '@nuxt/content', // https://go.nuxtjs.dev/content
    '@nuxtjs/markdownit', // https://www.npmjs.com/package/@nuxtjs/markdownit
    ['nuxt-lazy-load', nuxtLazyLoad], // https://gitlab.com/broj42/nuxt-lazy-load
    // '@nuxtjs/robots', // https://www.npmjs.com/package/@nuxtjs/robots
    // '@nuxtjs/sitemap', // https://sitemap.nuxtjs.org/
    // ['nuxt-matomo', matomo], // https://github.com/pimlie/nuxt-matomo
    'cookie-universal-nuxt' // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
  ],
  ...modules,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-plugins
  plugins: [
    // '~/plugins/bus.client', // Global toasts
    '~/plugins/helper', // global methods
    // '~/plugins/jsonld', // https://github.com/ymmooot/nuxt-jsonld
    '~/plugins/metadata',
    '~/plugins/repository', // repository pattern
    '~/plugins/toast', // toast alerts
    '~/plugins/v-click-outside', // https://github.com/ndelvalle/v-click-outside
    '~/plugins/vue-awesome-swiper.client.js', // https://github.com/surmon-china/vue-awesome-swiper
    '~/plugins/vue-scrollactive' // https://github.com/eddiemf/vue-scrollactive
  ],
  // https://nuxtjs.org/docs/configuration-glossary/configuration-hooks
  hooks
}

export default config
