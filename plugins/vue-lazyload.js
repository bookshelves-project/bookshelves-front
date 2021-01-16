import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

// or with options
const loadimage = require('../static/images/no-cover.webp')
const errorimage = require('../static/images/no-cover.webp')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
})
