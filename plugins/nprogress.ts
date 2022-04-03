import NProgress from 'nprogress'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client && nuxtApp.$router) {
    nuxtApp.$router.beforeEach(() => {
      NProgress.start()
    })
    nuxtApp.$router.afterEach(() => {
      NProgress.done()
    })
  }
})
