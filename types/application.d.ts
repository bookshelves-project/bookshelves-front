declare interface HeadConfig {
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

declare interface ApplicationEnums {
  authorRoles: Keyable
  bookFormats: Keyable
  bookTypes: Keyable
  countSizes: Keyable
  entities: Keyable
  genders: Keyable
  postStatus: Keyable
  roles: Keyable
  submissionsReasons: Keyable
  tagTypes: Keyable
  models: Keyable
}

declare interface Application {
  enums: ApplicationEnums
  languages: Language[]
  headConfig: HeadConfig
}
