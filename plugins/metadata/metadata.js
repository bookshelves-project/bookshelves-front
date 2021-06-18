let twitterLink = process.env.META_TWITTER_SITE
twitterLink = twitterLink.replace('@', '')

const app = process.env.APP_NAME || 'Bookshelves'

module.exports = {
  settings: {
    robots: process.env.META_ROBOT || 'index, follow',
    disallow:
      process.env.META_ROBOT_DISALLOW ||
      '/sign-in,/sign-up,/dashboard,/admin,/profile',
    color: process.env.META_COLOR || '#6C63FF',
    locale: 'en_US',
    lang: 'en',
  },
  tags: {
    title: process.env.META_TITLE || 'Bookshelves',
    titleTemplate: `%s · ${app}`,
    description:
      process.env.META_DESCRIPTION ||
      'For people with eReaders, download eBooks and reading in complete tranquility, your digital library that goes everywhere with you.',
    rating: 'general',
    keywords: ['epub', 'book', 'ebook'],
    author: process.env.APP_AUTHOR || 'Bookshelves Team',
    publisher: app,
    copyright: 'BSD 2-Clause license',
    language: 'english',
    designer: process.env.APP_AUTHOR || 'Bookshelves Team',
  },
  og: {
    type: 'website',
    siteName: app,
  },
  twitter: {
    creator: process.env.META_TWITTER_CREATOR || '@ewilanriviere',
    site: process.env.META_TWITTER_SITE || '@bookshelves_ink',
    url: `https://twitter.com/${twitterLink}`,
  },
}
