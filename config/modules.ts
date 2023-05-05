import type { NuxtConfig } from '@nuxt/schema'
import { en, fr } from './locales'

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
  // old configuration
  vueI18n: {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en,
      fr,
    },
  },
}

// https://github.com/kiwilan/nuxt-svg-transformer
const svgTransformer: NuxtConfig['svgTransformer'] = {
  title: false,
  sizeInherit: true,
}

// https://github.com/kiwilan/nuxt-typed-link
const typedLink: NuxtConfig['typedLink'] = {
  i18n: true,
}

const modules = {
  svgTransformer,
  i18n,
  typedLink,
}

export default modules
