import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import BookSlug from '~/pages/book-slug'
// import Login from '~/pages/login'
// import About from '~/pages/about'
// import Dashboard from '~/pages/dashboard'
// import SignIn from '~/pages/sign-in'
// import SignUp from '~/pages/sign-up'

Vue.use(Router)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'book-slug',
    path: '/books/:author/:slug',
    component: BookSlug,
  },
  // {
  //   name: 'sign-in',
  //   path: '/sign-in',
  //   component: SignIn,
  // },
  // {
  //   name: 'sign-up',
  //   path: '/sign-up',
  //   component: SignUp,
  // },
  // {
  //   name: 'dashboard',
  //   path: '/dashboard',
  //   component: Dashboard,
  // },
]
// export function createRouter() {
//   return new Router({
//     mode: 'history',
//     routes: [
//     ],
// scrollBehavior(to) {
//   if (to.hash) {
//     return window.scrollTo({
//       top: document.querySelector(to.hash).offsetTop,
//       behavior: 'smooth',
//     })
//   }
//   return window.scrollTo({ top: 0, behavior: 'smooth' })
// },
//   })
// }

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions

  const router = new Router({
    mode: 'history',
    ...options,
    routes,
    scrollBehavior(to) {
      if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      }
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  // if (process.client) {
  //   router.beforeEach((to, from, next) => {
  //     // Since `beforeEach` is invoked before `window.$nuxt` is
  //     // initialized, use `setTimeout` without a timeout to wait
  //     // until the next macro tick.
  //     setTimeout(() => {
  //       window.$nuxt.$store.commit('initializeStore')
  //     })

  //     next()
  //   })
  // }

  return router
}
