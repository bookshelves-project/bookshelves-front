import { useIndexStore } from '~/stores'
import { Author, Tag } from '~/types'

// get all authors into a string from array of object
export const formatAuthors = (authors: Author[] | undefined) => {
  if (authors?.length) {
    let authorsToString = ''
    authors.forEach((author, authorId) => {
      authorsToString += `${author.name}`
      if (authors.length > 1 && authorId !== authors.length - 1) {
        authorsToString += ' & '
      }
    })
    return authorsToString
  }

  return 'unknown'
}

// get language flag url or label from slug
export const formatLanguage = (slug: string) => {
  const store = useIndexStore()
  const language = store.languages.find(lang => lang.meta?.slug === slug)

  // return language ? language[type] : 'unkown'
  // const colors: ObjectLiteral = {
  //   success: 'bg-emerald-100',
  //   warning: 'bg-amber-100',
  //   error: 'bg-red-100',
  //   information: 'bg-sky-100',
  //   default: 'bg-sky-100'
  // }

  // colors[typeData] || colors.default

  return language ? language.name : 'unkown'
}

// get all authors into a string from array of object
export const formatTags = (tags?: Tag[]) => {
  if (tags) {
    let entitiesToString = ''
    tags.forEach((tag, tagId) => {
      entitiesToString += `${tag.name}`
      if (tags.length > 1 && tagId !== tags.length - 1) {
        entitiesToString += ' & '
      }
    })
    return entitiesToString
  }

  return 'unknown'
}
