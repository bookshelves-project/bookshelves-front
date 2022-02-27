export enum ApiEndpoint {
  Book = '/books',
  BookRelated = '/books/related',
  BookSelection = '/books/selection',
  BookLatest = '/books/latest',
  Serie = '/series',
  SerieBook = '/series/books',
  Author = '/authors',
  AuthorBook = '/authors/books',
  AuthorSerie = '/authors/series',
  Tag = '/tags',
  TagBook = '/tags/books',

  CmsInitialization = '/cms/initialization',
  CmsApplication = '/cms/application',
  CmsHomePage = '/cms/home-page',

  Submission = '/send/submission',

  Sanctum = '/sanctum/csrf-cookie',
  AuthLogin = '/login',
  AuthRegister = '/register',
  AuthLogout = '/logout',
  AuthPasswordForgot = '/password/forgot',
  AuthPasswordReset = '/password/reset',
  AuthPasswordUpdate = '/password/update',
  AuthUser = '/user',

  FavoriteUser = '/favorites',

  Profile = '/profile',
  ProfileUpdate = '/profile/update',
  ProfileDelete = '/profile/delete',

  FavoriteToggle = '/favorites/toggle',

  Search = '/search',
}

export enum Entity {
  Book = 'books',
  Serie = 'series',
  Author = 'authors',
}

export interface Enums {
  genders: string[]
  tagTypes: string[]
  bookTypes: string[]
  bookFormats: string[]
}

export enum ToastAuto {
  success = 'success',
  error = 'error',
}

export type ToastType =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'default'
