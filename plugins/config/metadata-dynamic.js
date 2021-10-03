const metaGlobal = require('./metadata.js')

// Settings
const baseUrl = `${process.env.BASE_URL}`
const homeUrl = `${baseUrl}/`
const homeImage = `${process.env.BASE_URL}/default.jpg`

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
  const metaLocal = meta || {}
  let metaDesc = metaLocal.description
    ? metaLocal.description
    : metaGlobal.website.description
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
  const metaLocal = meta || {}
  return [
    {
      hid: 'og:type',
      property: 'og:type',
      content: metaLocal.type ? metaLocal.type : metaGlobal.og.type,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: metaLocal.url ? `${baseUrl}${metaLocal.url}` : homeUrl,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: metaLocal.title ? metaLocal.title : metaGlobal.website.title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: metaLocal.description
        ? metaLocal.description
        : metaGlobal.website.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: metaLocal.image ? metaLocal.image : homeImage,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: metaLocal.title ? metaLocal.title : metaGlobal.website.title,
    },
    additionalOpenGraph(
      metaLocal.articlePublishedTime,
      'article:published_time'
    ),
    additionalOpenGraph(metaLocal.articleAuthor, 'article:author'),
    additionalOpenGraph(metaLocal.articleSection, 'article:section'),
    additionalOpenGraph(metaLocal.bookISBN, 'book:isbn'),
    additionalOpenGraph(metaLocal.bookAuthor, 'book:author'),
    additionalOpenGraph(metaLocal.bookReleaseDate, 'book:release_date'),
    additionalOpenGraph(metaLocal.bookTag, 'book:tag'),
    additionalOpenGraph(metaLocal.profileFirstName, 'profile:first_name'),
    additionalOpenGraph(metaLocal.profileLastName, 'profile:last_name'),
  ]
}

function getTwitterCard(meta) {
  const metaLocal = meta || {}
  return [
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: metaLocal.title ? metaLocal.title : metaGlobal.website.title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: metaLocal.description
        ? metaLocal.description
        : metaGlobal.website.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: metaLocal.image ? metaLocal.image : homeImage,
    },
  ]
}

function additionalOpenGraph(customMeta, hid) {
  return customMeta
    ? {
        hid,
        property: hid,
        content: customMeta,
      }
    : ''
}
