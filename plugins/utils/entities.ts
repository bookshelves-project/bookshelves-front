import { Author } from '~/types/shared'

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
  const available = [
    {
      slug: 'fr',
      id: 'fr',
      label: 'French',
      flag: '🇫🇷'
    },
    {
      slug: 'en',
      id: 'gb',
      label: 'English',
      flag: '🇬🇧'
    }
  ]

  return available.find(lang => lang.slug === slug)
}
