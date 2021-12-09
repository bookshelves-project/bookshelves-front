export interface Hero {
  title?: string
  text?: string
  picture?: string
}

export interface FeaturesList {
  icon?: string
  text?: string
  title?: string
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
export interface Features {
  title?: string
  text?: string
  list?: FeaturesList[]
}

export interface Logos {
  title?: string
  list?: LogosList[]
}

export interface Statistics {
  eyebrow?: string
  title?: string
  text?: string
  list?: StatisticsList[]
}
