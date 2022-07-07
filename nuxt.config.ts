import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'
import config from './utils/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // @ts-ignore
  build: config.build,
  components: {
    global: true,
    dirs: ['~/components'],
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  hooks: config.hooks,
  meta: {
    link: config.meta.link,
    meta: config.meta.meta,
    script: config.meta.script,
  },
  modules: [
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide/
    'nuxt-schema-org', // https://github.com/vueuse/schema-org
  ],
  tailwindcss: config.modules.tailwindcss,
  vueuse: config.modules.vueuse,
  schemaOrg: config.modules.schemaOrg,
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
})
