import { HomePage } from './home-page'

export type {
  HomePage
}
export interface Application {
  name?: string
  title_template?: string
  slug?: string
  favicon?: string
  icon?: string
  logo?: string
  og?: string
  meta_title?: string
  meta_description?: string
  meta_Author?: string
  meta_twitter_Creator?: string
  meta_twitter_site?: string
}

export interface Enums {
  genders?: string[]
}

interface Meta {
  slug?: string;
}

export interface Language {
  name?: string;
  firstChar?: string;
  count?: number;
  meta?: Meta;
}

export interface CmsInitialization {
  enums: Enums
  languages: Language[],
  application: Application
}
