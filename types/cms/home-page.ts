export interface Hero {
  title?: string
  text?: string
  picture?: string
}

export interface FeaturesList {
  text?: string
  title?: string
  link?: string
  picture?: string
}

export interface LogosList {
  link?: string
  slug?: string
  label?: string
  picture?: string
}

export interface StatisticsList {
  label?: string
  count?: number
}

export interface Statistics {
  eyebrow?: string
  title?: string
  text?: string
  list?: StatisticsList[]
}
export interface Features {
  title?: string
  text?: string
  list?: FeaturesList[]
}

export interface Logos {
  title?: string
  list?: LogosList[]
}

export interface Highlight {
  title?: string
  text?: string
  ctaText?: string
  ctaLink?: object
  quoteText?: string
  quoteAuthor?: string
  icon?: string
  picture?: string
}
export interface HomePage {
  hero?: Hero
  statistics?: Statistics
  logos?: Logos
  features?: Features
  highlights?: Highlight[]
  displayLatest?: boolean
  displaySelection?: boolean
}
