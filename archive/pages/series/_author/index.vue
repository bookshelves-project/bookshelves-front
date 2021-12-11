<template>
  <blocks-redirection
    :to="
      localePath({
        name: 'authors-slug',
        params: {
          slug: $route.params.author,
        },
      })
    "
  />
</template>

<script>
export default {
  name: 'SeriesAuthor',
  middleware({ params, redirect, app }) {
    if (params.author) {
      return redirect(
        app.localePath({
          name: 'authors-slug',
          params: {
            slug: params.author
          }
        })
      )
    }
  }
}
</script>
