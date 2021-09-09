const metadata = require('./metadata.js')

// Settings
const baseUrl = `${process.env.BASE_URL}`
const url = `${baseUrl}/`
const image = `${process.env.BASE_URL}/default.jpg`

module.exports = (meta) => {
  return [
    //
    // Meta tags
    //
    ...getMeta(meta),
    //
    // Open Graph
    //
    ...getOpenGraph(meta),
    //
    // Twitter card
    //
    ...getTwitterCard(meta),
  ]
}

function getMeta(meta) {
  let metaDesc = 'meta'
  metaDesc = (meta && meta.description) || metadata.tags.description
  const limit = 155
  if (metaDesc.length > limit) {
    metaDesc = metaDesc.substring(0, limit - 3) + '...'
  }
  return [
    {
      hid: 'description',
      name: 'description',
      content: metaDesc,
    },
  ]
}
function getOpenGraph(meta) {
  return [
    {
      hid: 'og:type',
      property: 'og:type',
      content: (meta && meta.type) || metadata.og.type,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: (meta && `${baseUrl}${meta.url}`) || url,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: (meta && meta.title) || metadata.tags.title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: (meta && meta.description) || metadata.tags.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: (meta && meta.image) || image,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: (meta && meta.title) || metadata.tags.title,
    },
    additionalOpenGraph(
      meta,
      meta.articlePublishedTime,
      'article:published_time'
    ),
    additionalOpenGraph(meta, meta.articleAuthor, 'article:author'),
    additionalOpenGraph(meta, meta.articleSection, 'article:section'),
    additionalOpenGraph(meta, meta.bookISBN, 'book:isbn'),
    additionalOpenGraph(meta, meta.bookAuthor, 'book:author'),
    additionalOpenGraph(meta, meta.bookReleaseDate, 'book:release_date'),
    additionalOpenGraph(meta, meta.bookTag, 'books:tag'),
    additionalOpenGraph(meta, meta.profileFirstName, 'profile:first_name'),
    additionalOpenGraph(meta, meta.profileLastName, 'profile:last_name'),
  ]
}

function getTwitterCard(meta) {
  return [
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: (meta && meta.title) || metadata.tags.title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: (meta && meta.description) || metadata.tags.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: (meta && meta.image) || image,
    },
  ]
}

function additionalOpenGraph(meta, customMeta, hid) {
  return meta && customMeta
    ? {
        hid,
        property: hid,
        content: customMeta,
      }
    : ''
}
