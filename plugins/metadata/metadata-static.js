const metadata = require('./metadata.js')

export default () => {
  return [
    //
    // Settings
    //
    ...getSettings(),
    //
    // Meta tags
    //
    ...getMeta(),
    //
    // Open Graph
    //
    ...getOpenGraph(),
    //
    // Twitter card
    //
    ...getTwitterCard(),
  ]
}

function getSettings() {
  return [
    {
      hid: 'robots',
      name: 'robots',
      content: metadata.settings.robots,
    },
    { name: 'msapplication-TileColor', content: metadata.settings.color },
    { name: 'theme-color', content: metadata.settings.color },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
}

function getMeta() {
  return [
    {
      hid: 'author',
      name: 'author',
      content: metadata.tags.author,
    },
    {
      hid: 'language',
      name: 'language',
      content: metadata.tags.language,
    },
    {
      hid: 'designer',
      name: 'designer',
      content: metadata.tags.designer,
    },
    {
      hid: 'publisher',
      name: 'publisher',
      content: metadata.tags.publisher,
    },
    {
      hid: 'copyright',
      name: 'copyright',
      content: metadata.tags.copyright,
    },
    {
      hid: 'rating',
      name: 'rating',
      content: metadata.tags.rating,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: metadata.tags.keywords.join(','),
    },
  ]
}

function getOpenGraph() {
  return [
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: metadata.og.siteName,
    },
    {
      hid: 'og:locale',
      name: 'og:locale',
      content: metadata.settings.locale,
    },
  ]
}

function getTwitterCard() {
  return [
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: metadata.twitter.url,
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: metadata.twitter.creator,
    },
  ]
}
