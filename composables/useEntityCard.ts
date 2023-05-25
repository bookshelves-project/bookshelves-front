import type { Author, Book, Entity, EntityCard, EntityInstance, EntityType, Media, Serie } from '~/types'

export function useEntityCard(current: EntityInstance, withType = false, withName = false): EntityCard {
  const { formatAuthors, instanceAuthor, instanceBook, instanceSerie } = useEntityMethods()
  const currentType = ref<EntityType>()

  const checkType = () => {
    if (instanceBook(current))
      currentType.value = 'book'
    else if (instanceSerie(current))
      currentType.value = 'serie'
    else if (instanceAuthor(current))
      currentType.value = 'author'
  }
  checkType()

  const title = computed(() => {
    if (currentType.value === 'author') {
      const entity = current as Author
      return entity.name
    }

    const entity = current as Book | Serie

    return entity.title
  })

  const media = computed((): Media => {
    if (current.media) {
      return {
        name: current.media.name,
        url: current.media.url || '/images/no-cover.webp',
        color: current.media.color,
        available: current.media.available,
      }
    }

    return {
      name: '',
      url: '/images/no-cover.webp',
      color: '',
    }
  })

  const subtitle = computed(() => {
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = current as Book | Serie
      return formatAuthors(entity.authors)
    }

    const entity = current as Author
    if (entity.count) {
      let count = `${entity.count.books} books`
      if (entity.count.series)
        count += ` & ${entity.count.series} series`

      return count
    }
  })

  const text = computed(() => {
    if (currentType.value === 'book') {
      const entity = current as Book

      if (entity.serie)
        return `${entity.serie.title}, vol.${entity.volume}`
    }

    if (currentType.value === 'serie') {
      const entity = current as Serie
      return `${entity.count} books`
    }
  })

  const details = computed(() => {
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = current as Book | Serie
      return entity.language?.name
    }
  })

  const type = computed(() => {
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = current as Book | Serie
      return entity.type
    }
  })

  const entityName = computed(() => {
    const entity = current as Entity
    const entityName = entity.meta?.entity

    return entityName
  })

  const route = computed((): AppRoute => {
    let route: AppRoute = { name: 'index' }

    if (currentType.value === 'book') {
      const entity = current as Book
      route = {
        name: 'books-author_slug-book_slug',
        params: {
          author_slug: entity.meta.author,
          book_slug: entity.meta.slug,
        },
      }
    }
    else if (currentType.value === 'serie') {
      const entity = current as Serie
      route = {
        name: 'series-author_slug-serie_slug',
        params: {
          author_slug: entity.meta.author,
          serie_slug: entity.meta.slug,
        },
      }
    }
    else if (currentType.value === 'author') {
      const entity = current as Author
      route = {
        name: 'authors-author_slug',
        params: {
          author_slug: entity.meta.slug,
        },
      }
    }
    else {
      const entity = current as Entity
      if (entity.meta.entity === 'author') {
        route = {
          name: 'authors-author_slug',
          params: {
            author_slug: entity.meta.slug,
          },
        }
      }
      else if (entity.meta.entity === 'book') {
        route = {
          name: 'books-author_slug-book_slug',
          params: {
            author_slug: entity.meta.author,
            book_slug: entity.meta.slug,
          },
        }
      }
      else if (entity.meta.entity === 'serie') {
        route = {
          name: 'series-author_slug-serie_slug',
          params: {
            author_slug: entity.meta.author,
            serie_slug: entity.meta.slug,
          },
        }
      }
    }

    return route as AppRoute
  })

  return {
    entity: currentType.value,
    title: title.value,
    subtitle: subtitle.value,
    text: text.value,
    details: details.value,
    media: media.value,
    route: route.value,
  }
}

// const title = computed(() => {
//   if (currentType.value === 'book' || currentType.value === 'serie') {
//     const entity = current as Book | Serie
//     return entity.title
//   }
//   else if (currentType.value === 'author') {
//     const entity = current as Author
//     return entity.name
//   }

