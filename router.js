import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
// import Login from '~/pages/login'
import About from '~/pages/about'
import Dashboard from '~/pages/dashboard'
import SignIn from '~/pages/sign-in'
import SignUp from '~/pages/sign-up'

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
        name: 'about',
        path: '/about',
        component: About,
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
    ],
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
}
