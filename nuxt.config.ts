import { defineNuxtConfig } from 'nuxt3'
import config from './utils/config'
import {
  publicRuntimeConfig,
  privateRuntimeConfig,
} from './utils/config/runtime-config'

export default defineNuxtConfig({
  build: {
    postcss: {
      order: ['tailwindcss/nesting', 'tailwindcss', 'autoprefixer'],
      plugins: {
        'postcss-nested': false,
      },
    },
  },
  components: false,
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  buildModules: [
    // '@intlify/nuxt3', // https://github.com/intlify/nuxt3
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide/
    // 'nuxt-windicss', // https://github.com/windicss/nuxt-windicss
  ],
  ...config.buildModules,
  modules: [],
  ...config.modules,
  meta: {
    title: 'Bookshelves',
    script: [
      {
        src: '/color-mode.js',
      },
    ],
  },
  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  publicRuntimeConfig: publicRuntimeConfig,
  privateRuntimeConfig: privateRuntimeConfig,
  typescript: {
    strict: true, // for pinia
    shim: false, // with Take Over Mode from https://github.com/johnsoncodehk/volar/discussions/471
  },
  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#vite
  vite: config.vite,
})