//   return ''
// })
// const media = computed((): Media => {
//   if (current.media) {
//     return {
//       name: current.media.name,
//       url: current.media.url || '/images/no-cover.webp',
//       color: current.media.color,
//       available: current.media.available,
//     }
//   }

//   return {
//     name: '',
//     url: '/images/no-cover.webp',
//     color: '',
//   }
// })
// const route = computed((): AppRoute => {
//   let route = { name: 'index', params: {} }

//   if (currentType.value === 'book') {
//     const entity = current as Book
//     route = {
//       name: 'books-author-book',
//       params: {
//         author: entity.meta.author,
//         book: entity.meta.slug,
//       },
//     }
//   }
//   else if (currentType.value === 'serie') {
//     const entity = current as Serie
//     route = {
//       name: 'series-author-serie',
//       params: {
//         author: entity.meta.author,
//         serie: entity.meta.slug,
//       },
//     }
//   }
//   else if (currentType.value === 'author') {
//     const entity = current as Author
//     route = {
//       name: 'authors-author',
//       params: {
//         author: entity.meta.slug,
//       },
//     }
//   }
//   else {
//     const entity = current as Entity
//     if (entity.meta.entity === 'author') {
//       route = {
//         name: 'authors-author',
//         params: {
//           author: entity.meta.slug,
//         },
//       }
//     }
//     else if (entity.meta.entity === 'book') {
//       route = {
//         name: 'books-author-book',
//         params: {
//           author: entity.meta.author,
//           book: entity.meta.slug,
//         },
//       }
//     }
//     else if (entity.meta.entity === 'serie') {
//       route = {
//         name: 'series-author-serie',
//         params: {
//           author: entity.meta.author,
//           serie: entity.meta.slug,
//         },
//       }
//     }
//   }

//   return route as AppRoute
// })

// const language = computed(() => {
//   let language
//   if (currentType.value === 'book' || currentType.value === 'serie') {
//     const entity = current as Book | Serie
//     language = entity.language?.name
//   }

//   return language
// })

// const serie = computed(() => {
//   if (currentType.value === 'book') {
//     const entity = current as Book
//     if (entity.serie && entity.volume) {
//       return {
//         title: `${entity.serie.title ?? entity.serie}`,
//         volume: `${entity.volume}`,
//       }
//     }
//   }
// })

// const authors = computed(() => {
//   let authors
//   if (currentType.value === 'book' || currentType.value === 'serie') {
//     const entity = current as Book | Serie
//     authors = entity.authors
//   }
//   else if (currentType.value !== 'author') {
//     const entity = current as Entity
//     authors = entity.authors
//   }

//   return authors ? formatAuthors(authors) : undefined
// })

// const count = computed((): string => {
//   let count
//   if (currentType.value === 'serie') {
//     const entity = current as Serie
//     count = `${entity.count} books`
//   }
//   else if (currentType.value === 'author') {
//     const entity = current as Author
//     if (entity.count) {
//       count = `${entity.count.books} books`
//       if (entity.count.series)
//         count += ` & ${entity.count.series} series`
//     }
//   }

//   return count || ''
// })

// const type = computed(() => {
//   let type
//   if (currentType.value === 'book' || currentType.value === 'serie') {
//     const entity = current as Book | Serie
//     type = entity.type
//   }

//   return type
// })

// const entityName = computed(() => {
//   const entity = current as Entity
//   const entityName = entity.meta?.entity

//   return entityName
// })

// return {
//   entity: currentType.value,
//   title: title.value!,
//   media: media.value,
//   route: route.value,
//   language: language.value,
//   serie: serie.value,
//   authors: authors.value,
//   count: count.value,
//   type: withType ? type.value : undefined,
//   entityName: withName ? entityName.value : undefined,
// } as UseEntity
