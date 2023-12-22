import type { NuxtConfig } from '@nuxt/schema'

const i18n: NuxtConfig['i18n'] = {
  baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    {
      code: 'fr',
      iso: 'fr-FR',
      name: 'Français',
    },
  ],
  defaultLocale: 'en',
  strategy: 'prefix_except_default',
}

// // https://github.com/kiwilan/nuxt-svg-transformer
// const svgTransformer: NuxtConfig['svgTransformer'] = {
//   title: false,
//   sizeInherit: true,
// }
// https://github.com/kiwilan/unplugin-svg-transformer
const svgTransformer: NuxtConfig['svgTransformer'] = {
  svg: { sizeInherit: true },
}

const modules = {
  svgTransformer,
  i18n,
}

export default modules
