import { Author } from '~/types/books/books'

/**
 * Format Author Array to string
 */
export const formatAuthors = (authors: Array<Author>): string => {
  if (authors.length) {
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
