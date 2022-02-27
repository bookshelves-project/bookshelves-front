declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    baseURL: string
    apiURL: string
    apiV1URL: string
    apiVersion: string
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

import type {
  Keyable,
  Route,
  SelectedEntities,
  FooterColumn,
  RouteLink,
  HeadMeta,
  HeadElement,
  Response,
  Params,
  FetchParams,
  FilterOption,
  MetadataBase,
} from './app'
import type { ApiPaginateResponse, ApiResponse } from './api'
import type {
  Book,
  Author,
  Serie,
  Entity,
  AuthorEntity,
  Tag,
  Search,
} from './entities'
import type {
  Application,
  CmsInitialization,
  HomePage,
  Language,
  Features,
  FeaturesList,
  Hero,
  Highlight,
  Logos,
  LogosList,
  Statistics,
  StatisticsList,
  Pricing,
  PricingList,
} from './cms'

export {
  Keyable,
  Route,
  SelectedEntities,
  FooterColumn,
  RouteLink,
  ApiPaginateResponse,
  ApiResponse,
  Book,
  Author,
  Serie,
  Entity,
  AuthorEntity,
  Tag,
  Search,
  Application,
  CmsInitialization,
  HomePage,
  Language,
  Features,
  FeaturesList,
  Hero,
  Highlight,
  Logos,
  LogosList,
  Statistics,
  StatisticsList,
  Pricing,
  PricingList,
  HeadMeta,
  HeadElement,
  Response,
  Params,
  FetchParams,
  FilterOption,
  MetadataBase,
}
