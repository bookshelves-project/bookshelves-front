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

import TagsIndex from '~/pages/tags/index'
import TagsSlug from '~/pages/tags/_slug'
import LanguagesIndex from '~/pages/languages/index'
import LanguagesSlug from '~/pages/languages/_slug'
import PublishersIndex from '~/pages/publishers/index'
import PublishersSlug from '~/pages/publishers/_slug'

import RelatedSlug from '~/pages/related/_slug'

import SearchIndex from '~/pages/search/index'
import Contact from '~/pages/contact'

// Auth
import Login from '~/pages/sign-in'
import Register from '~/pages/sign-up'
import Dashboard from '~/pages/dashboard'
import Profile from '~/pages/profile'
import Admin from '~/pages/admin'

// Content
import Guides from '~/pages/guides/index'
import Content from '~/pages/content'

Vue.use(Router)

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
    meta: {
      breadcrumb: [{ route: 'books', label: 'Books' }],
    },
  },
  {
    name: 'series',
    path: '/series',
    component: SeriesIndex,
  },
  {
    name: 'series-slug',
    path: '/series/:author/:slug',
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
    name: 'contact',
    path: '/contact',
    component: Contact,
  },
  // Tags
  {
    name: 'tags',
    path: '/tags',
    component: TagsIndex,
  },
  {
    name: 'tags-slug',
    path: '/tags/:slug',
    component: TagsSlug,
  },
  {
    name: 'languages',
    path: '/languages',
    component: LanguagesIndex,
  },
  {
    name: 'languages-slug',
    path: '/languages/:slug',
    component: LanguagesSlug,
  },
  {
    name: 'publishers',
    path: '/publishers',
    component: PublishersIndex,
  },
  {
    name: 'publishers-slug',
    path: '/publishers/:slug',
    component: PublishersSlug,
  },
  {
    name: 'related-slug',
    path: '/related/:author/:slug',
    component: RelatedSlug,
  },
  // Auth
  {
    name: 'login',
    path: '/sign-in',
    component: Login,
  },
  {
    name: 'register',
    path: '/sign-up',
    component: Register,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
  },
  {
    name: 'admin',
    path: '/admin',
    component: Admin,
  },
  // Content
  {
    name: 'guides',
    path: '/guides',
    component: Guides,
  },
  {
    name: 'content',
    path: '/:type/:slug',
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
