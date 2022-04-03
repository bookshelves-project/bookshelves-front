// import type { ColorModeOptions } from '@nuxtjs/color-mode/types/color-mode'

import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { ModuleOptions } from '@nuxt/schema'

// const colorMode: Partial<ColorModeOptions> = {
//   classSuffix: ''
// }
const htmlValidator = {
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
}
const tailwindcss: Partial<ModuleOptions> = {
  // cssPath: '~/assets/css/tailwind.css',
  // configPath: 'tailwind.config.js',
  exposeConfig: true,
  // config: {},
  // injectPosition: 0,
  // viewer: true,
}
const vueuse: VueUseNuxtOptions = {
  ssrHandlers: true,
}

const buildModules = {
  tailwindcss: tailwindcss,
  vueuse: vueuse,
}

export default buildModules
