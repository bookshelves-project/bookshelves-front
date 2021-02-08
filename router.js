import Vue from 'vue'
import Router from 'vue-router'
import qs from 'qs'

import Home from '~/pages/index'
import BooksIndex from '~/pages/books/index'
import BooksSlug from '~/pages/books/_slug'
import SeriesIndex from '~/pages/series/index'
import SeriesSlug from '~/pages/series/_slug'
import AuthorsIndex from '~/pages/authors/index'
import AuthorsSlug from '~/pages/authors/_slug'
import SearchIndex from '~/pages/search/index'
import Guides from '~/pages/guides/index'
import Content from '~/pages/guides/_'

import ContentPage from '~/pages/content/slug'
import Contact from '~/pages/contact/index'

import SignIn from '~/pages/sign-in'
import SignUp from '~/pages/sign-up'
import Dashboard from '~/pages/dashboard'

Vue.use(Router)

// export function createRouter(ssrContext, routerOptions) {
//   const routes =
//   const options = routerOptions

//   // eslint-disable-next-line no-unused-vars
//   const router = new Router({
//     ...options,
//     scrollToTop: true,
//     parseQuery(query) {
//       return qs.parse(query)
//     },
//     stringifyQuery(query) {
//       const result = qs.stringify(query)

//       return result ? '?' + result : ''
//     },
//     routes,
//   })
//   return router
// }

const routesList = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'books',
    path: '/books',
    component: BooksIndex,
  },
  {
    name: 'books-slug',
    path: '/books/:author/:slug',
    component: BooksSlug,
  },
  {
    name: 'series',
    path: '/series',
    component: SeriesIndex,
  },
  {
    name: 'series-slug',
    path: '/series/:slug',
    component: SeriesSlug,
  },
  {
    name: 'authors',
    path: '/authors',
    component: AuthorsIndex,
  },
  {
    name: 'authors-slug',
    path: '/authors/:slug',
    component: AuthorsSlug,
  },
  {
    name: 'search',
    path: '/search',
    component: SearchIndex,
  },
  {
    name: 'guides',
    path: '/guides',
    component: Guides,
  },
  {
    name: 'contact',
    path: '/contact',
    component: Contact,
  },
  {
    name: 'pages',
    path: '/pages/:slug',
    component: ContentPage,
  },
  {
    name: 'sign-in',
    path: '/sign-in',
    component: SignIn,
  },
  {
    name: 'sign-up',
    path: '/sign-up',
    component: SignUp,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: 'all',
    path: '/*',
    component: Content,
  },
]

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const routes = routesList
  // const options = routerOptions || createDefaultRouter(ssrContext).options
  const options = routerOptions || createDefaultRouter(ssrContext).options

  // eslint-disable-next-line no-unused-vars
  const router = new Router({
    ...options,
    scrollToTop: true,
    parseQuery(query) {
      return qs.parse(query)
    },
    stringifyQuery(query) {
      const result = qs.stringify(query)

      return result ? '?' + result : ''
    },
    routes,
  })
  return router
}
