import { useApplicationStore } from '~/stores/application'
import { Author, Tag } from '~/types'

/**
 * Get a `string` from `Author[]`
 * @typeParam `Author[]`
 * @returns `string`
 *
 * ```html
 * <div>
 *  {{ formatAuthors(book.authors) }}
 * </div>
 * ```
 */
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

/**
 * Get Language from slug
 * @typeParam `string` of Language.
 * @returns `string`
 */
export const formatLanguage = (slug: string) => {
  const store = useApplicationStore()
  const language = store.languages.find(lang => lang.meta?.slug === slug)

  return language ? language.name : 'unkown'
}

/**
 * Get a `string` from `Tag[]`
 * @typeParam `Tag[]`
 * @returns `string`
 */
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
