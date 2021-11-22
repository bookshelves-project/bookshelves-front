import metadata from './metadata'

const baseUrl: string = `${process.env.BASE_URL}`
const homeUrl: string = `${baseUrl}/`
const homeImage: string = `${process.env.BASE_URL}/default.jpg`

const metadataDynamic = (meta?: any) => {
  return [...getMeta(meta), ...getOpenGraph(meta), ...getTwitterCard(meta)]
}

function getMeta(meta: any) {
  const metaLocal = meta || {}
  let metaDesc = metaLocal.description
    ? metaLocal.description
    : metadata.website.description
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
function getOpenGraph(meta: any) {
  const metaLocal = meta || {}
  return [
    {
      hid: 'og:type',
      property: 'og:type',
      content: metaLocal.type ? metaLocal.type : metadata.og.type,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: metaLocal.url ? `${baseUrl}${metaLocal.url}` : homeUrl,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: metaLocal.title ? metaLocal.title : metadata.website.title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: metaLocal.description
        ? metaLocal.description
        : metadata.website.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: metaLocal.image ? metaLocal.image : homeImage,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: metaLocal.title ? metaLocal.title : metadata.website.title,
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

function getTwitterCard(meta: any) {
  const metaLocal = meta || {}
  return [
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: metaLocal.title ? metaLocal.title : metadata.website.title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: metaLocal.description
        ? metaLocal.description
        : metadata.website.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: metaLocal.image ? metaLocal.image : homeImage,
    },
  ]
}

function additionalOpenGraph(customMeta: string, hid: string) {
  return customMeta
    ? {
        hid,
        property: hid,
        content: customMeta,
      }
    : ''
}

export default metadataDynamic
