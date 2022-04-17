// const store = useMetadataStore()
// const metadata = store.base

// const metadataDynamic = (meta?: HeadMeta, baseURL?: string): HeadElement[] => {
//   return [
//     ...basic(meta),
//     ...openGraph(meta, baseURL),
//     ...twitterCard(meta, baseURL),
//   ] as Array<Record<string, any>>
// }

// const basic = (meta?: HeadMeta): HeadElement[] => {
//   const metaLocal = meta || {}
//   let metaDesc = metaLocal.description
//     ? metaLocal.description
//     : metadata.website.description
//   const limit = 155
//   if (metaDesc.length > limit) {
//     metaDesc = metaDesc.substring(0, limit - 3) + '...'
//   }
//   return [
//     {
//       hid: 'description',
//       name: 'description',
//       content: metaDesc,
//     },
//   ]
// }
// const openGraph = (meta?: HeadMeta, baseURL?: string): HeadElement[] => {
//   const metaLocal = meta || {}
//   return [

//     // additionalOpenGraph(
//     //   metaLocal.articlePublishedTime,
//     //   'article:published_time'
//     // ),
//     // additionalOpenGraph(metaLocal.articleAuthor, 'article:author'),
//     // additionalOpenGraph(metaLocal.articleSection, 'article:section'),
//     // additionalOpenGraph(metaLocal.bookISBN, 'book:isbn'),
//     // additionalOpenGraph(metaLocal.bookAuthor, 'book:author'),
//     // additionalOpenGraph(metaLocal.bookReleaseDate, 'book:release_date'),
//     // additionalOpenGraph(metaLocal.bookTag, 'book:tag'),
//     // additionalOpenGraph(metaLocal.profileFirstName, 'profile:first_name'),
//     // additionalOpenGraph(metaLocal.profileLastName, 'profile:last_name')
//   ]
// }

// const twitterCard = (meta?: HeadMeta, baseURL?: string): HeadElement[] => {
//   const metaLocal = meta || {}
//   return [

//   ]
// }

// const additionalOpenGraph = (
//   customMeta?: string,
//   hid?: string
// ): HeadElement | null => {
//   return customMeta ? { hid, property: hid, content: customMeta } : null
// }

// export default metadataDynamic
