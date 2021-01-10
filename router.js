import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import BooksSlug from '~/pages/books/_slug'
import Guides from '~/pages/guides/index'
import Content from '~/pages/guides/_'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: Home,
      },
      {
        name: 'book-slug',
        path: '/books/:author/:slug',
        component: BooksSlug,
      },
      {
        name: 'guides',
        path: '/guides',
        component: Guides,
      },
      {
        name: 'all',
        path: '/*',
        component: Content,
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return { selector: to.hash }
      } else {
        setTimeout(() => {
          return window.scrollTo({ top: 0 })
        }, 100)
      }
    },
  })
}
