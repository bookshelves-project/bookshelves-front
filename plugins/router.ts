export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$router) {
    nuxtApp.$router.options.scrollBehavior = () => {
      return { left: 0, top: 0 }
    }
  }
})