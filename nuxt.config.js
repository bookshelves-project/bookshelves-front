export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Bookshelves',
    titleTemplate: '%s · Bookshelves',
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Reading in complete tranquility and freedom, your digital library that goes everywhere with you.',
      },
      // Open Graph
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Bookshelves',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Reading in complete tranquility and freedom, your digital library that goes everywhere with you',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      // Twitter Card
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Bookshelves',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Reading in complete tranquility and freedom, your digital library that goes everywhere with you',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/tooltip', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: '#800080',
    height: '5px',
  },

  plugins: [
    '~/plugins/icons-loader',
    {
      src: '~/plugins/vue-tailwind-screens',
      ssr: false,
    },
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    '~/plugins/v-tooltip',
    '~/plugins/helper',
    // '~/plugins/global-loader',
    '~/plugins/vue-scrollactive',
    // '~/plugins/vue-lazyload',
    '~/plugins/autocomplete',
    '~/plugins/v-lazy-image',
    '~/plugins/vue-awesome-swiper',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components: [
  //   '~/components/global',
  //   {
  //     path: '~/components/global',
  //     global: true,
  //     prefix: 'global',
  //     extensions: ['vue'],
  //   },
  // ],
  // components: ['~/components/common/', { path: '~/components/common/' }],
  components: [{ path: '~/components/common', global: true }],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',

    // '@nuxt/components',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  routerModule: {
    middleware: ['init-store'],
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

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://image.nuxtjs.org/
    '@nuxt/image',
    // https://http.nuxtjs.org
    '@nuxt/http',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
  },

  // router: {
  //   middleware: ['auth'],
  // },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: '~/assets/css/prism-vsc-dark-plus.css',
      },
    },
  },

  http: {
    // proxyHeaders: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
