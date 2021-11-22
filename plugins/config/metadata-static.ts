import metadata from './metadata'

const metadataStatic = () => {
  return [
    ...getSettings(),
    ...getMeta(),
    ...getOpenGraph(),
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
    {
      hid: 'google-site-verification',
      name: 'google-site-verification',
      content: metadata.settings.googleToken,
    },
  ]
}

function getMeta() {
  return [
    {
      hid: 'author',
      name: 'author',
      content: metadata.website.author,
    },
    {
      hid: 'language',
      name: 'language',
      content: metadata.website.language,
    },
    {
      hid: 'designer',
      name: 'designer',
      content: metadata.website.designer,
    },
    {
      hid: 'publisher',
      name: 'publisher',
      content: metadata.website.publisher,
    },
    {
      hid: 'copyright',
      name: 'copyright',
      content: metadata.website.copyright,
    },
    {
      hid: 'rating',
      name: 'rating',
      content: metadata.website.rating,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: metadata.website.keywords.join(','),
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
      property: 'og:locale',
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
    metadata.twitter.url
      ? {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: metadata.twitter.url,
        }
      : '',
    metadata.twitter.creator
      ? {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: metadata.twitter.creator,
        }
      : '',
  ]
}

export default metadataStatic
