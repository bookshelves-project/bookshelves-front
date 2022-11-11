import svgLoader from 'vite-svg-loader'
// import dynamicImport from 'vite-plugin-dynamic-import'
// import Inspector from 'vite-plugin-vue-inspector'
import svgLibrary from './plugins/vite/svg-library'
import config from './config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: config.app,
  build: config.build,
  components: {
    global: true,
    dirs: ['~/components']
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide/
    'nuxt-schema-org', // https://github.com/vueuse/schema-org
    'nuxt-typed-router' // https://github.com/victorgarciaesgi/nuxt-typed-router
    // 'nuxt-icons' // https://github.com/gitFoxCode/nuxt-icons
  ],
  tailwindcss: config.modules.tailwindcss,
  vueuse: config.modules.vueuse,
  schemaOrg: config.modules.schemaOrg,
  nuxtTypedRouter: config.modules.nuxtTypedRouter,
  // http://v3.nuxtjs.org/guide/features/runtime-config
  runtimeConfig: {
    ...config.runtimeConfigPrivate,
    public: config.runtimeConfigPublic
  },
  typescript: {
    shim: false // with Take Over Mode from https://github.com/johnsoncodehk/volar/discussions/471
  },
  // https://v3.nuxtjs.org/api/configuration/nuxt.config#vite
  vite: {
    plugins: [
      svgLoader(), // https://github.com/jpkleemans/vite-svg-loader#readme
      // Inspector({
      //   appendTo: 'entry.mjs'
      // }), // https://github.com/webfansplz/vite-plugin-vue-inspector
      // dynamicImport(/* options */), // https://github.com/vite-plugin/vite-plugin-dynamic-import
      svgLibrary()
    ]
  }
})
