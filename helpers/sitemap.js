import fetch from 'isomorphic-fetch'
require('dotenv').config()

export const getRoutes = () => {
  // Attention, cette fonction DOIT retourner une Promise.
  return new Promise((resolve, reject) => {
    // Je récupère les événements depuis mon API.
    const routes = []
    const staticRoutes = [
      {
        url: '',
        changefreq: 'weekly',
        priority: 0.6,
      },
      {
        url: 'books',
        changefreq: 'weekly',
        priority: 1,
      },
      {
        url: 'series',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        url: 'authors',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        url: 'search',
        changefreq: 'weekly',
        priority: 0.5,
      },
      {
        url: 'guides',
        changefreq: 'weekly',
        priority: 0.7,
      },
    ]
    staticRoutes.forEach((route) => {
      routes.push(route)
    })
    routes.concat(staticRoutes)

    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}

export const getBooksRoutes = () => {
  // Attention, cette fonction DOIT retourner une Promise.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // Je récupère les événements depuis mon API.
    const books = await fetchBooks()
    const routes = []

    for (const book of books.data) {
      // Pour chaque événement, je renseigne les informations indexées à partir des données que j'ai.
      const route = {
        url: `/books/${book.author}/${book.slug}`,
        lastmodISO: book.meta.updatedAt,
        priority: 1,
      }
      routes.push(route)
    }
    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}

export const getSeriesRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const series = await fetchSeries()
    const routes = []

    for (const serie of series.data) {
      const route = {
        url: `/series/${serie.author}/${serie.slug}`,
        // lastmodISO: serie.meta.updatedAt,
        priority: 0.9,
      }
      routes.push(route)
    }
    resolve(routes)
  })
}

export const getAuthorsRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const authors = await fetchAuthors()
    const routes = []

    for (const author of authors.data) {
      const route = {
        url: `/authors/${author.slug}`,
        // lastmodISO: author.meta.updatedAt,
        priority: 0.9,
      }
      routes.push(route)
    }
    resolve(routes)
  })
}

export const getGuidesRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const guides = await this.$content('guides', { deep: true })
      .without(['toc', 'body'])
      .where({ draft: false })
      .sortBy('created_at')
      .fetch()
    const routes = []

    for (const guide of guides) {
      const route = {
        url: `/guides/${guide.slug}`,
        lastmodISO: guide.created_at,
        priority: 0.8,
      }
      routes.push(route)
    }
    resolve(routes)
  })
}

const fetchBooks = () => {
  return fetch(`${process.env.API_URL}/api/books?all=true`).then((response) =>
    response.json()
  )
}

const fetchSeries = () => {
  return fetch(`${process.env.API_URL}/api/series?all=true`).then((response) =>
    response.json()
  )
}

const fetchAuthors = () => {
  return fetch(`${process.env.API_URL}/api/authors?all=true`).then((response) =>
    response.json()
  )
}
