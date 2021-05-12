const metadata = require('./metadata.js')

// Settings
const url = `${process.env.BASE_URL}/`
const image = `${process.env.BASE_URL}/default.jpg`

export default (meta) => {
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
      content: (meta && meta.url) || url,
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
  ]
}

function getTwitterCard(meta) {
  return [
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: (meta && meta.url) || url,
    },
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
