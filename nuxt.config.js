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
          'For people with eReaders, reading in complete tranquility and freedom, your digital library that goes everywhere with you. Get eBooks (EPUB format), add it to your eReader and read!',
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Bookshelves Team',
      },
      // Open Graph
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Bookshelves',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://bookshelves.git-projects.xyz/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Bookshelves : your digital library',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'For people with eReaders, reading in complete tranquility and freedom, your digital library that goes everywhere with you. Get eBooks (EPUB format), add it to your eReader and read!',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Bookshelves',
      },
      // Twitter Card
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:domain',
        property: 'twitter:domain',
        content: 'bookshelves.git-projects.xyz',
      },
      {
        hid: 'twitter:url',
        property: 'twitter:title',
        content: 'https://bookshelves.git-projects.xyz/',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Bookshelves : your digital library',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'For people with eReaders, reading in complete tranquility and freedom, your digital library that goes everywhere with you. Get eBooks (EPUB format), add it to your eReader and read!',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${process.env.BASE_URL}/open-graph.png`,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Bookshelves',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: '#800080',
    height: '2px',
  },

  plugins: [
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/trevoreyre/autocomplete
    '~/plugins/autocomplete-vue',
    // https://github.com/surmon-china/vue-awesome-swiper
    '~/plugins/vue-awesome-swiper',
    // https://github.com/hilongjw/vue-lazyload
    '~/plugins/vue-lazyload',
    // load SVG from assets/icons
    '~/plugins/icons-loader',
    // global helper methods
    '~/plugins/helper',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components/common', global: true }],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/web-vitals-module
    // [
    //   'nuxt-vitals',
    //   {
    //     trackingID: 'G-ZFLRZXPL97',
    //     eventCategory: 'Arts',
    //     debug: 0,
    //     disabled: false,
    //   },
    // ],
    // https://image.nuxtjs.org
    // '@nuxt/image',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
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

  // image: {},

  colorMode: {
    classSuffix: '',
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
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // https://i18n.nuxtjs.org/setup
    // 'nuxt-i18n',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
  },
  sitemap: {
    // options
  },
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
  robots: {
    /* module options */
  },
  // i18n: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
