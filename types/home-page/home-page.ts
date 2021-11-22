import { Hero } from './hero'

export interface HomePage {
  hero?: Hero
  statistics?: Statistics
  logos?: Logos
  features?: Features
  displayLatest?: boolean
  displaySelection?: boolean
}

export interface Features {
  title?: string
  text?: string
  list?: FeaturesList[]
}

export interface FeaturesList {
  icon?: string
  text?: string
  title?: string
  media?: string
}

export interface Logos {
  title?: string
  list?: LogosList[]
}

export interface LogosList {
  link?: string
  slug?: string
  label?: string
  media?: string
}

export interface Statistics {
  eyebrow?: string
  title?: string
  text?: string
  list?: StatisticsList[]
}

export interface StatisticsList {
  label?: string
  count?: number
}
