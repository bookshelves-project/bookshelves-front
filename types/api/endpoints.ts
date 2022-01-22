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

  CmsInitialization = '/cms/initialization',
  CmsApplication = '/cms/application',
  CmsHomePage = '/cms/home-page',

  Sanctum = '/sanctum/csrf-cookie',
  AuthLogin = '/login',
  AuthRegister = '/register',
  AuthLogout = '/logout',
  AuthPasswordForgot = '/password/forgot',
  AuthPasswordReset = '/password/reset',
  AuthPasswordUpdate = '/password/update',

  FavoriteUser = '/favorites',

  Profile = '/profile',
  ProfileUpdate = '/profile/update',
  ProfileDelete = '/profile/delete',

  FavoriteToggle = '/favorites/toggle'
}
