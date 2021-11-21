import metadata from './metadata'

const pwa = {
  meta: {
    name: metadata.website.title,
    author: metadata.website.author,
    description: metadata.website.description,
    theme_color: metadata.settings.color,
    lang: metadata.settings.lang,
    ogSiteName: metadata.og.siteName,
    ogTitle: metadata.website.title,
    ogDescription: metadata.website.description,
    ogImage: `${process.env.BASE_URL}/default.jpg`,
    ogUrl: process.env.BASE_URL,
    twitterSite: metadata.twitter.site,
    twitterCreator: metadata.twitter.creator,
  },
  manifest: {
    name: metadata.website.title,
    short_name: metadata.og.siteName,
    description: metadata.website.description,
    display: 'browser',
    lang: metadata.settings.lang,
  },
}

export default pwa
