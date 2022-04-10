declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    baseURL: string
    apiURL: string
    apiEndpoint: string
    apiEndpoint: string
    appName: string
    metaTitle: string
    metaDescription: string
    metaAuthor: string
    metaRobot: string
    metaTwitterCreator: string
    metaTwitterSite: string
    metaRobotDisallow: string
    metaColor: string
    googleSiteVerificationToken: string
    moduleSocial: boolean
    moduleSocialRating: boolean
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

declare module '#app' {
  interface NuxtApp {
    $toast(title?: string, text?: string, type?: ToastType): void
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast(title?: string, text?: string, type?: ToastType): void
  }
}

export {}
