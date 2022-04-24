import { defineNuxtConfig } from 'nuxt'
import config from './utils/config'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // @ts-ignore
  build: config.build,
  buildModules: [
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide/
  ],
  ...config.buildModules,
  components: {
    global: true,
    dirs: ['~/components'],
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  head: config.head,
  hooks: config.hooks,
  meta: config.meta,
  modules: [],
  ...config.modules,
  // http://v3.nuxtjs.org/guide/features/runtime-config
  runtimeConfig: {
    ...config.runtimeConfigPrivate,
    public: config.runtimeConfigPublic,
  },
  typescript: {
    strict: true, // for pinia
    shim: false, // with Take Over Mode from https://github.com/johnsoncodehk/volar/discussions/471
  },
  // https://v3.nuxtjs.org/api/configuration/nuxt.config#vite
  vite: {
    plugins: [
      svgLoader(), // https://github.com/jpkleemans/vite-svg-loader#readme
    ],
  },
  // https://v3.nuxtjs.org/api/configuration/nuxt.config#vue-1
  vue: {
    // reactivityTransform: true
  },
})
