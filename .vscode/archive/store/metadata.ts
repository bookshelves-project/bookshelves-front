import { defineStore } from 'pinia'
// import packageJson from '@/package.json'

export const useMetadataStore = defineStore('metadata', {
  state: () => ({
    base: {} as MetadataBase,
  }),
  actions: {
    setBase() {
      const config = useRuntimeConfig()
      const app: string = config.appName
      const author: string = config.metaAuthor
      const description: string = config.metaDescription
      const license: string = config.license
      const color = config.metaColor

      const twitterLink: string | null = config.metaTwitterSite
        ? config.metaTwitterSite.replace('@', '')
        : null

      const meta: MetadataBase = {
        settings: {
          robots: config.metaRobot,
          disallow: config.metaRobotDisallow,
          color,
          locale: 'en_US',
          lang: 'en',
          googleToken: config.googleSiteVerificationToken,
        },
        website: {
          title: app,
          titleTemplate: ` · ${app}`,
          description,
          rating: 'general',
          keywords: ['epub', 'book', 'ebook'],
          author,
          publisher: app,
          copyright: license,
          language: 'english',
          designer: author,
        },
        og: {
          type: 'website',
          siteName: app,
        },
        twitter: {
          creator: config.metaTwitterCreator,
          site: config.metaTwitterSite,
          url: config.metaTwitterSite
            ? `https://twitter.com/${twitterLink}`
            : undefined,
        },
      }
      this.$patch({
        base: meta,
      })
    },
  },
})
