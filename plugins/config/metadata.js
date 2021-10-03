const tailwind = require('../../tailwind.config')
const packageJson = require('../../package.json')
const color = tailwind.theme.extend.colors.primary[600]

const app = process.env.APP_NAME || 'Bookshelves'
const author = process.env.APP_AUTHOR || 'Bookshelves Team'
const description =
  process.env.META_DESCRIPTION ||
  'For people with eReaders, download eBooks and reading in complete tranquility, your digital library that goes everywhere with you.'
const license = packageJson.license

let twitterLink = process.env.META_TWITTER_SITE
twitterLink = twitterLink ? twitterLink.replace('@', '') : null

module.exports = {
  settings: {
    robots: process.env.META_ROBOT || 'index, follow',
    disallow: '',
    color,
    locale: 'en_US',
    lang: 'en',
    googleToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN || null,
  },
  website: {
    title: 'Bookshelves',
    titleTemplate: `%s · ${app}`,
    description,
    rating: 'general',
    keywords: ['epub', 'book', 'ebook'],
    author,
    publisher: app,
    copyright: license,
    language: 'english',
    designer: author,
  },
  og: {
    type: 'website',
    siteName: app,
  },
  twitter: {
    creator: process.env.META_TWITTER_CREATOR || null,
    site: process.env.META_TWITTER_SITE || null,
    url: process.env.META_TWITTER_SITE
      ? `https://twitter.com/${twitterLink}`
      : null,
  },
}
