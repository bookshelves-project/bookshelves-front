<template>
  <blocks-redirection
    :to="
      localePath({
        name: 'books-author-slug',
        params: {
          slug: $route.params.author,
        },
      })
    "
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware({ app, redirect, params }) {
    if (params.author) {
      return redirect(
        app.localePath({
          name: 'authors-slug',
          params: {
            slug: params.author,
          },
        })
      )
    }
  },
})
export default class PageRelatedAuthor extends Vue {}
</script>
