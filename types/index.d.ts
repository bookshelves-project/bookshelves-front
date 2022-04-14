declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    /**
     * URL of front-end
     */
    baseURL: string
    /**
     * URL of API
     */
    apiURL: string
    /**
     * `api` by default
     */
    apiEndpoint: string
    /**
     * Name of app
     */
    appName: string
    metaTitle: string
    metaDescription: string
    metaAuthor: string
    metaRobot: string
    metaTwitterCreator: string
    metaTwitterSite: string
    metaRobotDisallow: string
    metaLang: string
    metaColor: string
    googleSiteVerificationToken: string
    moduleSocial: boolean
    moduleSocialRating: boolean
    moduleContact: boolean
    matomoUrl: string
    matomoSiteId: string
    linkLicense: string
    linkChangelog: string
    primaryColor100: string
    primaryColor200: string
    primaryColor300: string
    primaryColor400: string
    primaryColor500: string
    primaryColor600: string
    primaryColor700: string
    primaryColor800: string
    primaryColor900: string
  }
  interface PrivateRuntimeConfig {}
}

export {}
