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

  AppInit = '/app-init',

  CmsApplication = '/cms/application',
  CmsHomePage = '/cms/home-page',

  AuthLogin = '/auth/login',
  AuthRegister = '/auth/register',
  AuthLogout = '/auth/logout',
  AuthForgotPassword = '/auth/forgot-password',
  AuthResetPassword = '/auth/reset-password',

  FavoriteUser = '/favorites',

  Profile = '/profile',
  ProfileUpdate = '/profile/update',

  FavoriteToggle = '/favorites/toggle'
}
