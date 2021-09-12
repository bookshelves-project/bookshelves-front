<template>
  <blocks-redirection
    :to="{
      name: 'authors-slug',
      params: {
        slug: $route.params.author,
      },
    }"
  />
</template>

<script>
export default {
  name: 'SeriesAuthor',
  middleware({ params, redirect }) {
    if (params.author) {
      return redirect({
        name: 'authors-slug',
        params: {
          slug: params.author,
        },
      })
    }
  },
}
</script>
