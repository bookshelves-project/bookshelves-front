import axios from 'axios'
// import { $content } from '@nuxt/content'
require('dotenv').config()

const api = process.env.API_URL

// export const routes = () => {
//   return axios.get(`${api}/books`).then((res) => {
//     console.log(res)
//     return res.data.map((user) => {
//       return '/users/' + user.id
//     })
//   })
// }

export const routes = () => {
  return new Promise((resolve, reject) => {
    const booksRoutes = books()

    resolve(booksRoutes)
  })
}

const books = () => {
  return axios.get(`${api}/books?all=true`).then((res) => {
    return res.data.data.map((book) => {
      return {
        route: `/books/${book.meta.author}/${book.meta.slug}`,
        payload: book,
      }
    })
  })
}

// const getRoutes = () => {
//   return new Promise((resolve, reject) => {
//     const routes = []
//     const staticRoutes = [
//       {
//         url: '',
//         changefreq: 'weekly',
//         priority: 1,
//       },
//       {
//         url: 'books',
//         changefreq: 'weekly',
//         priority: 1,
//       },
//       {
//         url: 'series',
//         changefreq: 'weekly',
//         priority: 1,
//       },
//       {
//         url: 'authors',
//         changefreq: 'weekly',
//         priority: 0.9,
//       },
//       {
//         url: 'search',
//         changefreq: 'weekly',
//         priority: 0.8,
//       },
//       {
//         url: 'guides',
//         changefreq: 'weekly',
//         priority: 0.7,
//       },
//       {
//         url: 'generated',
//         changefreq: 'weekly',
//         priority: 0.7,
//       },
//     ]
//     staticRoutes.forEach((route) => {
//       routes.push(route)
//     })
//     routes.concat(staticRoutes)

//     resolve(routes)
//   })
// }

// const getBooksRoutes = () => {
//   // eslint-disable-next-line no-async-promise-executor
//   return new Promise(async (resolve, reject) => {
//     const books = await fetchEntities('books?all=true')
//     const routes = []

//     for (const book of books.data) {
//       const route = {
//         url: `/books/${book.meta.author}/${book.meta.slug}`,
//         // lastmodISO: book.meta.updatedAt,
//         priority: 0.6,
//       }
//       routes.push(route)
//     }
//     resolve(routes)
//   })
// }

// const fetchEntities = async (endpoint) => {
//   const path = `${process.env.API_URL}/${endpoint}`
//   try {
//     const result = await axios.get(path)
//     return result.data
//   } catch (error) {
//     console.error(path)
//     console.error('Unable to catch API')
//     return []
//   }
// }
