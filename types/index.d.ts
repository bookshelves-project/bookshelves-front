// declare module '@nuxt/schema' {
//   interface PublicRuntimeConfig {
//     baseURL: string
//     apiURL: string
//     apiEndpoint: string
//     apiEndpoint: string
//     appName: string
//     metaTitle: string
//     metaDescription: string
//     metaAuthor: string
//     metaRobot: string
//     metaTwitterCreator: string
//     metaTwitterSite: string
//     metaRobotDisallow: string
//     metaColor: string
//     googleSiteVerificationToken: string
//     moduleSocial: boolean
//     moduleSocialRating: boolean
//     matomoUrl: string
//     matomoSiteId: string
//     linkLicense: string
//     linkChangelog: string
//     primaryColor100: string
//     primaryColor200: string
//     primaryColor300: string
//     primaryColor400: string
//     primaryColor500: string
//     primaryColor600: string
//     primaryColor700: string
//     primaryColor800: string
//     primaryColor900: string
//   }
//   interface PrivateRuntimeConfig {}
// }

declare type Params = (string | string[] | undefined)[]

declare interface Route {
  name?: string
  params?: Keyable
  query?: Query
  paramsList?: Keyable
  queryList?: Keyable
}

declare interface FetchParams {
  endpoint: Endpoint
  params?: Params
  query?: Query
  lazy?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}

declare interface Keyable {
  [key: string]: any
}
declare type Dictionary<T> = { [key: string]: T }
