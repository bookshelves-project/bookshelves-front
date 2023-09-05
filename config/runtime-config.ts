const runtimeConfigPrivate = {
  secretKey: process.env.SECRET_KEY ?? '',
}
const runtimeConfigPublic = {
  baseUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  apiUrl: process.env.NUXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  apiEndpoint: process.env.API_ENDPOINT ?? '/api',

  siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  siteName: 'Ewilan Rivière',
  siteDescription: 'Bookshelves',
  language: 'en',

  analyticsUrl: process.env.ANALYTICS_URL ?? '',
  analyticsId: process.env.ANALYTICS_ID ?? '',
  googleSiteVerificationToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN ?? '',

  // appName: process.env.APP_NAME ?? 'Bookshelves',
  // metaTitle:
  //   process.env.META_TITLE ?? 'Bookshelves, reading in complete tranquility...',
  // metaDescription:
  //   process.env.META_DESCRIPTION
  //   ?? 'For people with eReaders, download eBooks and reading in complete tranquility, your digital library that goes everywhere with you.',
  // metaAuthor: process.env.META_AUTHOR ?? 'Bookshelves Team',
  // metaRobot: process.env.META_ROBOT ?? 'index, follow',
  // metaTwitterCreator: process.env.META_TWITTER_CREATOR ?? '@ewilanriviere',
  // metaTwitterSite: process.env.META_TWITTER_SITE ?? '@bookshelves_ink',
  // metaRobotDisallow:
  //   process.env.META_ROBOT_DISALLOW
  //   ?? '/sign-in,/sign-up,/dashboard,/admin,/profile',
  // metaLang: process.env.META_LANG ?? 'en_US',
  // metaColor: process.env.PRIMARY_COLOR_500 ?? '#6C63FF',
  // googleSiteVerificationToken:
  //   process.env.GOOGLE_SITE_VERIFICATION_TOKEN
  //   ?? 'a2rvJsBQDMc_g5Cxb_cnRsJMO6_5cNTIKh_80Ed4hhM',
  // moduleSocial: process.env.MODULE_SOCIAL
  //   ? JSON.parse(process.env.MODULE_SOCIAL)
  //   : true,
  // moduleSocialRating: process.env.MODULE_SOCIAL_RATING
  //   ? JSON.parse(process.env.MODULE_SOCIAL_RATING)
  //   : false,
  // moduleContact: process.env.MODULE_CONTACT
  //   ? JSON.parse(process.env.MODULE_CONTACT)
  //   : false,
  // matomoUrl: process.env.MATOMO_URL ?? 'https://matomo.git-projects.xyz/',
  // matomoSiteId: process.env.MATOMO_SITE_ID ?? '1',
  // linkLicense:
  //   process.env.LINK_LICENSE
  //   ?? 'https://bookshelves-documentation.netlify.app/development/license',
  // linkChangelog:
  //   process.env.LINK_CHANGELOG
  //   ?? 'https://bookshelves-documentation.netlify.app/development/changelog',
  // primaryColor100: process.env.PRIMARY_COLOR_100 ?? '#e2e0ff',
  // primaryColor200: process.env.PRIMARY_COLOR_200 ?? '#c4c1ff',
  // primaryColor300: process.env.PRIMARY_COLOR_300 ?? '#a7a1ff',
  // primaryColor400: process.env.PRIMARY_COLOR_400 ?? '#8982ff',
  // primaryColor500: process.env.PRIMARY_COLOR_500 ?? '#6c63ff',
  // primaryColor600: process.env.PRIMARY_COLOR_600 ?? '#564fcc',
  // primaryColor700: process.env.PRIMARY_COLOR_700 ?? '#413b99',
  // primaryColor800: process.env.PRIMARY_COLOR_800 ?? '#2b2866',
  // primaryColor900: process.env.PRIMARY_COLOR_900 ?? '#161433',
}

export { runtimeConfigPrivate, runtimeConfigPublic }
