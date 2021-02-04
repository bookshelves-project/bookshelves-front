import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const loadimage = require('static/images/bookshelves.png')
const errorimage = require('static/images/bookshelves.png')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
})
