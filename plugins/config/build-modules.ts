// https://nuxtjs.org/docs/configuration-glossary/configuration-modules#buildmodules
const buildModules: object = {
  buildModules: [
    '@nuxt/typescript-build', // https://typescript.nuxtjs.org/
    // '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org/
    // '@nuxtjs/html-validator', // https://html-validator.nuxtjs.org/
    '@nuxtjs/tailwindcss', // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxtjs/svg-sprite', // https://github.com/nuxt-community/svg-sprite-module
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.pcss',
  },
  colorMode: {
    classSuffix: '',
  },
  svgSprite: {},
  htmlValidator: {
    usePrettier: false,
    options: {
      extends: [
        'html-validate:document',
        'html-validate:recommended',
        'html-validate:standard',
      ],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        // Conflicts or not needed as we use prettier formatting
        'void-style': 'off',
        'no-trailing-whitespace': 'off',
        // Conflict with Nuxt defaults
        'require-sri': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
        // Unreasonable rule
        'no-inline-style': 'off',
      },
    },
  },
  scriptSetup: {},
}

export default buildModules
