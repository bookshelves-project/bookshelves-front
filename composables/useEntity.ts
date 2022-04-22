import {
  formatAuthors,
  instanceBook,
  instanceSerie,
  instanceAuthor,
} from '~/utils/methods'

export const useEntity = (originalEntity: EntityList) => {
  const currentType = ref<EntityType>()

  const checkType = () => {
    if (instanceBook(originalEntity)) {
      currentType.value = 'book'
    } else if (instanceSerie(originalEntity)) {
      currentType.value = 'serie'
    } else if (instanceAuthor(originalEntity)) {
      currentType.value = 'author'
    }
  }
  checkType()

  const color = computed(() => {
    return originalEntity.cover?.color || '#ffffff'
  })
  const title = computed(() => {
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = originalEntity as Book | Serie
      return entity.title
    } else if (currentType.value === 'author') {
      const entity = originalEntity as Author
      return entity.name
    } else {
      const entity = originalEntity as Entity
      // return entity.title || entity.name
      return ''
    }
  })
  const image = computed(() => {
    return originalEntity.cover?.thumbnail || '/images/no-cover.webp'
  })
  const route = computed(() => {
    let route = { name: 'index', params: {} }

    if (currentType.value === 'book') {
      const entity = originalEntity as Book
      route = {
        name: 'books-author-slug',
        params: {
          author: entity.meta.author,
          slug: entity.meta.slug,
        },
      }
    } else if (currentType.value === 'serie') {
      const entity = originalEntity as Serie
      route = {
        name: 'series-author-slug',
        params: {
          author: entity.meta.author,
          slug: entity.meta.slug,
        },
      }
    } else if (currentType.value === 'author') {
      const entity = originalEntity as Author
      route = {
        name: 'authors-slug',
        params: {
          slug: entity.meta.slug,
        },
      }
    } else {
      const entity = originalEntity as Entity
      route = {
        name:
          entity.meta.entity === 'author'
            ? `authors-slug`
            : `${entity.meta.entity}s-author-slug`,
        params: {
          author: entity.meta.author,
          slug: entity.meta.slug,
        },
      }
    }

    return route
  })

  const language = computed(() => {
    let language = null
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = originalEntity as Book | Serie
      language = entity.language?.name
    }

    return language
  })

  const serie = computed(() => {
    if (currentType.value === 'book') {
      const entity = originalEntity as Book
      if (entity.serie && entity.volume) {
        return `${entity.serie.title ?? entity.serie}, vol. ${entity.volume}`
      }
    }
  })

  const authors = computed(() => {
    let authors = null
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = originalEntity as Book | Serie
      authors = entity.authors
    } else if (currentType.value !== 'author') {
      const entity = originalEntity as Entity
      authors = entity.authors
    }

    return authors ? formatAuthors(authors) : null
  })

  const count = computed((): string => {
    let count = null
    if (currentType.value === 'serie') {
      const entity = originalEntity as Serie
      count = `${entity.count} books`
    } else if (currentType.value === 'author') {
      const entity = originalEntity as Author
      if (entity.count) {
        count = `${entity.count.books} books`
        if (entity.count.series) {
          count += ` & ${entity.count.series} series`
        }
      }
    }

    return count ? count : ''
  })

  const type = computed(() => {
    let type = null
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = originalEntity as Book | Serie
      type = entity.type
    }

    return type
  })

  const entity = computed(() => {
    let entityName = null
    const entity = originalEntity as Entity
    entityName = entity.meta?.entity

    return entityName
  })

  return {
    currentType,
    color,
    title,
    image,
    route,
    language,
    serie,
    authors,
    count,
    type,
    entity,
  }
}
