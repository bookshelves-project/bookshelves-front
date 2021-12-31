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

  AuthLogin = '/login',
  AuthRegister = '/register',
  AuthLogout = '/logout',
  AuthPasswordForgot = '/password/forgot',
  AuthPasswordReset = '/password/reset',

  FavoriteUser = '/favorites',

  Profile = '/profile',
  ProfileUpdate = '/profile/update',

  FavoriteToggle = '/favorites/toggle'
}
