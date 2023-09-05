export default defineNuxtRouteMiddleware(async (to, from) => {
  // return navigateTo({
  //   name: 'authors-author_slug',
  //   params: {
  //     author_slug: from.params.author_slug,
  //   },
  // })

  return navigateTo(`/authors/${from.params.author_slug}`)
})
