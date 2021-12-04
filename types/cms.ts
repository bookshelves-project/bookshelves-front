import { Features, Hero, Logos, Statistics } from './cms/home-page'

export interface Application {
    name?: string
    title_template?: string
    slug?: string
    favicon?: string
    icon?: string
    logo?: string
    og?: string
    metaTitle?: string
    metaDescription?: string
    metaAuthor?: string
    metaTwitterCreator?: string
    metaTwitterSite?: string
}

export interface HomePage {
    hero?: Hero
    statistics?: Statistics
    logos?: Logos
    features?: Features
    displayLatest?: boolean
    displaySelection?: boolean
  }
