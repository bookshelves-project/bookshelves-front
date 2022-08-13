// import axios from 'axios'
// import { $content } from '@nuxt/content'

export default (meta) => {
  return [
    {
      path: '/sitemaps/sitemap.xml',
      exclude: ['**'],
      routes() {
        return getRoutes()
      }
    },
    {
      path: '/sitemaps/books.xml',
      exclude: ['**'],
      routes: () => {
        return getBooksRoutes()
      }
    },
    {
      path: '/sitemaps/series.xml',
      exclude: ['**'],
      routes: () => {
        return getSeriesRoutes()
      }
    },
    {
      path: '/sitemaps/authors.xml',
      exclude: ['**'],
      routes: () => {
        return getAuthorsRoutes()
      }
    },
    {
      path: '/sitemaps/guides.xml',
      exclude: ['**'],
      routes: () => {
        return getGuidesRoutes()
      }
    },
    {
      path: '/sitemaps/pages.xml',
      exclude: ['**'],
      routes: () => {
        return getPagesRoutes()
      }
    }
  ]
}

const getRoutes = () => {
  return new Promise((resolve, reject) => {
    const routes = []
    const staticRoutes = [
      {
        url: '',
        changefreq: 'weekly',
        priority: 1
      },
      {
        url: 'books',
        changefreq: 'weekly',
        priority: 1
      },
      {
        url: 'series',
        changefreq: 'weekly',
        priority: 1
      },
      {
        url: 'authors',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        url: 'search',
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: 'guides',
        changefreq: 'weekly',
        priority: 0.7
      }
    ]
    staticRoutes.forEach((route) => {
      routes.push(route)
    })
    routes.concat(staticRoutes)

    resolve(routes)
  })
}

const getBooksRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const books = await fetchEntities('books?all=true')
    const routes = []

    // for (const book of books.data) {
    //   const route = {
    //     url: `/books/${book.meta.author}/${book.meta.slug}`,
    //     // lastmodISO: book.meta.updatedAt,
    //     priority: 0.6,
    //   }
    //   routes.push(route)
    // }
    resolve(routes)
  })
}

const getSeriesRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const series = await fetchEntities('series?all=true')
    const routes = []

    // for (const serie of series.data) {
    //   const route = {
    //     url: `/series/${serie.meta.author}/${serie.meta.slug}`,
    //     // lastmodISO: serie.meta.updatedAt,
    //     priority: 0.6,
    //   }
    //   routes.push(route)
    // }
    resolve(routes)
  })
}

const getAuthorsRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const authors = await fetchEntities('authors?all=true')
    const routes = []

    // for (const author of authors.data) {
    //   const route = {
    //     url: `/authors/${author.meta.slug}`,
    //     // lastmodISO: author.meta.updatedAt,
    //     priority: 0.9,
    //   }
    //   routes.push(route)
    // }
    resolve(routes)
  })
}

const getGuidesRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  // return new Promise(async (resolve, reject) => {
  //   const guides = await $content('guides', { deep: true })
  //     .only(['path', 'slug', 'created_at'])
  //     .where({ draft: false })
  //     .sortBy('created_at')
  //     .fetch()
  //   const routes = []

  //   for (const guide of guides) {
  //     const route = {
  //       url: `/guides/${guide.slug}`,
  //       // lastmodISO: guide.created_at,
  //       priority: 0.6,
  //     }
  //     routes.push(route)
  //   }
  //   resolve(routes)
  // })
}

const getPagesRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  // return new Promise(async (resolve, reject) => {
  //   const pages = await $content('pages', { deep: true })
  //     .only(['path', 'slug', 'created_at'])
  //     .fetch()
  //   const routes = []

  //   for (const page of pages) {
  //     const route = {
  //       url: `/pages/${page.slug}`,
  //       // lastmodISO: page.created_at,
  //       priority: 0.6,
  //     }
  //     routes.push(route)
  //   }
  //   resolve(routes)
  // })
}

const fetchEntities = async (endpoint) => {
  // const path = `${process.env.API_URL}/${endpoint}`
  // try {
  //   const result = await axios.get(path)
  //   return result.data
  // } catch (error) {
  //   console.error(path)
  //   console.error('Unable to catch API')
  //   return []
  // }
}
