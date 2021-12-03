import type { NuxtConfig } from '@nuxt/types'
import buildModules from './plugins/config/build-modules'
import modules, { nuxtLazyLoad, matomo } from './plugins/config/modules'
import head from './plugins/config/head'
import hooks from './plugins/config/hooks'
import loading from './plugins/config/loading'

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-build
  build: {
    // babel: {
    //   plugins: [
    //     '@babel/plugin-proposal-optional-chaining',
    //     '@babel/plugin-proposal-nullish-coalescing-operator',
    //   ],
    // },
  },
  // https://nuxtjs.org/docs/configuration-glossary/configuration-css
  css: ['~/assets/css/app.pcss', '~/assets/css/markdown.pcss'],
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
  },
  privateRuntimeConfig: {},
  // https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware
  // serverMiddleware: ['~/server-middleware/init'],
  // https://nuxtjs.org/docs/configuration-glossary/configuration-head
  head,
  loading,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-modules#buildmodules
  buildModules: [
    '@nuxt/typescript-build', // https://typescript.nuxtjs.org/
    // '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org/
    '@nuxtjs/html-validator', // https://html-validator.nuxtjs.org/
    '@nuxtjs/tailwindcss', // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxtjs/svg-sprite', // https://github.com/nuxt-community/svg-sprite-module
    ['@pinia/nuxt', { disableVuex: false }], // https://pinia.esm.dev/
  ],
  ...buildModules,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-modules/
  modules: [
    '@nuxt/http', // https://http.nuxtjs.org/
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org/
    '@nuxtjs/pwa', // https://go.nuxtjs.dev/pwa
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org/
    '@nuxt/content', // https://go.nuxtjs.dev/content
    '@nuxtjs/markdownit', // https://www.npmjs.com/package/@nuxtjs/markdownit
    [
      'nuxt-lazy-load', // https://gitlab.com/broj42/nuxt-lazy-load
      nuxtLazyLoad,
    ],
    '@nuxtjs/robots', // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/sitemap', // https://sitemap.nuxtjs.org/
    [
      'nuxt-matomo', // https://github.com/pimlie/nuxt-matomo
      matomo,
    ],
    'cookie-universal-nuxt', // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
  ],
  ...modules,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-plugins
  plugins: [
    '~/plugins/utils/helpers', // helper methods: available in any component
    '~/plugins/bus.client.js', // Global notifications
    '~/plugins/v-click-outside', // https://github.com/ndelvalle/v-click-outside
    '~/plugins/vue-scrollactive', // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/jsonld', // https://github.com/ymmooot/nuxt-jsonld
    '~/plugins/vue-awesome-swiper.client.js', // https://github.com/surmon-china/vue-awesome-swiper
    '~/plugins/composition-api.js', // https://typescript.nuxtjs.org/cookbook/components
    // '~/plugins/truncater',
    '~/plugins/repository',
  ],
  // https://nuxtjs.org/docs/configuration-glossary/configuration-hooks
  hooks,
}

export default config
