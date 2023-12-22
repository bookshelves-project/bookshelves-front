import { config, head, modules } from './config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: head.link,
      meta: head.meta,
      script: head.script,
    },
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css',
  ],

  extends: [
    // 'nuxt-seo-kit', // https://github.com/harlan-zw/nuxt-seo-kit
  ],
  modules: [
    '@nuxt/devtools', // https://devtools.nuxtjs.org
    // '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide/index.html#nuxt
    'unplugin-svg-transformer/nuxt', // https://github.com/kiwilan/unplugin-svg-transformer
    // 'nuxt-typed-link', // https://github.com/kiwilan/nuxt-typed-link
    'nuxt-typed-router', // https://nuxt-typed-router.vercel.app
  ],

  i18n: modules.i18n,
  svgTransformer: modules.svgTransformer,

  runtimeConfig: {
    ...config.private,
    public: config.public,
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  typescript: {
    shim: false,
  },

  experimental: {
    typedPages: true,
  },
})
