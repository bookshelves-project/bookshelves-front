import type { NuxtConfig } from '@nuxt/types'
import buildModules from './plugins/config/build-modules'
import modules, { nuxtLazyLoad, matomo } from './plugins/config/modules'
import head from './plugins/config/head'
import hooks from './plugins/config/hooks'
import loading from './plugins/config/loading'

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-build
  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler')
      }
    }
  },
  // https://nuxtjs.org/docs/configuration-glossary/configuration-css
  css: ['~/assets/css/app.css', '~/assets/css/markdown'],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  // GitHub: https://github.com/nuxt/components
  components: true,
  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    baseURL: process.env.BASE_URL,
    moduleSocial: process.env.MODULE_SOCIAL,
    moduleSocialRating: process.env.MODULE_SOCIAL_RATING,
    apiURL: process.env.API_URL
  },
  privateRuntimeConfig: {},
  // https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware
  // serverMiddleware: ['~/server-middleware/init'],
  // https://nuxtjs.org/docs/configuration-glossary/configuration-head
  head,
  loading,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-modules#buildmodules
  buildModules: [
    ['@nuxt/typescript-build', // https://typescript.nuxtjs.org
      { typeCheck: false }
    ],
    // '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org/
    // 'unplugin-vue2-script-setup/nuxt', // https://github.com/antfu/unplugin-vue2-script-setup
    // '@nuxtjs/html-validator', // https://html-validator.nuxtjs.org/
    'nuxt-windicss', // https://windicss.org/integrations/nuxt.html
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxtjs/svg-sprite', // https://github.com/nuxt-community/svg-sprite-module
    // ['@pinia/nuxt', { disableVuex: false }], // https://pinia.esm.dev/
    ['unplugin-auto-import/nuxt', // https://github.com/antfu/unplugin-auto-import
      {
        imports: ['@nuxtjs/composition-api']
      }
    ]
  ],
  ...buildModules,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-modules/
  modules: [
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org/
    '@nuxtjs/pwa', // https://go.nuxtjs.dev/pwa
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org/
    '@nuxt/content', // https://go.nuxtjs.dev/content
    '@nuxtjs/markdownit', // https://www.npmjs.com/package/@nuxtjs/markdownit
    [
      'nuxt-lazy-load', // https://gitlab.com/broj42/nuxt-lazy-load
      nuxtLazyLoad
    ],
    // '@nuxtjs/robots', // https://www.npmjs.com/package/@nuxtjs/robots
    // '@nuxtjs/sitemap', // https://sitemap.nuxtjs.org/
    // [
    //   'nuxt-matomo', // https://github.com/pimlie/nuxt-matomo
    //   matomo
    // ],
    'cookie-universal-nuxt' // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
  ],
  ...modules,
  // https://nuxtjs.org/docs/configuration-glossary/configuration-plugins
  plugins: [
    '~/plugins/utils/helpers.js', // helper methods: available in any component
    // '~/plugins/bus.client', // Global toasts
    '~/plugins/v-click-outside', // https://github.com/ndelvalle/v-click-outside
    '~/plugins/vue-scrollactive', // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/jsonld', // https://github.com/ymmooot/nuxt-jsonld
    '~/plugins/vue-awesome-swiper.client.js', // https://github.com/surmon-china/vue-awesome-swiper
    // '~/plugins/composition-api.js', // https://typescript.nuxtjs.org/cookbook/components
    '~/plugins/utils/helper',
    '~/plugins/context'
  ],
  // https://nuxtjs.org/docs/configuration-glossary/configuration-hooks
  hooks
}

export default config
