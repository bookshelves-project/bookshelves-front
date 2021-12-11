import axios from 'axios'
// import { $content } from '@nuxt/content'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const api = process.env.API_URL

export default async () => {
  let [
    books,
    series,
    authors
  ] = await Promise.all([
    axios.get(`${api}/books?all=true`),
    axios.get(`${api}/series?all=true`),
    axios.get(`${api}/authors?all=true`)
  ])
  books = books.data.data.map((book) => {
    return `/books/${book.meta.author}/${book.meta.slug}`
  })
  series = series.data.data.map((serie) => {
    return `/series/${serie.meta.author}/${serie.meta.slug}`
  })
  authors = authors.data.data.map((author) => {
    return `/authors/${author.meta.slug}`
  })
  const routes = []
  routes.push(...books, ...series, ...authors)
  console.log(routes)

  return routes
}
