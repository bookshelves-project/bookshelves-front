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
  const metaObject = meta || {}
  return [
    {
      hid: 'og:type',
      property: 'og:type',
      content: (metaObject && metaObject.type) || metadata.og.type,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: (metaObject && `${baseUrl}${metaObject.url}`) || url,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: (metaObject && metaObject.title) || metadata.tags.title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content:
        (metaObject && metaObject.description) || metadata.tags.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: (metaObject && metaObject.image) || image,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: (metaObject && metaObject.title) || metadata.tags.title,
    },
    additionalOpenGraph(
      metaObject,
      metaObject.articlePublishedTime,
      'article:published_time'
    ),
    additionalOpenGraph(metaObject, metaObject.articleAuthor, 'article:author'),
    additionalOpenGraph(
      metaObject,
      metaObject.articleSection,
      'article:section'
    ),
    additionalOpenGraph(metaObject, metaObject.bookISBN, 'book:isbn'),
    additionalOpenGraph(metaObject, metaObject.bookAuthor, 'book:author'),
    additionalOpenGraph(
      metaObject,
      metaObject.bookReleaseDate,
      'book:release_date'
    ),
    additionalOpenGraph(metaObject, metaObject.bookTag, 'books:tag'),
    additionalOpenGraph(
      metaObject,
      metaObject.profileFirstName,
      'profile:first_name'
    ),
    additionalOpenGraph(
      metaObject,
      metaObject.profileLastName,
      'profile:last_name'
    ),
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
