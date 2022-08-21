declare interface CmsFeaturesList {
  text?: string
  title?: string
  link?: string
  picture?: string
}

declare interface CmsLogosList {
  link?: string
  slug?: string
  label?: string
  picture?: string
}

declare interface CmsStatisticsList {
  label?: string
  count?: number
}

declare interface CmsStatistics {
  eyebrow?: string
  title?: string
  text?: string
  list?: StatisticsList[]
}
declare interface CmsFeatures {
  title?: string
  text?: string
  list?: CmsFeaturesList[]
}

declare interface CmsLogos {
  title?: string
  list?: CmsLogosList[]
}

declare interface CmsHighlight {
  title?: string
  text?: string
  ctaText?: string
  ctaLink?: TypedRoute
  quoteText?: string
  quoteAuthor?: string
  icon?: string
  picture?: string
}

declare interface CmsPricing {
  title: string
  description: string
  features: string[]
  cta?: string
  route?: string
}

declare interface CmsPricingList {
  leave: CmsPricing
  free: CmsPricing
  account: CmsPricing
}

declare interface SelectedEntities {
  key: string
  endpoint: ApiEndpoint
  paramsList?: Params
  right?: boolean
  eyebrow?: string
  title: string
  text: string
}

declare interface CmsHero {
  title?: string
  text?: string
  picture?: string
}

declare interface CmsHomePage {
  hero?: CmsHero
  statistics?: CmsStatistics
  logos?: CmsLogos
  features?: CmsFeatures
  highlights?: CmsHighlight[]
  displayLatest?: boolean
  displaySelection?: boolean
}
