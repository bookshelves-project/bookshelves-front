import type { NuxtConfig } from 'nuxt'

const build = {
  // https://github.com/nuxt-community/tailwindcss-module/issues/227
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
} as NuxtConfig['build']

export default build
