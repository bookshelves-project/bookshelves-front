export const useEntity = (
  originalEntity: EntityList,
  withType = false,
  withName = false
) => {
  const { formatAuthors, instanceAuthor, instanceBook, instanceSerie } = useEntityMethods()
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
    }

    return ''
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
          slug: entity.meta.slug
        }
      }
    } else if (currentType.value === 'serie') {
      const entity = originalEntity as Serie
      route = {
        name: 'series-author-slug',
        params: {
          author: entity.meta.author,
          slug: entity.meta.slug
        }
      }
    } else if (currentType.value === 'author') {
      const entity = originalEntity as Author
      route = {
        name: 'authors-slug',
        params: {
          slug: entity.meta.slug
        }
      }
    } else {
      const entity = originalEntity as Entity
      route = {
        name:
          entity.meta.entity === 'author'
            ? 'authors-slug'
            : `${entity.meta.entity}s-author-slug`,
        params: {
          author: entity.meta.author,
          slug: entity.meta.slug
        }
      }
    }

    return route
  })

  const language = computed(() => {
    let language
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
        return {
          title: `${entity.serie.title ?? entity.serie}`,
          volume: `${entity.volume}`
        }
      }
    }
  })

  const authors = computed(() => {
    let authors
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = originalEntity as Book | Serie
      authors = entity.authors
    } else if (currentType.value !== 'author') {
      const entity = originalEntity as Entity
      authors = entity.authors
    }

    return authors ? formatAuthors(authors) : undefined
  })

  const count = computed((): string => {
    let count
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

    return count || ''
  })

  const type = computed(() => {
    let type
    if (currentType.value === 'book' || currentType.value === 'serie') {
      const entity = originalEntity as Book | Serie
      type = entity.type
    }

    return type
  })

  const entityName = computed(() => {
    let entityName
    const entity = originalEntity as Entity
    entityName = entity.meta?.entity

    return entityName
  })

  return {
    title: title.value!,
    image: image.value,
    color: color.value,
    route: route.value,
    language: language.value,
    serie: serie.value,
    authors: authors.value,
    count: count.value,
    type: withType ? type.value : undefined,
    entityName: withName ? entityName.value : undefined
  }
}
