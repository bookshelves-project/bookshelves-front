import type { NuxtConfig } from '@nuxt/types'
import buildModules from './plugins/config/build-modules'
import modules from './plugins/config/modules'
import head from './plugins/config/head'
import hooks from './plugins/config/hooks'
import loading from './plugins/config/loading'

const config: NuxtConfig = {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-build
  build: {},
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
  // https://nuxtjs.org/docs/configuration-glossary/configuration-head
  head: head,
  loading: loading,
  ...buildModules,
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
  ],
  // https://nuxtjs.org/docs/configuration-glossary/configuration-hooks
  hooks: hooks,
}

export default config
